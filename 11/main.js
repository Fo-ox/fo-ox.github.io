import { Draw } from "./draw.js";
import { NodeClass } from "./struct-node.js";
import { TreeMethods } from "./tree-methods.js";
const tree = new TreeMethods(1, "A");
generateTree();
function draw() {
    const startNode = tree.getRoot();
    Draw.prototype.GenerateRootId(startNode);
    if (startNode.LeftChild) {
        Draw.prototype.GenerateNodeId(startNode.LeftChild);
    }
    if (startNode.RightChild) {
        Draw.prototype.GenerateNodeId(startNode.RightChild);
    }
    Draw.prototype.drawRoot(startNode);
}
function deleteTree() {
    tree.deleteTree();
    console.dir(tree);
    Draw.prototype.ClearDraw();
}
function generateTree() {
    deleteTree();
    let numb = 0;
    tree._rootNode = new NodeClass(random(), "нулевой узел");
    for (let i = 0; i < 4; i++) {
        numb = random();
        if (!tree.searchNode(numb)) {
            tree.createNode(numb, `узел ${i + 1}`);
            console.log(i);
        }
        else {
            i--;
        }
    }
    draw();
}
function addNode() {
    const add = +prompt("введите номер вершины для добавления");
    if (add !== 0) {
        if (tree._rootNode == null) {
            tree._rootNode = new NodeClass(add, prompt("введите данные"));
        }
        else {
            const flag = tree.searchNode(add);
            if (flag == null) {
                tree.createNode(add, prompt("введите данные"));
            }
            else {
                alert("Такая вершина уже сушествует! Добавьте другую");
                addNode();
            }
        }
        Draw.prototype.ClearDraw();
        draw();
    }
}
function deleteNode() {
    if (tree._rootNode !== null) {
        const deleted = +prompt("введите номер вершины для удаления");
        if (deleted !== 0) {
            const flag = tree.searchNode(deleted);
            if (flag) {
                if (flag && (tree.getRoot().LeftChild == null) && (tree.getRoot().RightChild == null)) {
                    deleteTree();
                    Draw.prototype.ClearDraw();
                    return;
                }
                else {
                    tree.deleteNode(deleted);
                }
            }
            else {
                alert("Такой вершины нет! Выберите другую");
                deleteNode();
            }
            Draw.prototype.ClearDraw();
            draw();
        }
    }
}
function random() {
    const randNumb = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    return randNumb;
}
// --------
function ready() {
    const generateTreeButton = document.getElementById("generateTreeButton");
    const deleteTreeButton = document.getElementById("deleteTreeButton");
    const addNodeButton = document.getElementById("addNodeButton");
    const deleteNodeButton = document.getElementById("deleteNodeButton");
    generateTreeButton.addEventListener("click", generateTree);
    deleteTreeButton.addEventListener("click", deleteTree);
    addNodeButton.addEventListener("click", addNode);
    deleteNodeButton.addEventListener("click", deleteNode);
}
document.addEventListener("DOMContentLoaded", ready);
