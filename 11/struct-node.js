export class NodeClass {
    constructor(Id, Data) {
        this._data = null;
        this._leftChild = null;
        this._rightChild = null;
        this._path = null;
        this._id = Id;
        if (Data) {
            this._data = Data;
        }
    }
    get ID() {
        return this._id;
    }
    get Data() {
        return this._data;
    }
    set Data(Data) {
        this._data = Data;
    }
    get LeftChild() {
        return this._leftChild;
    }
    set LeftChild(Left) {
        this._leftChild = Left;
    }
    get RightChild() {
        return this._rightChild;
    }
    set RightChild(Right) {
        this._rightChild = Right;
    }
    get Path() {
        return this._path;
    }
    set Path(Path) {
        this._path = Path;
    }
}
