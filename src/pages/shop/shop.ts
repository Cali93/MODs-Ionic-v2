import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';


/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  

  constructor(public navCtrl: NavController, 
        				public navParams: NavParams,
        					private myTabs: TabsEnablor) {
  }


  ionViewDidEnter() {
  	this.myTabs.setEnableState(true);
    console.log('ionViewDidEnter ShopPage');
  }

}
