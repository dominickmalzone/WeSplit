import { Provider } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthBackend, AuthCredentials, FirebaseAuthState, AuthConfiguration } from './auth_backend';
export declare const firebaseAuthConfig: (config: AuthConfiguration) => Provider;
export declare class FirebaseAuth extends ReplaySubject<FirebaseAuthState> {
    private _authBackend;
    private _config;
    constructor(_authBackend: AuthBackend, _config?: AuthConfiguration);
    login(config?: AuthConfiguration): Promise<FirebaseAuthState>;
    login(credentials?: FirebaseCredentials): Promise<FirebaseAuthState>;
    login(credentials: AuthCredentials, config?: AuthConfiguration): Promise<FirebaseAuthState>;
    logout(): void;
    getAuth(): FirebaseAuthData;
    createUser(credentials: FirebaseCredentials): Promise<FirebaseAuthData>;
    private _mergeConfigs(config);
    private _reject(msg);
    private _scrubConfig(config, scrubProvider?);
    private _emitAuthData(authData);
}
