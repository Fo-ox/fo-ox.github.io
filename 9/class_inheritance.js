//Родительский класс
class Human {
  constructor() {
  }
  init(name, family) {
    this.family = family;
    this.name = name;
  }
  print() {
   console.log(this.name + ' ' + this.family);
  }
}

//проверка методов
let human = new Human();

human.init("Name","Family");
human.print();  //

//Классы наследования
class Lady extends Human {
  init(name, family) {
    name = `Seniora - ${name}`;
    super.init(name , family);
  }
}

class Gentelmen extends Human {
  init(name, family) {
    name = `Senior - ${name}`;
    super.init(name , family);
    Gentelmen.prototype.family = family;
  }
}

// Проверка
let lady = new Lady();
let gentelmen = new Gentelmen();

lady.init("Susi","Joestar");
lady.print();
gentelmen.init("Joseph","Joestar");
gentelmen.print();

//углубимся и сделаем ребенка ребенку как бы это не звучало
class Baby extends Gentelmen {
  init(name) {
    this.name = `Baby - ${name}`;
    this.family = super.family; //могло бы не работать, но мы прокинули свойство фамиллии в прототип родителя
  }
}

let baby = new Baby();

baby.init("Joske");
baby.print();
