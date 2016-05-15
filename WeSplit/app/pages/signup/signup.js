import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  static get parameters() {
    return [[NavController], [UserData]];
  }

  

  constructor(nav, userData) {
    this.nav = nav;
    this.userData = userData;

    this.signup = {};
    this.submitted = false;
    this.firebaseUrl = "https://wesplitapp.firebaseio.com/";
    
  }

  onSignup(form) {
    this.submitted = true;

    console.log(form);
    console.log(form.email, form.password, this.firebaseUrl, "email, password, and firebase");

    if (form.valid) {
      this.userData.signup();
      
        var weSplitRef = new Firebase(this.firebaseUrl);

        weSplitRef.createUser({
          email: form.controls.email.value,
          password: form.controls.password.value
        }, function(error, userData) {
          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                console.log("The new user account cannot be created because the email is already in use.");
                break;
              case "INVALID_EMAIL":
                console.log("The specified email is not a valid email.");
                break;
              default:
                console.log("Error creating user:", error);
            }
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
          }
        }).then(function(regUser) {
           var username = form.controls.username.value;
           var email = form.controls.email.value;
           var groupName = username + "group";
           var regRef = new Firebase("https://wesplitapp.firebaseio.com/" + "users")
           .child(regUser.uid).set({
            date: Firebase.ServerValue.TIMESTAMP,
            username: username,
            group: groupName,
            email: email
          });

          console.log(regUser.uid, "in createUser");

          var firstGrouplist = {
            items: {
              item: "item1"
            }
          }


          var groupRef = new Firebase("https://wesplitapp.firebaseio.com/" + "groups")
          .child(groupName).set({
            firstGrouplist
          });

          this.userData.setGroupList(firstGrouplist);
          
        });

      this.nav.push(TabsPage);
    }
  }
}
