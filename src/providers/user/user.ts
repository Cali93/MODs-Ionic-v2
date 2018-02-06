// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../../models/user/user';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserProvider {
  private userListRef = this.db.list<User>('users')

  constructor(private db: AngularFireDatabase) {}

  addUser(user:User){
    return this.userListRef.push(user)
  }

  getUser(){
    return this.userListRef;
  } 


  getUserById(uid: string) {
    return this.db.list('users', ref => ref.orderByChild('userId').equalTo(uid));
  }

}
