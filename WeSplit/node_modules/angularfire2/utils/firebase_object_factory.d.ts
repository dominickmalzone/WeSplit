import { FirebaseObjectObservable } from './firebase_object_observable';
import 'rxjs/add/operator/mergeMap';
import * as Firebase from 'firebase';
import { Query } from './query_observable';
export declare function FirebaseObjectFactory(absoluteUrlOrDbRef: string | Firebase, {preserveSnapshot, query}?: FirebaseObjectFactoryOpts): FirebaseObjectObservable<any>;
export interface FirebaseObjectFactoryOpts {
    preserveSnapshot?: boolean;
    query?: Query;
}
