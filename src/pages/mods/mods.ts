import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ModEditorComponent } from '../../components/mod-editor/mod-editor';

@IonicPage()
@Component({
  selector: 'page-mods',
  templateUrl: 'mods.html',
})
export class ModsPage {
    constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModsPage');
  }

}
