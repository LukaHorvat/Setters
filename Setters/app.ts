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
        .propA(obj => obj.test)(obj => ({ test: obj }))
        .all(obj => obj.prop)(obj => ({ prop: obj }))
        .modify(scanAppendStrings));
};