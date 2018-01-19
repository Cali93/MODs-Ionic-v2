import { Component, ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ModsPage } from '../mods/mods';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('bounce', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('* => rightSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset:0}),
        style({transform: 'translateX(-65px)', offset: .3}),
        style({transform: 'translateX(0)', offset:1})
      ]))),
      transition('* => leftSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset:0}),
        style({transform: 'translateX(65px)', offset: .3}),
        style({transform: 'translateX(0)', offset:1})
      ])))
    ])
  ]
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "GET STARTED";
  state: string = 'x';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  skip(){
    this.navCtrl.push(ModsPage);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
