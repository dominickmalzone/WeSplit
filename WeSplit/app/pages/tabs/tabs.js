import {Page, NavParams} from 'ionic-angular';
import {SchedulePage} from '../buy/buy';
import {ListPage} from '../list/list';
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
    this.tab1Root = ListPage;
    this.tab2Root = AccountPage;
    // this.tab3Root = MapPage;
    // this.tab3Root = AccountPage;
  }
}
