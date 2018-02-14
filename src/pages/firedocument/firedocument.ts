import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
  selector: 'page-firedocument',
  templateUrl: 'firedocument.html',
})
export class FiredocumentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }


    /// Social Login

    signInWithGithub() {
      this.auth.githubLogin()
      .then(() => this.afterSignIn());
    }

    signInWithGoogle() {
      this.auth.googleLogin()
        .then(() => this.afterSignIn());
    }

    signInWithFacebook() {
      this.auth.facebookLogin()
        .then(() => this.afterSignIn());
    }

    signInWithTwitter() {
      this.auth.twitterLogin()
        .then(() => this.afterSignIn());
    }

    /// Anonymous Sign In

    signInAnonymously() {
      this.auth.anonymousLogin()
        .then(() => this.afterSignIn());
    }
  logout() {
    this.auth.signOut();
  }
  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.navCtrl.parent.select(2);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiredocumentPage');
  }

}
