import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Preorder } from '../../models/preorder/preorder';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class PreorderProvider {

  preordersCollection: AngularFirestoreCollection<Preorder>;
  preorderDocument:   AngularFirestoreDocument<Preorder>;

  constructor(private afs: AngularFirestore) {
    this.preordersCollection = this.afs.collection('preorders', (ref) => ref.orderBy('time', 'desc').limit(5));
  }

  getData(): Observable<Preorder[]> {
    return this.preordersCollection.valueChanges();
  }

  getSnapshot(): Observable<Preorder[]> {
    // ['added', 'modified', 'removed']
    return this.preordersCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Preorder;
        return { id: a.payload.doc.id, projectName:data.projectName, projectId: data.projectId, quantities : data.quantities, projectImg: data.projectImg, date: data.date };
      });
    });
  }

  getPreorder(id: string) {
    return this.afs.doc<Preorder>(`preorders/${id}`);
  }

  create(userComments: string, projectName) {
    const preorder = {
      projectName,
      userComments,
      quantities: 1,
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
