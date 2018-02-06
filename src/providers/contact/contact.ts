// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './../../models/messages/messages';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ContactProvider {
  private messageListRef = this.db.list<Message>('message-list')

  constructor(private db: AngularFireDatabase) {}

  addMessage(message:Message){
    return this.messageListRef.push(message)
  }

  getMessage(){
    return this.messageListRef
  }

}
