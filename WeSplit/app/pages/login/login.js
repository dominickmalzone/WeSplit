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
    
    this.firebaseUrl = "https://wesplitapp.firebaseio.com/";
  }

  onLogin(form) {
    this.submitted = true;
    var email = form.controls.email.value;
    var password = form.controls.password.value

    if (form.valid) {
      this.userData.login();
      
      /* Authenticate User */ 
      var ref = new Firebase(this.firebaseUrl);
      ref.authWithPassword({
        email    : email,
        password : password
      }, (error, authData) => {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          console.log("groupName", authData);

          var groupName;
          // var uid = authData.uid;
          // console.log(this.firebaseUrl, "fbu, authData.uid" authData.uid);
          console.log("uid", authData.uid);

          var groupNameRef = new Firebase(this.firebaseUrl + "users/" + authData.uid);
          if (groupNameRef) {
            groupNameRef.once("value", snapshot => {
              if (snapshot.exists()) {
                groupName = snapshot.val()["groupName"];


                this.userData.changeGroupName(groupName, authData.uid);
                this.userData.setUid(authData.uid);
          //       // // return items;
                console.log("groupName:", groupName);
              }
              // , function(errorObject) {
              // console.log("The snapshot failed: ", errorObject.code);
            });
          }

        }

      }, 
      this.authHandler()
      );
      
    }

    // var userName = form.controls.userName.value;
    // this.userData.setuserName(userName);

    // var groupName = userName + "'s group";
    // this.userData.setGroupName(groupName);

    // console.log("login", userName, groupName);

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


// ******* TODO *******
//  // later simply access the groupName by the email + password
    // later implement local storage
    // later give feedback to user if they use the incorrect email or password or username
    // otherwise user will misunderstand reason for breakage

