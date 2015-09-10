interface SetterConfig<TWhole, TPiece> {
    modify: (f: (piece: TPiece) => TPiece) => TWhole;
}

class GenericSetter<TWhole, TPiece> {
    protected config: SetterConfig<TWhole, TPiece>;
    constructor(config: SetterConfig<TWhole, TPiece>) {
        this.config = config;
    }
    modify = (f: (piece: TPiece) => TPiece) => this.config.modify(f)
    set = (x: TPiece) => this.modify(piece => x)
    prop = <TProp>(select: (piece: TPiece) => TProp, prop: string) =>
        new GenericSetter<TWhole, TProp>({
            modify: (f) => this.config.modify(piece => merge(piece, { [prop]: f(select(piece)) }))
        })
    propA = <TProp>(select: (piece: TPiece) => TProp[], prop: string) =>
        new ArraySetter<TWhole, TProp>({
            modify: (f) => this.config.modify(piece => merge(piece, { [prop]: f(select(piece)) }))
        })
}
class ArraySetter<TWhole, TPiece> extends GenericSetter<TWhole, TPiece[]> {
    constructor(config: SetterConfig<TWhole, TPiece[]>) {
        super(config);
    }
    each = new GenericSetter<TWhole, TPiece>({
        modify: (f) => this.config.modify(pieces => pieces.map(f))
    })
    all = <TProp>(select: (piece: TPiece) => TProp, prop: string) =>
        new GenericSetter<TWhole, TProp[]>({
            modify: (f) => this.config.modify(pieces => {
                const newProps = f(pieces.map(select));
                return pieces.map((piece, i) => merge(piece, { [prop]: newProps[i] }));
            })
        })
    allA = <TProp>(select: (piece: TPiece) => TProp[], prop: string) =>
        new ArraySetter<TWhole, TProp[]>({
            modify: (f) => this.config.modify(pieces => {
                const newProps = f(pieces.map(select));
                return pieces.map((piece, i) => merge(piece, { [prop]: newProps[i] }));
            })
        })
}
class Setter {
    private static id = <T>(x: T) => x;
    static setter<T>(arr: T[]): ArraySetter<T[], T>
    static setter<T>(obj: T): GenericSetter<T, T>
    static setter(obj): any {
        if (obj instanceof Array) return new ArraySetter({ modify: (f) => f(obj) })
        else return new GenericSetter({ modify: (f) => f(obj) })
    }
}