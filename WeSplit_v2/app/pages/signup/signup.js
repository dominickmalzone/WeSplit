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
           var regRef = new Firebase("https://wesplitapp.firebaseio.com/" + "users")
           .child(regUser.uid).set({
            date: Firebase.ServerValue.TIMESTAMP,
            username: form.controls.username.value,
            group: form.controls.username.value+"group",
            email: form.controls.email.value
          });
          console.log(regUser.uid, "in createUser");
        });

      this.nav.push(TabsPage);
    }
  }
}
