import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';
import { OrdermodalComponent } from '../../components/ordermodal/ordermodal';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Preorder } from '../../models/preorder/preorder';
// import { PreorderProvider } from '../../providers/preorder/preorder';
import { ToastProvider } from '../../providers/toast/toast';
import { User } from '../../models/user/user';
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  show: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myTabs: TabsEnablor,
    private modalService: NgbModal,
    private userService: UserProvider,
    private toast: ToastProvider,
    private db: AngularFireDatabase,
    private af: AngularFireAuth){
  }

  ionViewDidEnter() {
  	this.myTabs.setEnableState(true);
    const uid = this.af.auth.currentUser.uid;
    console.log(uid);
    const myUser = this.userService.getUserById(uid);
    console.log(myUser);

    console.log('ionViewDidEnter ShopPage');
  }

  // getItemList(){

  // }

  onOrderSubmit(){
    console.log('Order submitted successfully');
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
