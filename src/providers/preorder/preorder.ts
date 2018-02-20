import {
  Injectable
} from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import {
  Preorder
} from '../../models/preorder/preorder';

import {
  AuthProvider
} from '../auth/auth';
import {
  User
} from '../../models/user/user';

import {
  Observable
} from 'rxjs/Observable';
import {
  map
} from 'rxjs/operators';
import 'rxjs/add/operator/take';
import {
  AngularFireAuth
} from 'angularfire2/auth';

@Injectable()
export class PreorderProvider {
  preordersCollection: AngularFirestoreCollection < Preorder > ;
  preorders: AngularFirestoreDocument < Preorder[] > ;

  constructor(private afs: AngularFirestore, private authService: AuthProvider, private auth: AngularFireAuth) {
    this.preordersCollection = this.afs.collection('preorders', (ref) => ref.orderBy('date', 'desc').limit(5));

    // uid will be null if the user is not logged in

  }

  getData(): Observable < Preorder[] > {
    return this.preordersCollection.valueChanges();
  }

  getSnapshot(): Observable < Preorder[] > {
    // ['added', 'modified', 'removed']
    return this.preordersCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Preorder;
        return {
          id: a.payload.doc.id,
          uid: data.uid,
          projectName: data.projectName,
          quantities: data.quantities,
          projectImg: data.projectImg,
          userComments: data.userComments,
          date: data.date
        };
      });
    });
  }

  getPreorder(id: string) {
    return this.afs.doc < Preorder > (`preorders/${id}`);
  }

  create(projectName: string, userComments: string, quantities: number) {
    const uid = this.auth.authState
      .take(1)
      .subscribe(authSate => {
        const uid = authSate ? authSate.uid : null;
        console.log(uid)
        const preorder = {
          uid,
          projectName,
          userComments,
          quantities,
          date: new Date().getTime(),
        };
        console.log(preorder)
        return this.preordersCollection.add(preorder);
      })

  }

  updatePreorder(id: string, data: Partial < Preorder > ) {
    return this.getPreorder(id).update(data);
  }

  deletePreorder(id: string) {
    return this.getPreorder(id).delete();
  }
}
