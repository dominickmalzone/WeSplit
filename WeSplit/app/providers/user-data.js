import {Injectable} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class UserData {
  static get parameters(){
    return [[Events]];
  }

  constructor(events) {
    this._groupList = [];
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.HAS_LOGGED_IN = 'hasLoggedIn';
    this.userName = '';
    this.groupName = '';
  }

  setGroupList(groupList) {
    this._groupList = groupList;
  }

  getGroupName() {
    return this.groupName;
  }

  setGroupName(newGroupName) {
    this.groupName = newGroupName;
  }

  setuserName(newuserName) {
    this.userName = newuserName;
  }

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName)
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(userName, password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  }

  signup(userName, password, groupName) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.groupName = groupName;
    console.log("groupName in signup", groupName);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.events.publish('user:logout');
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
}
