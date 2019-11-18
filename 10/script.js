var isMomHappy = false;
// Promise
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var good = setTimeout(mamHappy, 2000);
            resolve(good); // Всё выполнено
        } else {
            var str = setTimeout(mamSad, 2000);
            var bad = new Error(str);
            reject(bad); // reject
        }

    }
);

// Вызываем промис
var askMom = function () {
    willIGetNewPhone
        .then(function (fulfilled) {
            // yay, you got a new phone
            return(fulfilled.message);
         // output: { brand: 'Samsung', color: 'black' }
        })
        .catch(function (error) {
            // oops, mom don't buy it
            return(error.message);
         // output: 'mom is not happy'
        });
};


// фунция возвращающая рандомное число в заданном диапазоне
function randomStr (){
   return Math.floor(Math.random() * (100 - 1)) + 1;
}

function mamHappy() {
  return "Мама счастлива и купит вам то что вы хотите";
}

function mamSad() {
  return "Мама не в настроении, подойдите позже";
}

//MAIN

function ready () {
  var isMomHappy = true;
  var momAnswer = document.getElementById("answer");
  var option = document.getElementById("selected");
  option.addEventListener("click", function() {
      if(option.value != "none")
      {
         let procent = randomStr() + +option.value;
         console.log(procent);
         momAnswer.innerHTML = "Мама думает...";
         let mamAnswer;
         if (procent >= 100) {
           isMomHappy = true;
         }
         mamAnswer = askMom();
         console.log(mamAnswer);
      }
  });
}

document.addEventListener("DOMContentLoaded", ready);


//askMom();


