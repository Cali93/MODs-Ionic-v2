import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Note } from '../../models/note/note';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-firetest',
  templateUrl: 'firetest.html',
})
export class FiretestPage implements OnInit {
  // Collection = RTDB's lists

  // We make a reference to a collection with the Note interface model
  notesCollection: AngularFirestoreCollection<Note>;

  //Then we'll get our data back as an observable of an Array of Notes
  notes: Observable<Note[]>

  // We'll use snapshot so we need to declare it
  snapshot: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore) {
  }

  ngOnInit(){
    // We'll make a reference to a collection here
    // Then we'll query the items ordered by the content (alphabetical) and 'en mode decroissant' & limit. We also could do it based on the date
    this.notesCollection = this.afs.collection('notes', ref => {
      return ref.orderBy('content', 'desc').limit(2)
    })

    // Now we'll try to make a query based on 2 types
    // The first step is to go on the link of the error
    // and then, we'll create an index rule in the firebase console to make the query work
    this.notesCollection = this.afs.collection('notes', ref => {
      return ref.orderBy('hearts', 'desc').orderBy('content')
    })

    // We'll now query based on the where statement
    this.notesCollection = this.afs.collection('notes', ref => {
      return ref.where('hearts', '>=', '5')
    })
    // Then we'll get the data filtered by that rule
    // !! We can use the == operator but not the != !!
    // Instead we could do something like this:
    // ref.where('hearts', '==', '5').where('content', '==', 'AAA') -> this is working only with the == operator

    // Now we'll get observable data by calling valueChanges() (this is = to a FirebaseListObservable but the data is now decoupled from the reference)
    this.notes = this.notesCollection.valueChanges()

    // About the observable, in most cases we'll just get the root data back with valueChanges() but if we want additional metadata we'll make a snapshot

    this.notesCollection = this.afs.collection('notes')
    this.notes = this.notesCollection.valueChanges()
    this.snapshot = this.notesCollection.snapshotChanges()
        .map(arr => {
          console.log(arr) // https://gyazo.com/d07741f28e77793e233191d0c5c3028a
          arr.map(snap => snap.payload.doc.data())
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiretestPage');
  }

}
