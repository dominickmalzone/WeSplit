import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export declare type FirebaseOperation = string | Firebase | FirebaseDataSnapshot | AFUnwrappedDataSnapshot;
export interface FirebaseOperationCases {
    stringCase: () => Promise<void>;
    firebaseCase?: () => Promise<void>;
    snapshotCase?: () => Promise<void>;
    unwrappedSnapshotCase?: () => Promise<void>;
}
export declare class FirebaseListObservable<T> extends Observable<T> {
    _ref: Firebase | FirebaseQuery;
    constructor(_ref: Firebase | FirebaseQuery, subscribe?: <R>(subscriber: Subscriber<R>) => Subscription | Function | void);
    lift<T, R>(operator: Operator<T, R>): Observable<R>;
    push(val: any): FirebaseWithPromise<void>;
    update(item: FirebaseOperation, value: Object): Promise<void>;
    remove(item?: FirebaseOperation): Promise<void>;
    _checkOperationCases(item: FirebaseOperation, cases: FirebaseOperationCases): Promise<void>;
}
export interface AFUnwrappedDataSnapshot {
    $key: string;
    $value?: string | number | boolean;
}
