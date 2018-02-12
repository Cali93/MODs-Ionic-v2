import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Preorder } from '../../models/preorder/preorder';

import { AuthProvider } from '../auth/auth';
import { User } from '../../models/user/user';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class PreorderProvider {
  preordersCollection: AngularFirestoreCollection<Preorder>;
  preorderDocument:   AngularFirestoreDocument<Preorder>;
  userDocument: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore, private authService: AuthProvider) {
    this.preordersCollection = this.afs.collection('preorders', (ref) => ref.orderBy('time', 'desc').limit(5));
  }

  // constructor(private afs: AngularFirestore, private authService: AuthProvider, private auth: AngularFireAuth) {
  //   this.userDocument = afs.doc<User>(`users/${user.uid}`);
  //   this.preordersCollection = this.userDocument.collection<Preorder>('preorders', ref => ref.orderBy('time', 'desc')).valueChanges();
  // }

  //   constructor(private afs: AngularFirestore, private authService: AuthProvider, private auth: AngularFireAuth) {
  //         this.preordersCollection = this.afs.collection('preorders', (ref) => ref.orderBy('time', 'desc').limit(5));
  // }

  getData(): Observable<Preorder[]> {
    return this.preordersCollection.valueChanges();
  }

  getSnapshot(): Observable<Preorder[]> {
    // ['added', 'modified', 'removed']
    return this.preordersCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Preorder;
        return { id: a.payload.doc.id, userId: data.userId, projectName:data.projectName, projectId: data.projectId, quantities : data.quantities, projectImg: data.projectImg, userComments:data.userComments, date: data.date };
      });
    });
  }

  getPreorder(id: string) {
    return this.afs.doc<Preorder>(`preorders/${id}`);
  }

  create(projectName: string, userComments: string, quantities:number) {
    const preorder = {
      userId: this.authService.user,
      projectName,
      userComments,
      quantities,
      date: new Date().getTime(),
    };
    return this.preordersCollection.add(preorder);
  }

  updatePreorder(id: string, data: Partial<Preorder>) {
    return this.getPreorder(id).update(data);
  }

  deletePreorder(id: string) {
    return this.getPreorder(id).delete();
  }
}
