var errorString = 'этот код ';

try{
  // Функция-конструктор
  var Friend = function(name, password, interests, job){
    return Friend = {
      fullName : name,
      password : password,
      interests : interests,
      job : job,
      get fullInterests() {
        return this.interests;
      },
      set fullInterests (value) {
        var split = value.split(' ');
        var j = this.interests.length;
        this.interests += `,`;
        for (let i = 0; i < split.length; i++){
          this.interests += split[i];
        }
      },
    }
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
  let helloHelga1 = sayHello.bind(Helga); // привязали контекст встроенным bind
  let helloHelga2 = customBind(sayHello,Helga); // привязали контекст своим bind
  console.log(helloHelga0()); // демонстрация последствий потерянного контекста
  console.log(helloHelga1());
  console.log(helloHelga2());

  Helga.fullInterests = "PS, AI";
  Helga.fullInterests = "Warhammer40k";
  //добавление новых интересов в карточку - вызывается setter
  console.log(Helga.fullInterests); // вызов поля интересы - срабатывает getter
  errorString += 'работает';
  //lalala;
  //раскомментируйте строчку выше что бы проверить работу try/catch
}
catch(err){
  errorString += ' не';
}
finally {
  errorString += ' корректно';
}

console.log(errorString);
