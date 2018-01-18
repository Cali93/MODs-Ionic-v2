import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Message } from '../../models/messages/messages';
import { ContactProvider } from '../../providers/contact/contact';
import { ToastProvider } from '../../providers/toast/toast';
import { Toast } from 'ionic-angular/components/toast/toast';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  message: Message = {
    username: '',
    email: '',
    title: '',
    message: '',
    date: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contact: ContactProvider,
    private toast: ToastProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  addMessage(message: Message){
    this.contact.addMessage(message).then(ref => {
      this.toast.show(`Thanks ${message.username}, your message about ${message.title} has been sent !`)
    })
  }

  // createForm() {
  //   this.form = this.fb.group({

  //   })
  // }

  // onSubmit(){
  //   const { username, email, subject, message } = this.form.value;
  //   const date = Date();
  //   const html = `
  //   <div>From: ${username}</div>
  //   <div>Email: <a href="mailto:${email}">${email}</a></div>
  //   <div>Date: ${date}</div>
  //   <div>Message: ${message}</div>
  // `;

  // let formRequest = { username, email, subject, message, date, html };

  // this.afDatabase.list('/messages').push(formRequest)
  // this.form.reset()
  // }

}
