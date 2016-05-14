export declare function isPresent(obj: any): boolean;
export declare function isString(value: any): boolean;
export declare function isFirebaseRef(value: any): boolean;
export declare function isFirebaseDataSnapshot(value: any): boolean;
export declare function isAFUnwrappedSnapshot(value: any): boolean;
export declare function isFirebaseQuery(value: any): boolean;
export declare function isEmptyObject(obj: Object): boolean;
export interface CheckUrlRef {
    isUrl: () => any;
    isRef: () => any;
    isQuery?: () => any;
}
export declare function checkForUrlOrFirebaseRef(urlOrRef: string | Firebase | FirebaseQuery, cases: CheckUrlRef): any;
