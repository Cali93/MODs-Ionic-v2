import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {
  AngularFireAuth
} from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
import {
  AngularFirestoreModule,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import {
  AuthProvider
} from '../../providers/auth/auth';

import {
  LoginPage
} from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  firstname: string;
  lastname: string;
  email: string;
  company: string;
  phone: string;
  password1: string;
  password2: string;

  userId: string;


  constructor(
    private firebase: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public afs: AngularFirestore,
    public auth: AuthProvider) {}

  signUserUp() {
    this.firebase.auth.createUserWithEmailAndPassword(this.email, this.password1)
      .then(user => {
        console.log(user);
        this.userId = user.uid;
        this.afs.collection('/users').add({
          userId: this.userId,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          company: this.company,
          phone: this.phone,
        });

        const signup = this;
        signup.navCtrl.parent.select(2);
        signup.navCtrl.pop();
        signup.setCurrentUserToken();
      })
      .catch(error => {
        this.displayToast(error.message);
        console.log(error.message);
      });

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
    this.navCtrl.parent.select(0);
    this.navCtrl.pop();
  }

  setCurrentUserToken() {
    this.firebase.auth.currentUser.getToken()
      .then(
        (token: string) => {
          localStorage.setItem('isLoggedIn', token);
        }
      );
  }

  displayToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

  goToLogin() {
    this.navCtrl.pop();
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  ionViewDidEnter() {
    this.displayToast('Nice to meet you, don\'t be a stranger and fill this form !')
  }
}
