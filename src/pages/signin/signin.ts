import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { LoginPage } from '../login/login';

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


 	constructor(private db: AngularFireDatabase,
 					private firebase: AngularFireAuth,
 						public navCtrl: NavController,
 							public navParams: NavParams,
 								public toastCtrl: ToastController) {
 	}

 	signUserUp() {
 		this.firebase.auth.createUserWithEmailAndPassword(this.email, this.password1)
 		.then(user => {
 			console.log(user);
 			this.userId = user.uid;
 			this.db.list('/users').push(
		 			{
		 				userId: 	this.userId,
		 				firstname: 	this.firstname,
		 				lastname: 	this.lastname,
		 				email: 		this.email,
		 				company: 	this.company,
		 				phone: 		this.phone,
		 			}
	 			);

 				const signup = this;
 				signup.navCtrl.parent.select(2);
 				signup.navCtrl.pop();
	 			signup.setCurrentUserToken();
	 		}
 		)
 		.catch(error => {
 				this.displayToast(error.message);
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

	displayToast(message: string) {
		this.toastCtrl.create(
			{
				message: message,
				duration: 3000
			}
		).present();
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
