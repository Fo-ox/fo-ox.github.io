// Функция-конструктор
var Friend = function(name, password, interests, job){
  this.fullName = name;
  this.password = password;
  this.interests = interests;
  this.job = job;
};

// создание нового объекта через конструктор
var Helga = new Friend('Helga', 'qwerty123', ['JS', 'CSS', 'HTML'], 'sloth');

//отдельная функция
function sayHello(){
  return `Hi, my name is ${this.fullName} and I'm a ${this.job}. Let's be friends!`;
}

var customBind = function(func, context) {
  // обрезаем ненужные аргументы (функцию и контекст)
  var bindArgs = [].slice.call(arguments, 2);
  return function() {
    // аргументы
    var funcArgs = [].slice.call(arguments);
    // сборка
    return func.apply(context, bindArgs.concat(funcArgs));
  };
};

//MAIN
Helga.hello = sayHello;
let helloHelga0 = sayHello;
let helloHelga1 = sayHello.bind(Helga); //привязываем конткекст встроенным bind
let helloHelga2 = customBind(sayHello,Helga); // привязываем контекст своим bind
console.log(helloHelga0()); // последствия потери контекста
console.log(helloHelga1());
console.log(helloHelga2());
