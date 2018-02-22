import {
  Injectable
} from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import {
  Project
} from '../../models/project/project';

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
import {
  TheArchitect
} from '../../threeAngular/the-matrix/the-architect.service';



@Injectable()
export class ProjectProvider {
  projectsCollection: AngularFirestoreCollection < Project > ;
  projects: AngularFirestoreDocument < Project[] > ;

  constructor(private afs: AngularFirestore, private authService: AuthProvider, private auth: AngularFireAuth, private theArchitecht: TheArchitect) {
    this.projectsCollection = this.afs.collection('projects');
  }

  getData(): Observable < Project[] > {
    return this.projectsCollection.valueChanges();
  }

  getSnapshot(): Observable < Project[] > {
    // ['added', 'modified', 'removed']
    return this.projectsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Project;
        return {
          id: a.payload.doc.id,
          uid: data.uid,
          mesh: data.mesh
        };
      });
    });
  }

  getProject(id: string) {
    return this.afs.doc < Project > (`projects/${id}`);
  }

  create() {
    // const mesh = {...this.theArchitecht.objects}
    // const mesh = this.theArchitecht.objects.map((obj)=> {return Object.assign({}, obj)});

    let mesh = this.theArchitecht.objects.map((obj)=> {
      var threeObj = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key != 'parent'){
           threeObj[key] = obj[key];
          }
        }
      }
      return threeObj })

    mesh = JSON.parse(JSON.stringify(mesh))

    // uid will be null if the user is not logged in
    const uid = this.auth.authState
      .take(1)
      .subscribe(authSate => {
        const uid = authSate ? authSate.uid : null;
        console.log(uid)
        const project = {
          uid,
          mesh
        };
        console.log(project)
        return this.projectsCollection.add(project);
      })

  }

  updateProject(id: string, data: Partial < Project > ) {
    return this.getProject(id).update(data);
  }

  deleteProject(id: string) {
    return this.getProject(id).delete();
  }
}
