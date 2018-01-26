import { Injectable } from '@angular/core';


@Injectable()
export class TabsEnablor {




  constructor() {
  }

  setEnableState(bool: boolean) {
  	this.isEnabled = bool;
    console.log('ALL YOUR BASES ARE BELONG TO US', bool);
  }

  getEnableState() {
    return this.isEnabled;
  }

}
