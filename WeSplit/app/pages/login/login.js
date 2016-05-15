import {IonicApp, Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';



@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
    return [[NavController], [UserData]];
  }

  constructor(nav, userData) {
    this.nav = nav;
    this.userData = userData;

    this.login = {};
    this.submitted = false;
    
    this.firebaseUrl = "https://wesplitapp.firebaseio.com";
    this.authHandler();
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login();
      
      /* Authenticate User */ 
      var ref = new Firebase(this.firebaseUrl);
      ref.authWithPassword({
        email    : form.controls.username.value,
        password : form.controls.password.value
      }, this.authHandler);
      
    }

  }
  
  authHandler(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    } else {
        this.nav.push(TabsPage);
    }
  }
  
  onSignup() {
    this.nav.push(SignupPage);
  }
}
