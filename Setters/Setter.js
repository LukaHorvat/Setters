var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericSetter = (function () {
    function GenericSetter(config) {
        var _this = this;
        this.modify = function (f) { return _this.config.modify(f); };
        this.prop = function (select) {
            return function (update) {
                return new GenericSetter({
                    modify: function (f) { return _this.config.modify(function (piece) { return merge(piece, update(f(select(piece)))); }); }
                });
            };
        };
        this.propA = function (select) {
            return function (update) {
                return new ArraySetter({
                    modify: function (f) { return _this.config.modify(function (piece) { return merge(piece, update(f(select(piece)))); }); }
                });
            };
        };
        this.config = config;
    }
    return GenericSetter;
})();
var ArraySetter = (function (_super) {
    __extends(ArraySetter, _super);
    function ArraySetter(config) {
        var _this = this;
        _super.call(this, config);
        this.each = new GenericSetter({
            modify: function (f) { return _this.config.modify(function (pieces) { return pieces.map(f); }); }
        });
        this.all = function (select) {
            return function (update) {
                return new GenericSetter({
                    modify: function (f) { return _this.config.modify(function (pieces) {
                        var newPieces = f(pieces.map(select(piece)));
                        return pieces.map();
                    }); }
                });
            };
        };
    }
    return ArraySetter;
})(GenericSetter);
var Setter = (function () {
    function Setter() {
    }
    Setter.setter = function (obj) {
        if (obj instanceof Array)
            return new ArraySetter({ modify: function (f) { return f(obj); } });
        else
            return new GenericSetter({ modify: function (f) { return f(obj); } });
    };
    Setter.id = function (x) { return x; };
    return Setter;
})();
//# sourceMappingURL=Setter.js.map