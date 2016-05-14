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
import { Inject, Injectable } from '@angular/core';
import { FirebaseUrl } from '../tokens';
import { FirebaseListFactory } from '../utils/firebase_list_factory';
import { FirebaseObjectFactory } from '../utils/firebase_object_factory';
import * as utils from '../utils/utils';
export let FirebaseDatabase = class FirebaseDatabase {
    constructor(fbUrl) {
        this.fbUrl = fbUrl;
    }
    list(urlOrRef, opts) {
        return utils.checkForUrlOrFirebaseRef(urlOrRef, {
            isUrl: () => FirebaseListFactory(getAbsUrl(this.fbUrl, urlOrRef), opts),
            isRef: () => FirebaseListFactory(urlOrRef)
        });
    }
    object(urlOrRef, opts) {
        return utils.checkForUrlOrFirebaseRef(urlOrRef, {
            isUrl: () => FirebaseObjectFactory(getAbsUrl(this.fbUrl, urlOrRef), opts),
            isRef: () => FirebaseObjectFactory(urlOrRef)
        });
    }
};
FirebaseDatabase = __decorate([
    Injectable(),
    __param(0, Inject(FirebaseUrl)), 
    __metadata('design:paramtypes', [String])
], FirebaseDatabase);
function getAbsUrl(root, url) {
    if (!(/^[a-z]+:\/\/.*/.test(url))) {
        url = root + url;
    }
    return url;
}
//# sourceMappingURL=database.js.map