import {Page, NavParams} from 'ionic-angular';
import {SchedulePage} from '../schedule/schedule';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {MapPage} from '../map/map';
import {AccountPage} from '../account/account';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavParams]];
  }

  constructor(navParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    // set the root pages for each tab
    
    this.tab1Root = SpeakerListPage;
    this.tab2Root = SchedulePage;
    // this.tab3Root = MapPage;
    this.tab3Root = AccountPage;
  }
}
