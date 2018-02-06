// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../../models/user/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserProvider {
  private users = new Subject<any>();
  private context = this;

  private queryTheDbById = this.users.switchMap(
    value => this.db.list('users',
      ref => ref.orderByChild('userId').equalTo(value)
    ).valueChanges()
  );

  constructor(private db: AngularFireDatabase) {
    this.queryTheDbById.subscribe(
      queriedItem => { 
        localStorage.setItem('userObject',queriedItem.toString());
        
      }
    );
  }

  addUser(user:User){

    //return this.userListRef.push(user)
  }

  getUser(){
    //return this.userListRef;
  } 


  getUserById(uid: string) {
    return this.context.users.next(uid);
  }

}
