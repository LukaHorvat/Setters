class UntypedSetter {
    modify: (cont: (piece: tpiece) => tpiece) => twhole
    constructor(modify: (f: (piece: tpiece) => tpiece) => twhole) {
        this.modify = modify;
    }
    set = (x: tpiece) => this.modify(piece => x)
    prop = (select: (piece: tpiece) => tprop, prop: string | number) =>
        new UntypedSetter(f => this.modify(piece => merge(piece, { [prop]: f(select(piece)) })))
    each = () => new UntypedSetter(f => this.modify(pieces => pieces.map(f)))
    all = (select: (piece: tpiece) => tprop, prop: string | number) =>
        new UntypedSetter(f => this.modify(pieces => {
            const newProps = f(pieces.map(select));
            return pieces.map((piece, i) => merge(piece, { [prop]: newProps[i] }));
        }))
    map = (toT: (piece: tpiece) => tprop, fromT: (t: tprop) => tpiece) =>
        new UntypedSetter(f => this.modify(piece => fromT(f(toT(piece)))))
    promote = (id: (x: any) => any) => this
    concat = () =>
        new UntypedSetter((f: (pieces: any[]) => any[]) => this.modify((piecess: any[][]) => {
            const lengths = piecess.map(pieces => pieces.length);
            const newValues = f(flatten(piecess));
            var res: any[][] = [];
            var lastStart = 0;
            lengths.forEach(len => {
                res.push(newValues.slice(lastStart, lastStart + len));
                lastStart = lastStart + len;
            });
            return res;
        }))
}

type tpiece = any
type twhole = any
type tprop = any

interface GenericSetter<TWhole, TPiece> {
    modify(f: (piece: TPiece) => TPiece): TWhole
    set(x: TPiece): TWhole
}

interface Setter<TWhole, TPiece> extends GenericSetter<TWhole, TPiece> {
    prop<TProp>(select: (piece: TPiece) => TProp[][], prop: string | number): ArrayArraySetter<TWhole, TProp>
    prop<TProp>(select: (piece: TPiece) => TProp[], prop: string | number): ArraySetter<TWhole, TProp>
    prop<TProp>(select: (piece: TPiece) => TProp, prop: string | number): Setter<TWhole, TProp>
    map<T>(toT: (piece: TPiece) => T[][], fromT: (t: T[][]) => TPiece): ArrayArraySetter<TWhole, T>
    map<T>(toT: (piece: TPiece) => T[], fromT: (t: T[]) => TPiece): ArraySetter<TWhole, T>
    map<T>(toT: (piece: TPiece) => T, fromT: (t: T) => TPiece): Setter<TWhole, T>
    promote<T>(id: (piece: TPiece) => T[][]): ArrayArraySetter<TWhole, T>
    promote<T>(id: (piece: TPiece) => T[]): ArraySetter<TWhole, T>
    promote<T>(id: (piece: TPiece) => T): ArraySetter<TWhole, TPiece>
}

interface ArraySetter<TWhole, TPiece> extends GenericSetter<TWhole, TPiece[]> {
    each(): Setter<TWhole, TPiece>
    prop<TProp>(select: (piece: TPiece) => TProp[], prop: string | number): ArrayArraySetter<TWhole, TProp>
    prop<TProp>(select: (piece: TPiece) => TProp, prop: string | number): ArraySetter<TWhole, TProp>
    map<T>(toT: (piece: TPiece) => T[], fromT: (t: T[]) => TPiece): ArrayArraySetter<TWhole, T>
    map<T>(toT: (piece: TPiece) => T, fromT: (t: T) => TPiece): ArraySetter<TWhole, T>
    promote<T>(id: (piece: TPiece) => T[]): ArrayArraySetter<TWhole, T>
    promote<T>(id: (piece: TPiece) => T): ArraySetter<TWhole, TPiece>
    all<TProp>(select: (piece: TPiece) => TProp[], prop: string | number): ArrayArraySetter<TWhole, TProp>
    all<TProp>(select: (piece: TPiece) => TProp, prop: string | number): ArraySetter<TWhole, TProp>
}

interface ArrayArraySetter<TWhole, TPiece> extends GenericSetter<TWhole, TPiece[][]> {
    each(): ArraySetter<TWhole, TPiece>
    concat(): ArraySetter<TWhole, TPiece>
    prop<TProp>(select: (piece: TPiece) => TProp, prop: string | number): ArrayArraySetter<TWhole, TProp>
    map<T>(toT: (piece: TPiece) => T, fromT: (t: T) => TPiece): ArrayArraySetter<TWhole, T>
    promote<T>(id: (piece: TPiece) => T): ArrayArraySetter<TWhole, TPiece>
    all<TProp>(select: (piece: TPiece) => TProp, prop: string | number): ArrayArraySetter<TWhole, TProp>
}

const identity = <T>(x: T) => x;

class Set {
    static setter<T>(arr: T[]): ArraySetter<T[], T>
    static setter<T>(arr: T): Setter<T, T>
    static setter<T>(obj: T): any { return new UntypedSetter(f => f(obj)); }
}