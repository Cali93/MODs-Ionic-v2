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
  //  skipMsg: string = "GET STARTED";
   animationState:string;

   constructor(public navCtrl: NavController,
                 public navParams: NavParams,
                     private myTabs: TabsEnablor) {
   }

  //  skip(){
  //    this.navCtrl.parent.select(1);
  //  }

  //  slideChanged() {
  //    if(this.slides.isEnd()){
  //      this.skipMsg = "I GOT IT ! GET STARTED"
  //    }
  //  }

  //  slideMoved(){
  //    if(this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
  //      this.state = 'rightSwipe'
  //    else
  //      this.state = 'leftSwipe'
  //  }

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
