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

  changeGroupName(newGroupName) {
    console.log(this.userData);
    
  }


  // getTestString() {
  //   return this.testString;
  // }

  onSignup(form) {
    this.submitted = true;

    console.log(form);
    console.log(this.firebaseUrl, "email, password, and firebase");

    var groupName = form.controls.userName.value + "group";
    this.userData.setGroupName(groupName);

    var userName = form.controls.userName.value;
    this.userData.setuserName(userName);

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
         var userName = form.controls.userName.value;
         var email = form.controls.email.value;
         var groupName = userName + "group";
         var regRef = new Firebase("https://wesplitapp.firebaseio.com/" + "users")
         .child(regUser.uid).set({
          date: Firebase.ServerValue.TIMESTAMP,
          userName: userName,
          group: groupName,
          email: email
        });

        console.log(regUser.uid, "in createUser");

        var items = {
          item: "item1"
          // uncomment above if items stops setting
        }


        var groupRef = new Firebase("https://wesplitapp.firebaseio.com/" + "groups")
        .child(groupName).set({
          items
        });

        // passedGroupName = groupName;

        // console.log("attempting to call changeGroupName");
        // changeGroupName(groupName);
        // console.log("passedGroupName", passedGroupName);

        // this.userData.setGroupList(firstGrouplist);
        // this.userData.signup(userName, form.controls.password.value, passedGroupName);
        // console.log(getTestString());

      });

      this.nav.push(TabsPage);
    }
  }
}
