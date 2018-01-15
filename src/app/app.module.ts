import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { ModsPage } from '../pages/mods/mods';
import { ShopPage } from '../pages/shop/shop';
import { TabsPage } from '../pages/tabs/tabs';

import { ComponentsModule } from '../components/components.module';
import { AuthProvider } from '../providers/auth/auth';
import { ValidateProvider } from '../providers/validate/validate';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,
    ModsPage,
    TabsPage,
    ShopPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactPage,
    ModsPage,
    ShopPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ValidateProvider
  ]
})
export class AppModule {}
