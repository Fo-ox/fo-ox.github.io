//объект со значениями ответов
var jellyAnswer = {
  1: `Он говорит - "Даже не думай"`,
  2: `Он говорит  - "Да"`,
  3: `Он говорит  -  "Нет"`,
  4: `Вы серьезно спрашиваете совета у пиксельного боба?`,
  5: `Он говорит  -  "Возможно"`,
  6: `Он говорит  -  "А такое бывает?"`,
  7: `Он говорит  -  "Задай вопрос попроще, я не математик"`,
  8: `Он говорит  -  "Просто сходи прогуляйся"`,
  9: `Он говорит  -  "Я устал овечать, давай лучше бахнем чаю"`,
  10: `Он говорит  -  "Абсолютно, точно, совершенно, нет"`,
  11: `Он говорит  -  "Абсолютно, точно, совершенно, да"`,
  12: `Он говорит  -  "Да нет наверное"`,
  13: `Хватит тыкать по бобам, они устали :)`
};

// фунция возвращающая рандомное число в заданном диапазоне
function randomStr (minValue ,maxValue){
   return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

//Фунция заменяющая тег li с номером "JellyNumber" в разметке
function stringRepalce (jellyNumber){
  var newStr = document.createElement("li");
  var randomAnswerNumber = randomStr(1,13);
  newStr.innerHTML = jellyAnswer[randomAnswerNumber];
  var parent = document.getElementsByTagName("ul")[jellyNumber];
  parent.replaceChild(newStr, parent.childNodes[3]);

//Фунция вешает слушалку на i элемент объекта obj
}
function listenerCreate(obj , i){
  obj[i].addEventListener("click", function() {
        stringRepalce (i);
        console.log(i); //номер события
    });
}

//MAIN
function ready() {
  alert ('Привет! Задавай вопрос предполагающий простой ответ (Да / Нет), и тыкай по бобам - они подскажут что делать с: ');
  var jellyClick =  document.querySelectorAll("a.jelly__elem");
  for (let i = 0; i < jellyClick.length; i++){
    listenerCreate(jellyClick , i)
  }
}

document.addEventListener("DOMContentLoaded", ready);
