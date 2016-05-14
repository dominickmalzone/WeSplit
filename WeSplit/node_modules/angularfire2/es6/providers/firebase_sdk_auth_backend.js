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
import { Injectable, Inject } from '@angular/core';
import { AuthBackend, AuthProviders, authDataToAuthState } from './auth_backend';
import { FirebaseRef } from '../tokens';
import { isPresent } from '../utils/utils';
import * as Firebase from 'firebase';
export let FirebaseSdkAuthBackend = class FirebaseSdkAuthBackend extends AuthBackend {
    constructor(_fbRef, _webWorkerMode = false) {
        super();
        this._fbRef = _fbRef;
        this._webWorkerMode = _webWorkerMode;
    }
    createUser(creds) {
        return new Promise((resolve, reject) => {
            this._fbRef.createUser(creds, (err, authData) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(authData);
                }
            });
        });
    }
    onAuth(onComplete) {
        this._fbRef.onAuth(onComplete);
    }
    getAuth() {
        return this._fbRef.getAuth();
    }
    unauth() {
        this._fbRef.unauth();
    }
    authWithCustomToken(token, options) {
        let p = new Promise((res, rej) => {
            this._fbRef.authWithCustomToken(token, this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    }
    authAnonymously(options) {
        let p = new Promise((res, rej) => {
            this._fbRef.authAnonymously(this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    }
    authWithPassword(credentials, options) {
        let p = new Promise((res, rej) => {
            this._fbRef.authWithPassword(credentials, this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    }
    authWithOAuthPopup(provider, options) {
        let p = new Promise((res, rej) => {
            this._fbRef.authWithOAuthPopup(this._providerToString(provider), this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    }
    authWithOAuthRedirect(provider, options) {
        let p = new Promise((res, rej) => {
            this._fbRef.authWithOAuthRedirect(this._providerToString(provider), this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    }
    authWithOAuthToken(provider, credentialsObj, options) {
        let p = new Promise((res, rej) => {
            let credentials = isPresent(credentialsObj.token)
                ? credentialsObj.token
                : credentialsObj;
            this._fbRef.authWithOAuthToken(this._providerToString(provider), credentials, this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    }
    _handleFirebaseCb(res, rej, options) {
        return (err, auth) => {
            if (err) {
                return rej(err);
            }
            else {
                if (!this._webWorkerMode)
                    return res(authDataToAuthState(auth));
                else {
                    if (isPresent(options) && isPresent(options.remember)) {
                        auth.remember = options.remember;
                    }
                    return res(auth);
                }
            }
        };
    }
    _providerToString(provider) {
        switch (provider) {
            case AuthProviders.Github:
                return 'github';
            case AuthProviders.Twitter:
                return 'twitter';
            case AuthProviders.Facebook:
                return 'facebook';
            case AuthProviders.Google:
                return 'google';
            default:
                throw new Error(`Unsupported firebase auth provider ${provider}`);
        }
    }
};
FirebaseSdkAuthBackend = __decorate([
    Injectable(),
    __param(0, Inject(FirebaseRef)), 
    __metadata('design:paramtypes', [Firebase, Object])
], FirebaseSdkAuthBackend);
//# sourceMappingURL=firebase_sdk_auth_backend.js.map