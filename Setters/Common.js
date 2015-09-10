function pair(x, y) {
    return [x, y];
}
function triple(x, y, z) {
    return [x, y, z];
}
function flatten(arrs) { return [].concat.apply([], arrs); }
function first(tuple) {
    return tuple[0];
}
function second(tuple) {
    return tuple[1];
}
function third(tuple) {
    return tuple[2];
}
function range(first, last) {
    var arr = new Array(last - first + 1);
    for (var i = first; i <= last; ++i) {
        arr[i - first] = i;
    }
    return arr;
}
function zipWith(arr1, arr2, f) {
    var res = [];
    var minLen = Math.min(arr1.length, arr2.length);
    for (var i = 0; i < minLen; ++i) {
        res.push(f(arr1[i], arr2[i]));
    }
    return res;
}
function comp(f1, f2) {
    return function (x) { return f1(f2(x)); };
}
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
function merge(base, change) {
    var result = {};
    for (var id in base) {
        result[id] = base[id];
    }
    for (var id in change) {
        result[id] = change[id];
    }
    return result;
}
//# sourceMappingURL=Common.js.map