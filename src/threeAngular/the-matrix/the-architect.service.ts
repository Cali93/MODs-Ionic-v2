import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as THREE from 'three';
import "../EnableThree.js";
import "three/src/loaders/ObjectLoader";

import { Defaults } from "./defaults";

@Injectable()

export class TheArchitect {
  public defaults = new Defaults;

  private theMatrixReloaded = new Subject<any>();
  public theMatrixReloaded$ = this.theMatrixReloaded.asObservable();

  private objectRemoved = new Subject<any>();
  public objectRemoved$ = this.objectRemoved.asObservable();

  private selectionChanged = new Subject<any>();
  public selectionChanged$ = this.selectionChanged.asObservable();

  private editModeChanged = new Subject<any>();
  public editModeChanged$ = this.editModeChanged.asObservable();

  private selectModeChanged = new Subject<any>();
  public selectModeChanged$ = this.selectModeChanged.asObservable();

  public camera: THREE.PerspectiveCamera;
  public scene: THREE.Scene;
  public sceneHelpers: THREE.Scene;
  public nebuchadnezzar = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial({ color: 0xa1ff11, wireframe: true }) ); // temporary multi-selection group
  public loader: THREE.ObjectLoader;

  public objects = [];
  public selected = [];

  public manyMode = {
    'id' : 'many',
    'nextText' : 'Select Multiple Elements',
    'nextIcon' : 'radio_button_checked'
  }
  public singleMode = {
    'id' : 'one',
    'nextText' : 'Select One Element',
    'nextIcon' : 'radio_button_unchecked'
  }
  public selectMode = this.singleMode;


  public translateMode  = {
    'id'    : 'translate',
    'nextText' : 'Rotate',
    'nextIcon' : '3d_rotation'
  }
  public rotateMode  = {
    'id'    : 'rotate',
    'nextText' : 'Translate',
    'nextIcon' : 'open_with'
  }
  public editMode = this.translateMode;
  

  constructor() {
    this.plugMeIn();
    this.addObject = this.addObject.bind(this);
  }

  /**
   * I need guns, lots of guns.
   */
  public plugMeIn (){
    this.camera = this.defaults.camera;
    this.scene = this.defaults.scene;
    this.sceneHelpers = this.defaults.sceneHelpers;
  }

  /**
   * Sets a scene. Useful when you need to load a whole scene. This will overwrite current scene.
   */
  public setScene (scene) {
		this.scene.uuid = scene.uuid;
    this.scene.name = scene.name;
		if ( scene.background !== null ) this.scene.background = scene.background.clone();
		while ( scene.children.length > 0 ) {
			this.addObject( scene.children[ 0 ] );
		}
  }

  /**
   * Adds an object to the scene but also to the objects array
   */
  public addObject (object) {
    // object.add( this.defaults. )
    this.objects.push(object);
    this.scene.add(object);

    this.theMatrixReloaded.next();
  }

  /**
   * Adds an object to the scene but also to the objects array
   */
  public addYellowBox (object) {
    let selectionBox = new THREE.BoxHelper();
    selectionBox.material.depthTest = false;
    selectionBox.material.transparent = true;
    selectionBox.name = "yellowBox";
    selectionBox.setFromObject( object );
    object.add(selectionBox);
}
  /**
   * Clones an object
   */
  public cloneObject () {
    if (!this.selected.length) return;
    this.selected.forEach(object => {
      let clone = object.clone();
      this.addObject(clone);
    });
  }

  /**
   * Removes an object from the scene but also from the objects array
   */
  public removeObject (object) {
    if ( object.parent === null ) return; // avoid deleting the camera or scene
    object.parent.remove( object );
    this.objects.splice( this.objects.indexOf( object ), 1 );
    this.objectRemoved.next();
  }

  /**
   * Removes the selected object
   */
  public removeSelected () {
    this.selected.forEach(object => {
      this.removeObject( object );
    });
  }

  /**
   * Selects one object from the scene
   */
  public selectOne (object) {
    this.selected = [object];
  }

  /**
   * Push new object to selected array
   */
  public addToSelection(object) {
    this.selected.push(object);
  }

  /**
   * Removes object from selected array
   */
  public removeFromSelection(object) {
    this.selected.splice( this.selected.indexOf( object ), 1 );
  }

  /**
   * Select everything
   */
  public selectAll () {
    // In Here we will select everything
  }
  
  /**
   * Deselect everything
   */
  public deselect () {
    if (this.selectMode.id == 'one'){
      this.selected = [];
    } else {
      this.clearNebuchadnezzar();
    }
    this.updateYellowBoxes();
    this.selectionChanged.next();
    this.theMatrixReloaded.next();
  }


  /**
   * Reset the Editor
   */
  public reset () {
    this.defaults = new Defaults;
		this.camera.copy( this.defaults.camera );
		this.scene.copy( this.defaults.scene );

		this.objects = [];

		this.theMatrixReloaded.next();
  }

  /**
   * Move or Rotate?
   */
  public changeEditMode (){
    if (this.editMode.id == "translate") {
      this.editMode = this.rotateMode
    } else {
      this.editMode = this.translateMode
    }
    this.editModeChanged.next(this.editMode.id);
  }

  /**
   * Select one or many?
   */
  public changeSelectMode (){
    if (this.selectMode.id == "many") {
      this.selectMode = this.singleMode;
    } else {
      this.selectMode = this.manyMode;
    }
    this.deselect();
    this.selectModeChanged.next(this.selectMode.id); // Keep it here for the toolbar pliz.
  }
  
  /**
   * Load an object via AJAX from Json file.
   */
  public loadObjFromJson (path) {
    this.loader = new THREE.ObjectLoader();
    this.loader.load(
      path,
      this.addObject,
      function ( xhr ) {},
      function( err ) {
        console.log( 'An error happened' );
        console.error(err);
      }
    );
  }

  /**
   * Add fresh mod to scene. Bye!
   */
  public addMod () {
    this.loadObjFromJson('../assets/MODs.json');
  }


  /**
   * Tell us if the passed object is already in selection array
   */
  public isSelected ( object ) {
    return (this.selected.indexOf(object) != -1);
  }

  /**
   * What to do if user clicks an object
   */
  public handleClick ( target ) {
    if ( this.selectMode.id == "many" && this.isSelected( target ) ){
      this.removeFromSelection( target );
      this.removeFromNebuchadnezzar(target);
    } else if ( this.selectMode.id == "many" && !this.isSelected( target ) ) {
      this.addToSelection( target );
      this.addToNebuchadnezzar(target);
    } else if ( this.selectMode.id == "one" && !this.isSelected( target ) ) {
      this.selectOne( target );
    }

    this.centerNebuchadnezzar();

    this.updateYellowBoxes();
    this.selectionChanged.next();
    this.theMatrixReloaded.next();
  }




  /**
   * Ok, so. This should happen before binding the controllers:
   * When we put things in a group we should use the center of the group
   * as anchor point for the controllers, right?
   */
  public centerNebuchadnezzar() {
    // this.sceneHelpers.add(redBox);
    // THREE.SceneUtils.attach(redBox,this.scene,this.nebuchadnezzar);
    // let redBox = new THREE.BoxHelper( this.nebuchadnezzar, 0xff0000 );

    // var box = new THREE.Box3().setFromObject( this.nebuchadnezzar );
    // if (this.selected.length == 1){
    //   // this.selected[0].applyMatrix(  );
    //   let object = this.selected[0];
    //   console.log(object.matrix);
    //   this.nebuchadnezzar.position.set( box.applyMatrix4(object.matrix)) ;
    // }
    // box.center( this.nebuchadnezzar.position );
    // this.nebuchadnezzar.position.multiplyScalar( - 1 );
  }


  /**
   * ajoute les petites boites jaunes à tous les elements selectionnés!
   */
  public updateYellowBoxes() {
    if (!this.objects.length) return;
    this.objects.forEach(object => {
      if (object.getObjectByName('yellowBox')){
        object.remove( object.getObjectByName('yellowBox') );
      }
    });
    this.selected.forEach(object => {
      let yellowBox = this.defaults.selectionBox(object);
      this.sceneHelpers.add(yellowBox);
      THREE.SceneUtils.attach(yellowBox,this.scene,object);
    });
  }

  /**
   * Remove all elements from MulitSelection Group
   */
  public clearNebuchadnezzar() {
    this.nebuchadnezzar.children.forEach(object => {
      THREE.SceneUtils.detach(object,this.nebuchadnezzar,this.scene);
    });
  }

  /**
   * Add To MulitSelection Group
   */
  public addToNebuchadnezzar(obj) {
    THREE.SceneUtils.attach(obj,this.scene,this.nebuchadnezzar);
  }

  /**
   * Remove From MulitSelection Group
   */
  public removeFromNebuchadnezzar(obj) {
    THREE.SceneUtils.detach(obj,this.nebuchadnezzar,this.scene);
  }

}
