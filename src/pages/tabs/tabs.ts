import { Component } from '@angular/core';
import { TabsEnablor } from '../../providers/custom/tabsEnablor';

import { HomePage } from '../home/home';
import { ModsPage } from '../mods/mods';
import { ShopPage } from '../shop/shop';
import { ContactPage } from '../contact/contact';
import { DisconnectPage } from '../disconnect/disconnect';


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ModsPage;
  tab3Root = ShopPage;
  tab4Root = ContactPage;
  tab5Root = DisconnectPage;

  constructor(public tabsEnablor: TabsEnablor) {
  }

  IonViewDidLoad() {
  	console.log('Tabs isEnabled state : ', this.isEnabled)
  }

}
