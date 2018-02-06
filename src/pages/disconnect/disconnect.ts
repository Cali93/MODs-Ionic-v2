import { Component, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HomePage } from '../home/home';

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
  encapsulation: ViewEncapsulation.None
})

export class DisconnectPage {
  closeResult: string;
  constructor(private firebase: AngularFireAuth,
  				public navCtrl: NavController,
  					public navParams: NavParams,
              private myTabs: TabsEnablor,
              private modalService: NgbModal) {
  }

  ionViewDidEnter() {
  	this.firebase.auth.signOut();
  	localStorage.removeItem('isLoggedIn');
  	this.myTabs.setEnableState(false);
    console.log('ionViewDidEnter DisconnectPage');
    this.redirectToHome();
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  redirectToHome() {

    const disco = this;
    setTimeout(
      function () {
        disco.navCtrl.parent.select(0);
      },
      6000
    )
  }

}
