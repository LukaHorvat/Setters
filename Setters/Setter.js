var UntypedSetter = (function () {
    function UntypedSetter(modify) {
        var _this = this;
        this.set = function (x) { return _this.modify(function (piece) { return x; }); };
        this.prop = function (select, prop) {
            return new UntypedSetter(function (f) { return _this.modify(function (piece) { return merge(piece, (_a = {}, _a[prop] = f(select(piece)), _a)); var _a; }); });
        };
        this.each = function () { return new UntypedSetter(function (f) { return _this.modify(function (pieces) { return pieces.map(f); }); }); };
        this.all = function (select, prop) {
            return new UntypedSetter(function (f) { return _this.modify(function (pieces) {
                var newProps = f(pieces.map(select));
                return pieces.map(function (piece, i) { return merge(piece, (_a = {}, _a[prop] = newProps[i], _a)); var _a; });
            }); });
        };
        this.map = function (toT, fromT) {
            return new UntypedSetter(function (f) { return _this.modify(function (piece) { return fromT(f(toT(piece))); }); });
        };
        this.promote = function (id) { return _this; };
        this.concat = function () {
            return new UntypedSetter(function (f) { return _this.modify(function (piecess) {
                var lengths = piecess.map(function (pieces) { return pieces.length; });
                var newValues = f(flatten(piecess));
                var res = [];
                var lastStart = 0;
                lengths.forEach(function (len) {
                    res.push(newValues.slice(lastStart, lastStart + len));
                    lastStart = lastStart + len;
                });
                return res;
            }); });
        };
        this.modify = modify;
    }
    return UntypedSetter;
})();
var identity = function (x) { return x; };
var Set = (function () {
    function Set() {
    }
    Set.setter = function (obj) { return new UntypedSetter(function (f) { return f(obj); }); };
    return Set;
})();
//# sourceMappingURL=Setter.js.map