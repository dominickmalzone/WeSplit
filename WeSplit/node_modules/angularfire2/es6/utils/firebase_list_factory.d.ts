import { FirebaseListObservable, AFUnwrappedDataSnapshot } from './firebase_list_observable';
import * as Firebase from 'firebase';
import { Query } from './query_observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
export declare function FirebaseListFactory(absoluteUrlOrDbRef: string | Firebase | FirebaseQuery, {preserveSnapshot, query}?: FirebaseListFactoryOpts): FirebaseListObservable<any>;
export interface FirebaseListFactoryOpts {
    preserveSnapshot?: boolean;
    query?: Query;
}
export declare function unwrapMapFn(snapshot: FirebaseDataSnapshot): AFUnwrappedDataSnapshot;
export declare function onChildAdded(arr: any[], child: any, prevKey: string): any[];
export declare function onChildChanged(arr: any[], child: any, prevKey: string): any[];
export declare function onChildRemoved(arr: any[], child: any): any[];
export declare function onChildUpdated(arr: any[], child: any, prevKey: string): any[];
