import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';

import * as kf from '../../app/keyframes';

import { trigger, keyframes, animate, transition } from '@angular/animations';


 @IonicPage()
 @Component({
   selector: 'page-home',
   templateUrl: 'home.html',
   animations: [
    trigger('cardAnimator', [
      transition('* => zoomOutRight', animate(1000, keyframes(kf.zoomOutRight)))
    ]),
    trigger('meusAnimator',[
      transition('* => slideInLeft', animate(1000, keyframes(kf.slideInLeft)))
    ])
  ]
 })
 export class HomePage {

   @ViewChild(Slides) slides: Slides;

   animationState:string;

   constructor(public navCtrl: NavController,
                 public navParams: NavParams,
                     private myTabs: TabsEnablor) {
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

   ionViewDidEnter() {
    //  console.log('ionViewDidLoad HomePage');
   }

 }
