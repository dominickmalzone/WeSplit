import {IonicApp, Page, NavController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/account/account.html'
})
export class AccountPage {
   static get parameters() {
    return [[NavController], [UserData]];
  }

  constructor(nav, userData) {
    this.nav = nav;
    // this.speakers = [];
    
    this.userData = userData;
    this.userName = userData.userName;
    this.groupName = userData.groupName;
   

    // this.items = this.getItems(this.groupName);

    this.firebaseUrl = "https://wesplitapp.firebaseio.com/";
    // confData.getSpeakers().then(speakers => {
    //   this.speakers = speakers;
    // });
  }

  getGroupName() {
  	console.log("getGroupName function worked with", this.groupName);
  	return this.groupName;
  }

}
