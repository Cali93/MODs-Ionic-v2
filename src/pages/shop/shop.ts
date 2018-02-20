import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';

import { trigger, keyframes, animate, transition } from '@angular/animations';

import * as kf from '../../app/keyframes';

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
import { Observable } from 'rxjs/Observable';
import 'rxjs/Operator/map';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
  animations: [
    trigger('cardAnimator', [
      transition('* => zoomOutRight', animate(1000, keyframes(kf.zoomOutRight)))
    ]),
    trigger('meusAnimator',[
      transition('*=> slideInLeft', animate(1000, keyframes(kf.slideInLeft)))
    ])
  ]
})
export class ShopPage implements OnInit {
  animationState: string;
  show: boolean = true;
  user: AngularFirestoreDocument<any>;
  users: Observable<User[]>;
  preorders: Observable<Preorder[]>
  uid: string;
  projectName:string;
  userComments: string;
  quantities:number;
  date:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myTabs: TabsEnablor,
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
  }

  /* CREATE PREORDER*/
  createPreorder() {
    this.preorderService.create(this.projectName, this.userComments, this.quantities);
    this.projectName = '';
    this.quantities = 1;
    this.userComments = '';
  }

  onOrderSubmit(){
    console.log('Order submitted successfully');
  }

  startAnimation(state: any) {
    console.log(state);
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState() {
    this.animationState = '';
  }
}
