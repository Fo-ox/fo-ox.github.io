export class Draw {
    // Отрисовка корня
    drawRoot(root) {
        const divElem = document.getElementById(root.Path);
        if (root) {
            divElem.innerHTML = `<br/>${root.ID}<br/><span class="rootSpan">${root.Data}<span>`;
            divElem.className = "node";
            divElem.style.background = "#5959ff";
        }
        else {
            divElem.className = "clear";
        }
    }
    // Отрисовка вершин
    drawNodes(node) {
        if (node.Path !== "null") {
            const Elem = document.getElementById(node.Path);
            if (Elem) {
                const Img = document.createElement("img");
                Img.src = `../Image/${node.Path}.png`;
                Img.style.position = "absolute";
                Img.style.left = "-160px";
                Img.style.top = "-60px";
                Img.style.zIndex = "-1";
                Img.style.opacity = "0.5";
                Elem.innerHTML = `<br/>${node.ID}<br/><span>${node.Data}<span>`;
                Elem.className = "node";
                Elem.style.position = "relative";
                Elem.appendChild(Img);
            }
        }
    }
    GenerateRootId(root) {
        root.Path = "root";
        Draw.prototype.drawNodes(root);
        if (root.LeftChild) {
            root.LeftChild.Path = "l";
            Draw.prototype.drawNodes(root.LeftChild);
        }
        if (root.RightChild) {
            root.RightChild.Path = "r";
            Draw.prototype.drawNodes(root.RightChild);
        }
    }
    GenerateNodeId(node) {
        if (node.LeftChild) {
            node.LeftChild.Path = node.Path + "l";
            Draw.prototype.drawNodes(node.LeftChild);
            Draw.prototype.GenerateNodeId(node.LeftChild);
        }
        if (node.RightChild) {
            node.RightChild.Path = node.Path + "r";
            Draw.prototype.drawNodes(node.RightChild);
            Draw.prototype.GenerateNodeId(node.RightChild);
        }
    }
    ClearDraw() {
        const elem = document.getElementsByClassName("node");
        const root = document.getElementById("root");
        const count = elem.length;
        for (let i = 0; i < count; i++) {
            root.style.background = "white";
            elem[0].innerHTML = "";
            elem[0].className = "clear";
        }
    }
}
