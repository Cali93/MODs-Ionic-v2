import { Injectable } from '@angular/core';
import { User } from './../../models/user/user';
import { Preorder } from './../../models/preorder/preorder';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireDatabaseModule, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// export class Item {
//   body: string;
// }

@Injectable()
export class UserProvider {

  preorders: Observable<any>
  userId: string;
  // private userListRef = this.db.list<User>
  // ('users')

  // private userSource = new BehaviorSubject<Object>("default user");
  // currentUser = this.userSource.asObservable();
  preordersRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
    this.preordersRef = db.list('preorders')
    this.preorders = this.preordersRef.snapshotChanges().map(changes => {
      return changes.map( c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    })
  }


  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(): Observable<Preorder[]> {
    if (!this.userId) return;
    this.preordersRef = this.db.list(`preorders/${this.userId}`);
    return this.preorders
  }
  createItem(preorder: Preorder)  {
    this.preordersRef.push(preorder)
  }

  // getUser(){
  //   return this.userListRef
  // }

  // changeUser(user:object){
  //   this.userSource.next(user)
  // }

}
