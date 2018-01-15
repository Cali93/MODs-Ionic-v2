import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  private login: FormGroup;

  constructor(
    private authProvider: AuthProvider,
    private formBuilder: FormBuilder
  ) { this.login = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  }) }

  ngOnInit(){

  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authProvider.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authProvider.storeUserData(data.token, data.user)
      } else {
        console.log("Auth failed")
      }
    })
  }

}
