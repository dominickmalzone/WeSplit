import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Account} from './pages/account/account';


import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

@App({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    providers: [
        FIREBASE_PROVIDERS,
        defaultFirebase('https://wesplitapp.firebaseio.com/')
    ],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
    rootPage: any = Account;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }
}