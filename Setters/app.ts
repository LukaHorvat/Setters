window.onload = () => {
    var initial = {
        test: [
            {
                prop: "hello"
            }, {
                prop: "world"
            }]
    }
    var arrSetter =
        Setter.setter(initial)
            .propA(obj => obj.test)(obj => ({ test: obj }));
    console.log(
        arrSetter
            .indexed(0));
};