// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preorder } from './../../models/preorder/preorder';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class PreorderProvider {
  private preorderListRef = this.db.list<Preorder>
  ('preorder-list')

  constructor(private db: AngularFireDatabase) {}

  addPreorder(preorder:Preorder){
    return this.preorderListRef.push(preorder)
  }

  getPreorder(){
    return this.preorderListRef
  }

}
