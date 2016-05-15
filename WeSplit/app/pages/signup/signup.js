import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {

  // private 
  static get parameters() {
    return [[NavController], [UserData]];
  }

  // static passedGroupName;

  // var groupName;

  constructor(nav, userData) {
    this.nav = nav;
    this.userData = userData;

    this.signup = {};
    this.submitted = false;
    this.firebaseUrl = "https://wesplitapp.firebaseio.com/";

    this.testString = "testString";
  }

  // getTestString() {
  //   return this.testString;
  // }

  onSignup(form) {
    this.submitted = true;

    console.log(form);
    console.log(form.email, form.password, this.firebaseUrl, "email, password, and firebase");

    if (form.valid) {
      
      
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
            item: "item1"
          }


          var groupRef = new Firebase("https://wesplitapp.firebaseio.com/" + "groups")
          .child(groupName).set({
            firstGrouplist
          });

          // passedGroupName = groupName;

          // console.log("passedGroupName", passedGroupName);

          // this.userData.setGroupList(firstGrouplist);
          // this.userData.signup(username, form.controls.password.value, passedGroupName);
          // console.log(getTestString());

        });

      this.nav.push(TabsPage);
    }
  }
}
