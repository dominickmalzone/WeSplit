import {Page} from 'ionic-angular';
import {Buy} from '../buy/buy';
import {List} from '../list/list';
import {Account} from '../account/account';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Buy;
  tab2Root: any = List;
  tab3Root: any = Account;
}
