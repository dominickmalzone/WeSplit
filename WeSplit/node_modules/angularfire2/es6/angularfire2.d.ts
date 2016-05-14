import { Provider } from '@angular/core';
import { FirebaseAuth, firebaseAuthConfig } from './providers/auth';
import { FirebaseListObservable } from './utils/firebase_list_observable';
import { FirebaseObjectObservable } from './utils/firebase_object_observable';
import { FirebaseListFactory, FirebaseListFactoryOpts } from './utils/firebase_list_factory';
import { FirebaseObjectFactoryOpts, FirebaseObjectFactory } from './utils/firebase_object_factory';
import { AuthMethods, AuthProviders, FirebaseAuthState } from './providers/auth_backend';
import { FirebaseDatabase } from './database/database';
export declare class AngularFire {
    private fbUrl;
    auth: FirebaseAuth;
    database: FirebaseDatabase;
    list: (url: string, opts?: FirebaseListFactoryOpts) => FirebaseListObservable<any[]>;
    object: (url: string, opts?: FirebaseObjectFactoryOpts) => FirebaseObjectObservable<any>;
    constructor(fbUrl: string, auth: FirebaseAuth, database: FirebaseDatabase);
}
export declare const COMMON_PROVIDERS: any[];
export declare const FIREBASE_PROVIDERS: any[];
export declare const defaultFirebase: (url: string) => Provider;
export { FirebaseAuth, FirebaseDatabase, FirebaseListObservable, FirebaseObjectObservable, FirebaseListFactory, FirebaseObjectFactory, firebaseAuthConfig, FirebaseAuthState, AuthMethods, AuthProviders };
export { FirebaseUrl, FirebaseRef, FirebaseAuthConfig } from './tokens';
declare var _default: {
    providers: any[];
};
export default _default;
