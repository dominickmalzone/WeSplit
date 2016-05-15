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
    // this.authHandler();
  }

  onLogin(form) {
    this.submitted = true;
    var email = form.controls.email.value;
    var password = form.controls.password.value

    // console.log()

    if (form.valid) {
      this.userData.login();
      
      /* Authenticate User */ 
      var ref = new Firebase(this.firebaseUrl);
      ref.authWithPassword({
        email    : email,
        password : password
      }, this.authHandler());
      
    }



    var userName = form.controls.userName.value;
    this.userData.setuserName(userName);

    var groupName = userName + "group";
    this.userData.setGroupName(groupName);

    console.log("login", userName, groupName);

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
