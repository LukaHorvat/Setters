function scanAppendStrings(strs) {
    var current = "";
    return strs.map(function (str) {
        current += str;
        return current;
    });
}
window.onload = function () {
    var initial = {
        test: [
            {
                prop: "hello"
            }, {
                prop: "world",
                propb: "asda"
            }]
    };
    console.log(Setter.setter(initial)
        .propA(function (obj) { return obj.test; }, "test")
        .all(function (obj) { return obj.prop; }, "prop")
        .modify(scanAppendStrings));
};
//# sourceMappingURL=app.js.map