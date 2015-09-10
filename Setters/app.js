window.onload = function () {
    var initial = {
        test: [
            {
                prop: "hello"
            }, {
                prop: "world"
            }]
    };
    var arrSetter = Setter.setter(initial)
        .propA(function (obj) { return obj.test; })(function (obj) { return ({ test: obj }); });
    console.log(arrSetter
        .indexed(0));
};
//# sourceMappingURL=app.js.map