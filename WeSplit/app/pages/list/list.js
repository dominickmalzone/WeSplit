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
    this.groupList = [];
    this.userData = userData;
    this.groupId = userData.groupId;


    // confData.getSpeakers().then(speakers => {
    //   this.speakers = speakers;
    // });
  }

  getGroupList() {
    // first log the groupId
    // console.log(this.groupId);
    console.log("userData", this.userData, "groupId", this.groupId);
  }







  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speakerName) {
    this.nav.push(SpeakerDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker) {
    window.open(`https://twitter.com/${speaker.twitter}`);
  }

  openSpeakerShare(speaker) {
    let actionSheet = ActionSheet.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log("Copy link clicked on https://twitter.com/" + speaker.twitter);
            if (window.cordova && window.cordova.plugins.clipboard) {
              window.cordova.plugins.clipboard.copy("https://twitter.com/" + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log("Share via clicked");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Cancel clicked");
          }
        },
      ]
    });

    this.nav.present(actionSheet);
  }
}
