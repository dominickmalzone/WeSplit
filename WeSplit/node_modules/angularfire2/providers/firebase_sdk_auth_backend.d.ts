import { AuthBackend, FirebaseAuthState, AuthProviders, OAuthCredentials } from './auth_backend';
import * as Firebase from 'firebase';
export declare class FirebaseSdkAuthBackend extends AuthBackend {
    private _fbRef;
    private _webWorkerMode;
    constructor(_fbRef: Firebase, _webWorkerMode?: boolean);
    createUser(creds: FirebaseCredentials): Promise<FirebaseAuthData>;
    onAuth(onComplete: (authData: FirebaseAuthData) => void): void;
    getAuth(): FirebaseAuthData;
    unauth(): void;
    authWithCustomToken(token: string, options?: any): Promise<FirebaseAuthState>;
    authAnonymously(options?: any): Promise<FirebaseAuthState>;
    authWithPassword(credentials: FirebaseCredentials, options?: any): Promise<FirebaseAuthState>;
    authWithOAuthPopup(provider: AuthProviders, options?: any): Promise<FirebaseAuthState>;
    authWithOAuthRedirect(provider: AuthProviders, options?: any): Promise<FirebaseAuthState>;
    authWithOAuthToken(provider: AuthProviders, credentialsObj: OAuthCredentials, options?: any): Promise<FirebaseAuthState>;
    private _handleFirebaseCb(res, rej, options);
    private _providerToString(provider);
}
