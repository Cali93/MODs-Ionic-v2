import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FakeWorldComponent } from '../../components/fake-world/fake-world';
// import { ModEditorComponent } from '../../components/mod-editor/mod-editor';

@IonicPage()
@Component({
  selector: 'page-mods',
  templateUrl: 'mods.html',
})
export class ModsPage {
  @ViewChild(FakeWorldComponent)
  private fakeWorld: FakeWorldComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}


  ionViewDidEnter(){
    console.log("Getting there!");
    this.fakeWorld.render();
  }

}
