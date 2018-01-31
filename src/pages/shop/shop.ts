import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';
import { OrdermodalComponent } from '../../components/ordermodal/ordermodal';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Preorder } from '../../models/preorder/preorder';
import { PreorderProvider } from '../../providers/preorder/preorder';
import { ToastProvider } from '../../providers/toast/toast';
import { ContactProvider } from '../../providers/contact/contact';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  show: boolean = true;
  preorder: Preorder = {
    username: '',
    email: '',
    // projectSpecs: Object,
    projectName: '',
    quantities:1,
    userComments: '',
    date: ''
  }

  date = new Date(Date.now()).toLocaleString();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myTabs: TabsEnablor,
    private modalService: NgbModal,
    private preorderService: PreorderProvider,
    private toast: ToastProvider
            ) {}

  ionViewDidEnter() {
  	this.myTabs.setEnableState(true);
    console.log('ionViewDidEnter ShopPage');
  }

  onOrderSubmit(){
    console.log('Order submitted successfully');
  }

  addPreorder(preorder: Preorder){
    if(preorder.projectName == '' || preorder.quantities == null){
      this.toast.show(`Sorry, you must fill all fields`)
    } else {
      this.preorderService.addPreorder(preorder).then(ref => {
        this.toast.show(`Thanks, your ${preorder.projectName} has been sent !`)
      })
    }
  }

  onOrder(){
    console.log('You click on order button');
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
