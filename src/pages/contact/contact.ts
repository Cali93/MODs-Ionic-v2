import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Message } from '../../models/messages/messages';
import { ContactProvider } from '../../providers/contact/contact';
import { ToastProvider } from '../../providers/toast/toast';
import { HomePage } from '../../pages/home/home';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';

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
    private toast: ToastProvider,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer) {}

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

  onPhone(){
    this.callNumber.callNumber("003222177133", true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  onMail(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });

     let email = {
       to: 'info@mail-mcb.be',
       cc: 'julien@mail-mcb.be',
      //  bcc: ['john@doe.com', 'jane@doe.com'],
      //  attachments: [
      //    'file://img/logo.png',
      //    'res://icon.png',
      //    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //    'file://README.pdf'
      //  ],
       subject: 'Demande au sujet de',
       body: 'Votre message ici',
       isHtml: true
     };

     // Send a text message using default options
     this.emailComposer.open(email)
     .then(() => console.log('Launched mailer !'))
     .catch(() => console.log('Error launching mailer'));
  }

}
