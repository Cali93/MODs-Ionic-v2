import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';
import { ToastProvider} from '../../providers/toast/toast';


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
        					private myTabs: TabsEnablor,
                    private toast: ToastProvider) {
  }


  ionViewDidEnter() {
  	this.myTabs.setEnableState(true);
    this.toast.show('Welcome ' + localStorage.getItem('user'));
    console.log('ionViewDidEnter ShopPage');
  }

}
