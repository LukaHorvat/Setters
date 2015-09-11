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
        .prop(function (obj) { return obj.world; }, "world") //Get the world property
        .prop(function (obj) { return obj.players; }, "players") //Get the players property (array)
        .all(function (obj) { return obj.data; }, "data") //Get the data property of all of the elements in the array
        .all(function (obj) { return obj.pos; }, "pos") //Get the pos property of all of the elements in the array
        .concat() //Flatten the array
        .modify(shuffle); //Apply a modifying function
    console.log(JSON.stringify(newObj, null, 4)); //Print the resulting structure
};
//# sourceMappingURL=app.js.map