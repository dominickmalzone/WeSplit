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
import { Inject, provide, Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { FirebaseAuthConfig } from '../tokens';
import { isPresent } from '../utils/utils';
import { AuthBackend, AuthMethods, authDataToAuthState } from './auth_backend';
const kBufferSize = 1;
export const firebaseAuthConfig = (config) => {
    return provide(FirebaseAuthConfig, {
        useValue: config
    });
};
export let FirebaseAuth = class FirebaseAuth extends ReplaySubject {
    constructor(_authBackend, _config) {
        super(kBufferSize);
        this._authBackend = _authBackend;
        this._config = _config;
        this._authBackend.onAuth((authData) => this._emitAuthData(authData));
    }
    login(obj1, obj2) {
        let config = null;
        let credentials = null;
        if (arguments.length > 2) {
            return this._reject('Login only accepts a maximum of two arguments.');
        }
        else if (arguments.length == 2) {
            credentials = obj1;
            config = obj2;
        }
        else if (arguments.length == 1) {
            if (obj1.password && obj1.email) {
                credentials = obj1;
                config = {};
            }
            else {
                config = obj1;
            }
        }
        config = this._mergeConfigs(config);
        if (!isPresent(config.method)) {
            return this._reject('You must provide a login method');
        }
        let providerMethods = [AuthMethods.Popup, AuthMethods.Redirect, AuthMethods.OAuthToken];
        if (providerMethods.indexOf(config.method) != -1) {
            if (!isPresent(config.provider)) {
                return this._reject('You must include a provider to use this auth method.');
            }
        }
        let credentialsMethods = [AuthMethods.Password, AuthMethods.OAuthToken, AuthMethods.CustomToken];
        if (credentialsMethods.indexOf(config.method) != -1) {
            if (!credentials) {
                return this._reject('You must include credentials to use this auth method.');
            }
        }
        switch (config.method) {
            case AuthMethods.Popup:
                return this._authBackend.authWithOAuthPopup(config.provider, this._scrubConfig(config));
            case AuthMethods.Redirect:
                return this._authBackend.authWithOAuthRedirect(config.provider, this._scrubConfig(config));
            case AuthMethods.Anonymous:
                return this._authBackend.authAnonymously(this._scrubConfig(config));
            case AuthMethods.Password:
                return this._authBackend.authWithPassword(credentials, this._scrubConfig(config, false));
            case AuthMethods.OAuthToken:
                return this._authBackend.authWithOAuthToken(config.provider, credentials, this._scrubConfig(config));
            case AuthMethods.CustomToken:
                return this._authBackend.authWithCustomToken(credentials.token, this._scrubConfig(config, false));
        }
    }
    logout() {
        if (this._authBackend.getAuth() !== null) {
            this._authBackend.unauth();
        }
    }
    getAuth() {
        return this._authBackend.getAuth();
    }
    createUser(credentials) {
        return this._authBackend.createUser(credentials);
    }
    _mergeConfigs(config) {
        if (this._config == null)
            return config;
        return Object.assign({}, this._config, config);
    }
    _reject(msg) {
        return new Promise((res, rej) => {
            return rej(msg);
        });
    }
    _scrubConfig(config, scrubProvider = true) {
        let scrubbed = Object.assign({}, config);
        if (scrubProvider) {
            delete scrubbed.provider;
        }
        delete scrubbed.method;
        return scrubbed;
    }
    _emitAuthData(authData) {
        if (authData == null) {
            this.next(null);
        }
        else {
            this.next(authDataToAuthState(authData));
        }
    }
};
FirebaseAuth = __decorate([
    Injectable(),
    __param(1, Optional()),
    __param(1, Inject(FirebaseAuthConfig)), 
    __metadata('design:paramtypes', [AuthBackend, Object])
], FirebaseAuth);
//# sourceMappingURL=auth.js.map