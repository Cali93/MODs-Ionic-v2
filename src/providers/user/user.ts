// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../../models/user/user';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserProvider {
  private users = new Subject<any>();
  private context = this;

  private queryTheDbById = this.users.switchMap(
    value => this.db.list('users',
      ref => ref.orderByChild('uid').equalTo(value)
    ).valueChanges()
  );

  public queryTheDbByObj = this.db.list('users').snapshotChanges().map(users => {
    return users.map(user => ({ key: user.key, ...user.payload.val() }));
  })

  constructor(private db: AngularFireDatabase) {
    this.queryTheDbById.subscribe(
      queriedItem => {
        localStorage.setItem('userObject',queriedItem.toString());
      }
    );
    this.queryTheDbByObj.subscribe(users => {
    return users.map(user => user.key);
  });
  }

  addUser(user:User){
    //return this.userListRef.push(user)
  }

  getUser(){
    //return this.userListRef;
  }

  getUserByKey(key:string){
    return this.context.users.next(key)
  }


  getUserById(uid: string) {
    return this.context.users.next(uid);
  }

}
