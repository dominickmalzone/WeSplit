var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable, provide } from '@angular/core';
import { FirebaseAuth, firebaseAuthConfig } from './providers/auth';
import * as Firebase from 'firebase';
import { FirebaseListObservable } from './utils/firebase_list_observable';
import { FirebaseObjectObservable } from './utils/firebase_object_observable';
import { FirebaseListFactory } from './utils/firebase_list_factory';
import { FirebaseObjectFactory } from './utils/firebase_object_factory';
import { FirebaseUrl, FirebaseRef } from './tokens';
import { AuthBackend, AuthMethods, AuthProviders } from './providers/auth_backend';
import { FirebaseSdkAuthBackend } from './providers/firebase_sdk_auth_backend';
import { FirebaseDatabase } from './database/database';
export let AngularFire = class AngularFire {
    constructor(fbUrl, auth, database) {
        this.fbUrl = fbUrl;
        this.auth = auth;
        this.database = database;
        this.list = database.list.bind(database);
        this.object = database.object.bind(database);
    }
};
AngularFire = __decorate([
    Injectable(),
    __param(0, Inject(FirebaseUrl)), 
    __metadata('design:paramtypes', [String, FirebaseAuth, FirebaseDatabase])
], AngularFire);
function getAbsUrl(root, url) {
    if (!(/^[a-z]+:\/\/.*/.test(url))) {
        url = root + url;
    }
    return url;
}
export const COMMON_PROVIDERS = [
    provide(FirebaseRef, {
        useFactory: (url) => new Firebase(url),
        deps: [FirebaseUrl] }),
    FirebaseAuth,
    AngularFire,
    FirebaseDatabase
];
export const FIREBASE_PROVIDERS = [
    COMMON_PROVIDERS,
    provide(AuthBackend, {
        useFactory: (ref) => new FirebaseSdkAuthBackend(ref, false),
        deps: [FirebaseRef]
    })
];
export const defaultFirebase = (url) => {
    return provide(FirebaseUrl, {
        useValue: url
    });
};
export { FirebaseAuth, FirebaseDatabase, FirebaseListObservable, FirebaseObjectObservable, FirebaseListFactory, FirebaseObjectFactory, firebaseAuthConfig, AuthMethods, AuthProviders };
export { FirebaseUrl, FirebaseRef, FirebaseAuthConfig } from './tokens';
export default {
    providers: FIREBASE_PROVIDERS
};
//# sourceMappingURL=angularfire2.js.map