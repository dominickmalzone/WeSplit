export function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
export function isString(value) {
    return typeof value === 'string';
}
export function isFirebaseRef(value) {
    return value instanceof Firebase;
}
export function isFirebaseDataSnapshot(value) {
    return typeof value.key === 'function';
}
export function isAFUnwrappedSnapshot(value) {
    return typeof value.$key === 'string';
}
export function isFirebaseQuery(value) {
    return typeof value.orderByChild === 'function';
}
export function isEmptyObject(obj) {
    if (!isPresent(obj)) {
        return false;
    }
    return Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({});
}
export function checkForUrlOrFirebaseRef(urlOrRef, cases) {
    if (isString(urlOrRef)) {
        return cases.isUrl();
    }
    if (isFirebaseRef(urlOrRef)) {
        return cases.isRef();
    }
    if (isFirebaseQuery(urlOrRef)) {
        return cases.isQuery();
    }
    throw new Error('Provide a url or a Firebase database reference');
}
//# sourceMappingURL=utils.js.map