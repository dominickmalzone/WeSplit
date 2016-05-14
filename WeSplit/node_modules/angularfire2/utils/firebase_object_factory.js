"use strict";
var firebase_object_observable_1 = require('./firebase_object_observable');
require('rxjs/add/operator/mergeMap');
var Firebase = require('firebase');
var utils = require('./utils');
function FirebaseObjectFactory(absoluteUrlOrDbRef, _a) {
    var _b = _a === void 0 ? {} : _a, preserveSnapshot = _b.preserveSnapshot, query = _b.query;
    var ref;
    utils.checkForUrlOrFirebaseRef(absoluteUrlOrDbRef, {
        isUrl: function () { return ref = new Firebase(absoluteUrlOrDbRef); },
        isRef: function () { return ref = absoluteUrlOrDbRef; }
    });
    return new firebase_object_observable_1.FirebaseObjectObservable(function (obs) {
        ref.on('value', function (snapshot) {
            obs.next(preserveSnapshot ? snapshot : snapshot.val());
        }, function (err) {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });
        return function () { return ref.off(); };
    }, ref);
}
exports.FirebaseObjectFactory = FirebaseObjectFactory;
//# sourceMappingURL=firebase_object_factory.js.map