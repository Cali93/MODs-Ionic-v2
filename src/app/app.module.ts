import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsEnablor } from '../providers/custom/tabsEnablor';
import { ContactProvider } from '../providers/contact/contact';
import { ToastProvider } from '../providers/toast/toast';

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
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { PreorderProvider } from '../providers/preorder/preorder';
import { UserProvider } from '../providers/user/user';

import { ThreeAngular } from '../threeAngular/threeAngular.module';
import { AuthProvider } from '../providers/auth/auth';
import { FiredocumentPage } from '../pages/firedocument/firedocument';
import { ProjectProvider } from '../providers/project/project';

/* import { AgmCoreModule } from '@agm/core'; */


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
    FiredocumentPage,
    DisconnectPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    NgbModule.forRoot(),
    ThreeAngular,
    /* AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDV_CKQVzn_UF7DwTbtihbsXwTpFwj8FdU'
    }) */
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    HomePage,
    ContactPage,
    ModsPage,
    ShopPage,
    LoginPage,
    SigninPage,
    DisconnectPage,
    FiredocumentPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TabsEnablor,
    ContactProvider,
    ToastProvider,
    CallNumber,
    EmailComposer,
    PreorderProvider,
    UserProvider,
    AuthProvider,
    ProjectProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
