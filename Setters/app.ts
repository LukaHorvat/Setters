function scanAppendStrings(strs: string[]) {
    var current = "";
    return strs.map(str => {
        current += str;
        return current;
    });
}

window.onload = () => {
    var initial = {
        test: [
            {
                prop: "hello"
            }, {
                prop: "world",
                propb: "asda"
            }]
    }
    console.log(Setter.setter(initial)
        .propA(obj => obj.test, "test")
        .all(obj => obj.prop, "prop")
        .modify(scanAppendStrings));
};