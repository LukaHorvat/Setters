function shuffle<T>(arr: T[]) {
    var res: T[] = arr.slice();
    for (var i = res.length - 1; i >= 0; --i) {
        const rand = Math.floor(Math.random() * i);
        const temp = res[rand];
        res[rand] = res[i];
        res[i] = temp;
    }
    return res;
}

window.onload = () => {
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
    }
    var newObj = Set.setter(o)
        .prop(obj => obj.world, "world")
        .prop(obj => obj.players, "players")
        .all(obj => obj.data, "data")
        .prop(obj => obj.pos, "pos")
        .concat()
        .modify(shuffle);
    console.log(JSON.stringify(newObj));
};