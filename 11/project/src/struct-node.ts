interface INode<TYPE> {
    ID: number;
    Path: string;
    Data: TYPE;
    LeftChild: INode<TYPE>;
    RightChild: INode<TYPE>;
}

export class NodeClass<TYPE> implements INode<TYPE> {
    private _data: TYPE = null;
    readonly _id: number;
    private _leftChild: NodeClass<TYPE> = null;
    private _rightChild: NodeClass<TYPE> = null;
    private _path: string = null;

    constructor(Id: number, Data?: TYPE) {
        this._id = Id;
        if (Data) {
            this._data = Data;
        }
    }

    get ID (): number {
        return this._id;
    }
    get Data (): TYPE {
        return this._data;
    }
    set Data (Data: TYPE) {
        this._data = Data;
    }
    get LeftChild (): NodeClass<TYPE> {
        return this._leftChild;
    }
    set LeftChild (Left: NodeClass<TYPE>) {
        this._leftChild = Left;
    }
    get RightChild (): NodeClass<TYPE> {
        return this._rightChild;
    }
    set RightChild (Right: NodeClass<TYPE>) {
        this._rightChild = Right;
    }
    get Path (): string {
        return this._path;
    }
    set Path (Path: string) {
        this._path = Path;
    }
}
