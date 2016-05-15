import {NavController, Page, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {SpeakerDetailPage} from '../buy-detail/buy-detail';
import {SessionDetailPage} from '../buy-detail/buy-detail';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/list/list.html'
})

export class ListPage {
  static get parameters() {
    return [[NavController], [ConferenceData], [UserData]];
  }

  constructor(nav, confData, userData) {
    this.nav = nav;
    this.confData = confData;
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
    // first log the groupId
    // console.log(this.groupId);
    console.log("userData", this.userData);
    console.log("groupName", this.groupName);
    return this.groupName;
  }

  //goal update groupList according to fireBase and groupName
  getItems(groupName) {
    var items;
    if (groupName) {
      var groupRef = new Firebase(this.firebaseUrl + "groups/" + groupName);
      if (groupRef) {
        groupRef.once("value", function(snapshot) {
          if (snapshot.exists()) {
            items = snapshot.val()["items"];
          }
        }, function(errorObject) {
          console.log("The snapshot failed: ", errorObject.code);
        });
      }
    }
    return items;
  }

  // auth.$onAuth(function(authUser) {
  //     if (authUser) {
  //       tasksListRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/tasks');
  //       if (tasksListRef) {
  //         tasksListRef.once("value", function(snapshot) {
  //             if (snapshot.exists()) {
  //                 tasksList = snapshot.val()["tasksList"];
  //                 completedTasksList = snapshot.val()["completedTasksList"];
  //                 // userName = snapshot.val()[""]
  //                 // console.log("exerciseList:", $scope.exerciseList);
  //                 // showLoginContent = false;
  //             }
  //         }, function(errorObject) {
  //             console.log("The read failed: ", errorObject.code);
  //         });
  //       }
  //       userRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id);
  //       if (userRef) {
  //         userRef.once("value", function(snapshot) {
  //             if (snapshot.exists()) {
  //                 // exerciseList = snapshot.val()["exerciseList"];
  //                 firstname = snapshot.val()["firstname"];
  //                 lastname = snapshot.val()["lastname"];
  //                 email = snapshot.val()["email"];
  //                 // console.log("exerciseList:", $scope.exerciseList);
  //             }
  //         }, function(errorObject) {
  //             console.log("The read failed: ", errorObject.code);
  //         });
  //       }
  //     }
  // })



  // goToSessionDetail(session) {
  //   this.nav.push(SessionDetailPage, session);
  // }

  // goToSpeakerDetail(speakerName) {
  //   this.nav.push(SpeakerDetailPage, speakerName);
  // }

  // goToSpeakerTwitter(speaker) {
  //   window.open(`https://twitter.com/${speaker.twitter}`);
  // }

  // openSpeakerShare(speaker) {
  //   let actionSheet = ActionSheet.create({
  //     title: 'Share ' + speaker.name,
  //     buttons: [
  //       {
  //         text: 'Copy Link',
  //         handler: () => {
  //           console.log("Copy link clicked on https://twitter.com/" + speaker.twitter);
  //           if (window.cordova && window.cordova.plugins.clipboard) {
  //             window.cordova.plugins.clipboard.copy("https://twitter.com/" + speaker.twitter);
  //           }
  //         }
  //       },
  //       {
  //         text: 'Share via ...',
  //         handler: () => {
  //           console.log("Share via clicked");
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log("Cancel clicked");
  //         }
  //       },
  //     ]
  //   });

  //   this.nav.present(actionSheet);
  // }
}
