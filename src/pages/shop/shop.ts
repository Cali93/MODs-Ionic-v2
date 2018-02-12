import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';
import { OrdermodalComponent } from '../../components/ordermodal/ordermodal';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from 'angularfire2';

import { AngularFireAuth } from 'angularfire2/auth';

import {
  AngularFirestoreModule,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import {
  AuthProvider
} from '../../providers/auth/auth';

import { Preorder } from '../../models/preorder/preorder';
import { PreorderProvider } from '../../providers/preorder/preorder';

import { ToastProvider } from '../../providers/toast/toast';
import { User } from '../../models/user/user';
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Operator/map';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage implements OnInit {

  show: boolean = true;
  user: AngularFirestoreDocument<any>;
  users: Observable<User[]>;
  preorders: Observable<Preorder[]>
  userId: string;
  projectName:string;
  userComments: string;
  quantities:number;
  date:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myTabs: TabsEnablor,
    private modalService: NgbModal,
    private userService: UserProvider,
    private preorderService: PreorderProvider,
    private toast: ToastProvider,
    private afs: AngularFirestore,
    private af: AngularFireAuth){

  }

  ngOnInit(){
    this.preorders = this.preorderService.getSnapshot()
  }

  ionViewDidEnter() {
  	this.myTabs.setEnableState(true);
    const uid = this.af.auth.currentUser.uid;
    console.log(uid);
    this.userService.getUserById(uid);
    console.log('ionViewDidEnter ShopPage');
  }

  createPreorder() {
    this.preorderService.create(this.userId, this.projectName, this.userComments, this.quantities);
    this.projectName = '';
    this.quantities = 1;
    this.userComments = '';
  }

  onOrderSubmit(){
    console.log('Order submitted successfully');
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
