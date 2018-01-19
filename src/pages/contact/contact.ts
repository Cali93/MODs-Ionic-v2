import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Message } from '../../models/messages/messages';
import { ContactProvider } from '../../providers/contact/contact';
import { ToastProvider } from '../../providers/toast/toast';
import { HomePage } from '../../pages/home/home';

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
    if( message.username == '' || message.email == ''|| message.title == '' || message.message == '') {
      this.toast.show(`Sorry ${message.username}, you must fill all fields`)
    } else {
      this.contact.addMessage(message).then(ref => {
        this.toast.show(`Thanks ${message.username}, your message about ${message.title} has been sent !`)
        this.navCtrl.push(HomePage)
      })
    }

  }

}
