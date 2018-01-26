import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { ShopPage } from '../shop/shop';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
 							public navParams: NavParams) {
 	}

 	signUserUp() {
 		this.firebase.auth.createUserWithEmailAndPassword(this.email, this.password1)
 		.then(user => {
 			console.log(user);
 			this.userId = user.uid;
 			this.db.list('/users').push(
		 			{	
		 				userId: this.userId,
		 				firstname: this.firstname,
		 				lastname: this.lastname,
		 				email: this.email,
		 				company: this.company,
		 				phone: this.phone,
		 				password: this.password1
		 			}
	 			);

 				this.navCtrl.parent.select(2);
 				this.navCtrl.pop();
	 			this.setCurrentUserToken();
	 		}
 		)
 		.catch(error => {
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
 		console.log('ionViewDidLoad SigninPage');
 	}

 }
