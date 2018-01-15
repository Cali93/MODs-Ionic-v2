import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModsPage } from './mods';

@NgModule({
  declarations: [
    ModsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModsPage),
  ],
})
export class ModsPageModule {}
