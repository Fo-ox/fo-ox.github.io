import { NodeClass } from "./struct-node";

export class TreeMethods<TYPE> {
    _rootNode: NodeClass<TYPE> = null;
    constructor (newId: number, newData?: TYPE) {
        this._rootNode = new NodeClass<TYPE>(newId, newData);
    }

    // Создание вершины
    createNode (nodeId: number, data?: TYPE): void {
        let newNode: NodeClass<TYPE>;
        data ? newNode = new NodeClass<TYPE>(nodeId, data) : newNode = new NodeClass<TYPE>(nodeId);
        let currentNode: NodeClass<TYPE> = this._rootNode;
        let parentNode: NodeClass<TYPE>;
        if (!this._rootNode) {
            this._rootNode = newNode;
            return;
        }
        while (true) {
            parentNode = currentNode;
            if (nodeId < currentNode.ID) {
                currentNode = currentNode.LeftChild;
                if (currentNode == null) {
                    parentNode.LeftChild = newNode;
                    return;
                }
            } else {
                currentNode = currentNode.RightChild;
                if (currentNode == null) {
                    parentNode.RightChild = newNode;
                    return;
                }
            }
        }
    }
    // Корень
    getRoot (): NodeClass<TYPE> {
        return this._rootNode;
    }
    // Удалить дерево
    deleteTree(): boolean {
        this._rootNode = null;
        return true;
    }
    // Поиск по ID
    searchNode (id: number): NodeClass<TYPE> {
        let tmpNode: NodeClass<TYPE> = this._rootNode;
        if (id === tmpNode.ID) {
            return this._rootNode;
        }
        while (id !== tmpNode.ID) {
            id > tmpNode.ID ? tmpNode = tmpNode.RightChild : tmpNode = tmpNode.LeftChild;
            if (tmpNode == null) {
                return null;
            }
        }
        return tmpNode;
    }
    // Поиск приемника
    getReceiver(deleteNode: NodeClass<TYPE>): NodeClass<TYPE> {
        let parentReceiverNode: NodeClass<TYPE> = deleteNode;
        let receiverNode: NodeClass<TYPE> = deleteNode;
        let currentNode: NodeClass<TYPE> = receiverNode.RightChild;
        while (currentNode != null) {
            parentReceiverNode = receiverNode;
            receiverNode = currentNode;
            currentNode = currentNode.LeftChild;
        }
        if (receiverNode !== deleteNode.RightChild) {
            parentReceiverNode.LeftChild = receiverNode.RightChild;
            receiverNode.RightChild = deleteNode.RightChild;
            receiverNode.LeftChild = deleteNode.LeftChild;
        }
        return receiverNode;
    }
    // Удаление вершины
    deleteNode (id: number): boolean {
        let currentNode: NodeClass<TYPE> = this._rootNode;
        let parentNode: NodeClass<TYPE> = currentNode;
        let isLeftChild: boolean = false;

        while (currentNode.ID !== id) {
            parentNode = currentNode;
            if (id < currentNode.ID) {
                currentNode = currentNode.LeftChild;
                isLeftChild = true;
            } else {
                currentNode = currentNode.RightChild;
                isLeftChild = false;
            }
            if (currentNode == null) {
                return false;
            }
        }
        if (currentNode.LeftChild == null && currentNode.RightChild == null) {
            if (currentNode === this._rootNode) {
                currentNode = null;
            } else {
                if (isLeftChild) {
                    parentNode.LeftChild = null;
                } else {
                    parentNode.RightChild = null;
                }
            }
            return true;
        }
        if (currentNode.RightChild == null) {
            if (currentNode === this._rootNode) {
                this._rootNode = currentNode.LeftChild;
                return true;
            }
            if (isLeftChild) {
                parentNode.LeftChild = currentNode.LeftChild;
            } else {
                parentNode.RightChild = currentNode.LeftChild;
            }
            return true;
        }
        if (currentNode.LeftChild == null) {
            if (currentNode === this._rootNode) {
                this._rootNode = currentNode.RightChild;
                return true;
            }
            if (isLeftChild) {
                parentNode.LeftChild = currentNode.RightChild;
            } else {
                parentNode.RightChild = currentNode.RightChild;
            }
            return true;
        }
        if (currentNode.LeftChild && currentNode.RightChild) {
            const receiver: NodeClass<TYPE> = this.getReceiver(currentNode);
            if (currentNode === this._rootNode) {
                this._rootNode = receiver;
            } else if (isLeftChild) {
                parentNode.LeftChild = receiver;
            } else {
                parentNode.RightChild = receiver;
            }
            receiver.LeftChild = currentNode.LeftChild;
        }
        return true;
    }
}
