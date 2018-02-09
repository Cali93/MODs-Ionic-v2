import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';

 @IonicPage()
 @Component({
   selector: 'page-home',
   templateUrl: 'home.html'
 })
 export class HomePage {

   @ViewChild(Slides) slides: Slides;
   skipMsg: string = "GET STARTED";
   state: string = 'x';

   constructor(public navCtrl: NavController,
                 public navParams: NavParams,
                     private myTabs: TabsEnablor) {
   }

   skip(){
     this.navCtrl.parent.select(1);
   }

   slideChanged() {
     if(this.slides.isEnd()){
       this.skipMsg = "I GOT IT ! GET STARTED"
     }
   }

   slideMoved(){
     if(this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
       this.state = 'rightSwipe'
     else
       this.state = 'leftSwipe'
   }

   animationDone(){
     this.state = 'x'
   }

   ionViewDidEnter() {
    //  console.log('ionViewDidLoad HomePage');
   }

 }
