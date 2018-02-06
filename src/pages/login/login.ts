import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { SigninPage } from '../signin/signin';

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


	constructor(private firebase: AngularFireAuth, 
					public navCtrl: NavController, 
						public navParams: NavParams,
							public toastCtrl: ToastController) {
	}

	logInUser() {
		this.firebase.auth.signInWithEmailAndPassword(this.email, this.password)
		.then(
			data => {
				this.setCurrentUserToken();
				this.navCtrl.parent.select(2);
				this.navCtrl.pop();
			}
		)
		.catch(
			error => {

				if (error.code === 'auth/wrong-password') {
					this.displayToast('Wrong password !');
				} else {
					this.displayToast(error.message);
				}

				console.log(error.message);
			}
		);
		
	}

	setCurrentUserToken(){
		const user = this.firebase.auth.currentUser;
		console.log(user);
		localStorage.setItem('user', user.displayName);
	}

	goToSignUp() {
		const login = this;
		login.navCtrl.pop();
		login.navCtrl.push(SigninPage);
		
	}

	displayToast(message: string) {
		this.toastCtrl.create(
			{
				message: message,
				duration: 3000
			}
		).present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	ionViewDidEnter() {
		this.displayToast('Welcome Back, nice to see you again !')
	}

}
