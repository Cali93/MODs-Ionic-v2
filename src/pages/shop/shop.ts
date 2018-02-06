import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';
import { OrdermodalComponent } from '../../components/ordermodal/ordermodal';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
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
  userList$: Observable<User[]>
  preorderList$:Observable <Preorder[]>
  // user: User = {
  //   userId: this.user.userId,
  //   email: this.user.email,
  //   firstname: this.user.firstname,
  //   lastname: this.user.lastname,
  //   company: this.user.company,
  //   phone: this.user.phone
  // }
  // preorder: Preorder = {
  //   projectId: this.project.projectId,
  //   projectImg:'',
  //   quantities:1,
  //   userComments: '',
  //   date: new Date(Date.now()).toLocaleString()
  // }

  date = new Date(Date.now()).toLocaleString();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myTabs: TabsEnablor,
    private modalService: NgbModal,
    // private preorderService: PreorderProvider,
    private userService: UserProvider,
    private toast: ToastProvider,
    private db: AngularFireDatabase
            ) {
            }

  ionViewDidEnter() {
  	this.myTabs.setEnableState(true);
    console.log('ionViewDidEnter ShopPage');
  }

  // getItemList(){

  // }

  onOrderSubmit(){
    console.log('Order submitted successfully');
  }

  createItem(preorder: Preorder){
    if(preorder.quantities == null){
      this.toast.show(`Sorry, you must fill all fields`)
    } else {
      this.userService.createItem(preorder)
      console.log('item created')
      // .then(ref => {
      //   this.toast.show(`Thanks, your ${preorder.projectName} has been sent !`)
      // })
    }
  }

  // getUser(){
  //   const currentUser = {
  //   userId: user.userId,
  //   email: user.email,
  //   firstname: user.firstname,
  //   lastname: user.lastname,
  //   company: user.company,
  //   phone: user.phone
  //   }
  //   console.log(currentUser.firstname)
  // }

  onOrder(){
    console.log('You click on order button');
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
