import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../../../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { TheArchitect } from '../the-architect.service';
import { ProjectProvider } from '../../../providers/project/project';

@Component({
  selector: 'left-menu',
  templateUrl: 'left-menu.html'
})
export class LeftMenuComponent {

  isActive = true;
  objects: object[];

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: AngularFireAuth,
    public theArchitect: TheArchitect,
    public projectService: ProjectProvider
  ){}

  activeButton() {
    this.isActive = !this.isActive;
  }

  saveObjs(){
    this.objects = this.theArchitect.objects
    console.log(this.objects)
  }

  /* CREATE PROJECT*/
  createProject(){
    this.projectService.create()
  }

  getProject(id){
    this.projectService.getProject(id);
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') ? true : false;
  }

  logInOrSignIn() {
    if (this.firebase.auth.currentUser) {
      this.navCtrl.parent.select(2);
    }
    else {
      this.navCtrl.push(LoginPage);
    }
  }

}
