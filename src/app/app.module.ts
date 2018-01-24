import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsEnablor } from '../providers/custom/tabsEnablor';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { ModsPage } from '../pages/mods/mods';
import { ShopPage } from '../pages/shop/shop';
import { LoginPage } from '../pages/login/login';
import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
import { DisconnectPage } from '../pages/disconnect/disconnect';

import { ComponentsModule } from '../components/components.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


const config = {
  apiKey: "AIzaSyDRryIjGFGG0R9NxhjRel4Ysz3UkBq5zKY",
  authDomain: "modsv2-5ebca.firebaseapp.com",
  databaseURL: "https://modsv2-5ebca.firebaseio.com",
  projectId: "modsv2-5ebca",
  storageBucket: "modsv2-5ebca.appspot.com",
  messagingSenderId: "792470097085"
};

import { RightMenuComponent } from '../components/right-menu/right-menu';
import { LeftMenuComponent } from '../components/left-menu/left-menu';
import { ToolbarComponent } from '../components/toolbar/toolbar';
import { FakeWorldComponent } from '../components/fake-world/fake-world';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,
    ModsPage,
    TabsPage,
    ShopPage,

    LoginPage,
    SigninPage,
    DisconnectPage,

    RightMenuComponent,
    LeftMenuComponent,
    ToolbarComponent,
    FakeWorldComponent

  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactPage,
    ModsPage,
    ShopPage,
    LoginPage,
    SigninPage,
    DisconnectPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    TabsEnablor,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactProvider,
    ToastProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
