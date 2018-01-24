import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { ShopPage } from '../shop/shop';

/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	email: string;
	password: string;	
	loginError: string = 'Welcome back !';

	constructor(private firebase: AngularFireAuth, 
					public navCtrl: NavController, 
						public navParams: NavParams) {
	}

	logInUser() {
		this.firebase.auth.signInWithEmailAndPassword(this.email, this.password)
		.then(
			data => {
				this.setCurrentUserToken();
				this.navCtrl.parent.select(2);
			}
		)
		.catch(
			error => {

				if (error.code === 'auth/wrong-password') {
					this.loginError ='Wrong password.';
				} else {
					this.loginError = error.message;
				}

				console.log(error.message);
			}
		);
		
	}

	setCurrentUserToken(){
		this.firebase.auth.currentUser.getToken()
		.then(
			(token: string) => {
		    localStorage.setItem('isLoggedIn', token);
		  }
		);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

}
