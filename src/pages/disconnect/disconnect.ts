import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';

/**
 * Generated class for the DisconnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disconnect',
  templateUrl: 'disconnect.html',
})
export class DisconnectPage {

  constructor(private firebase: AngularFireAuth, 
  				public navCtrl: NavController, 
  					public navParams: NavParams,
  						private myTabs: TabsEnablor) {
  }

  ionViewDidLoad() {
  	this.firebase.auth.signOut();
  	localStorage.removeItem('isLoggedIn');
  	this.myTabs.setEnableState(false);
    console.log('ionViewDidLoad DisconnectPage');
  }

}
