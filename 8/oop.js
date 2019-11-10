//создание родительского класса и его методов
function Human (){}
Human.prototype.init = function(name){
  this.name = name;
};
Human.prototype.print = function(){
  console.log(this.name);
};

//наследование
function inherit(ParrentClass){
    function ChildClass(){};
    ChildClass.prototype = Object.create(ParrentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
    ChildClass.prototype._super = ParrentClass.prototype;
    return ChildClass;
}

// Создание объекта ребенка и переопередление метода
var Lady = inherit(Human);
Lady.prototype.init = function(name) {
    name = 'Seniora ' + name;
    this._super.init.call(this,name);
};

var Gentelmen = inherit(Human);
Gentelmen.prototype.init = function(name) {
    name = 'Senior ' + name;
    this._super.init.call(this,name);
};

var human = new Human();
human.init('Human Name');
human.print();

var lily = new Lady();
lily.init('Lily');
lily.print();

var john = new Gentelmen();
john.init('John');
john.print();
//alert(lily instanceof Human); //
