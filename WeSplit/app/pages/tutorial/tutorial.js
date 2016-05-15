import {Page, NavController, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';


@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  static get parameters() {
    return [[NavController], [MenuController]];
  }

  constructor(nav, menu) {
    this.nav = nav;
    this.menu = menu;
    this.showSkip = true;

    this.slides = [
      {
        title: "Welcome to <b>WeSplit</b>",
        description: "<b>WeSplit</b> is a grocery list manager and payement tracker for housemates.",
        image: "img/ica-slidebox-img-1.png",
      },
      {
        title: "Group Lists",
        description: "So you and your housemates can make your shopping list as you need it. It syncs with all group members in real-time so you never miss anything.",
        image: "img/ica-slidebox-img-2.png",
      },
      {
        title: "Payement Tracker",
        description: "Will help everyone ensure fair contribution to your grocery expense.",
        image: "img/ica-slidebox-img-3.png",
      }
    ];
  }

  startApp() {
    this.nav.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
