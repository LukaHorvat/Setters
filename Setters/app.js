function shuffle(arr) {
    var res = arr.slice();
    for (var i = res.length - 1; i >= 0; --i) {
        var rand = Math.floor(Math.random() * i);
        var temp = res[rand];
        res[rand] = res[i];
        res[i] = temp;
    }
    return res;
}
window.onload = function () {
    var o = {
        world: {
            players: [
                {
                    name: "Steve",
                    data: {
                        pos: [0, 1]
                    }
                }, {
                    name: "Dave",
                    data: {
                        pos: [1, 2]
                    }
                }, {
                    name: "Bob",
                    data: {
                        pos: [2, 3]
                    }
                }, {
                    name: "Hank",
                    data: {
                        pos: [3, 4]
                    }
                }
            ]
        }
    };
    var newObj = Set.setter(o)
        .prop(function (obj) { return obj.world; }, "world")
        .prop(function (obj) { return obj.players; }, "players")
        .all(function (obj) { return obj.data; }, "data")
        .prop(function (obj) { return obj.pos; }, "pos")
        .concat()
        .modify(shuffle);
    console.log(JSON.stringify(newObj));
};
//# sourceMappingURL=app.js.map