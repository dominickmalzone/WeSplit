import { FirebaseObjectObservable } from './firebase_object_observable';
import 'rxjs/add/operator/mergeMap';
import * as Firebase from 'firebase';
import * as utils from './utils';
export function FirebaseObjectFactory(absoluteUrlOrDbRef, { preserveSnapshot, query } = {}) {
    let ref;
    utils.checkForUrlOrFirebaseRef(absoluteUrlOrDbRef, {
        isUrl: () => ref = new Firebase(absoluteUrlOrDbRef),
        isRef: () => ref = absoluteUrlOrDbRef
    });
    return new FirebaseObjectObservable((obs) => {
        ref.on('value', (snapshot) => {
            obs.next(preserveSnapshot ? snapshot : snapshot.val());
        }, err => {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });
        return () => ref.off();
    }, ref);
}
//# sourceMappingURL=firebase_object_factory.js.map