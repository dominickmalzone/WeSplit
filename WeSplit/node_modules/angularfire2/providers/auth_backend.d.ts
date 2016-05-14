export declare abstract class AuthBackend {
    abstract authWithCustomToken(token: string, options?: any): Promise<FirebaseAuthState>;
    abstract authAnonymously(options?: any): Promise<FirebaseAuthState>;
    abstract authWithPassword(credentials: FirebaseCredentials, options?: any): Promise<FirebaseAuthState>;
    abstract authWithOAuthPopup(provider: AuthProviders, options?: any): Promise<FirebaseAuthState>;
    abstract authWithOAuthRedirect(provider: AuthProviders, options?: any): Promise<FirebaseAuthState>;
    abstract authWithOAuthToken(provider: AuthProviders, credentialsObj: OAuthCredentials, options?: any): Promise<FirebaseAuthState>;
    abstract onAuth(onComplete: (authData: FirebaseAuthData) => void): void;
    abstract getAuth(): FirebaseAuthData;
    abstract unauth(): void;
    abstract createUser(credentials: FirebaseCredentials): Promise<FirebaseAuthData>;
}
export interface FirebaseAuthDataAllProviders extends FirebaseAuthData {
    github?: any;
    twitter?: any;
    google?: any;
    facebook?: any;
    password?: any;
    anonymous?: any;
}
export declare enum AuthProviders {
    Github = 0,
    Twitter = 1,
    Facebook = 2,
    Google = 3,
    Password = 4,
    Anonymous = 5,
    Custom = 6,
}
export declare enum AuthMethods {
    Popup = 0,
    Redirect = 1,
    Anonymous = 2,
    Password = 3,
    OAuthToken = 4,
    CustomToken = 5,
}
export interface AuthConfiguration {
    method?: AuthMethods;
    provider?: AuthProviders;
    remember?: string;
    scope?: string[];
}
export interface OAuth2Credentials {
    token: string;
}
export interface OAuth1Credentials {
    user_id: string;
    oauth_token: string;
    oauth_token_secret: string;
}
export declare type OAuthCredentials = OAuth1Credentials | OAuth2Credentials;
export declare type AuthCredentials = FirebaseCredentials | OAuthCredentials;
export interface FirebaseAuthState {
    uid: string;
    provider: AuthProviders;
    auth: Object;
    expires?: number;
    github?: any;
    google?: any;
    twitter?: any;
    facebook?: any;
    password?: any;
    anonymous?: any;
}
export declare function authDataToAuthState(authData: FirebaseAuthDataAllProviders): FirebaseAuthState;
