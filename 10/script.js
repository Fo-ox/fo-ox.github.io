
// фунция возвращающая рандомное число в заданном диапазоне
function randomStr (){
   return Math.floor(Math.random() * (100 - 1)) + 1;
}

function mamHappy() {
  return "Мама счастлива и дала денег на покупку";
}

function mamSad() {
  return "Мама не в настроении, попробуй позже";
}

//MAIN
function ready () {
  var isMomHappy = false;
  var momAnswer = document.getElementById("answer");
  var option = document.getElementById("selected");
  option.addEventListener("click", function() {
      if(option.value != "none" & option.value !="love")
      {
         let procent = randomStr() + +option.value;
         console.log(procent);
         momAnswer.innerHTML = "Мама думает...";
         if (procent >= 100) {
           isMomHappy = true;
         }
         else {
         isMomHappy = false;
         }
         // Promise
          var willIGetNewPhone = new Promise(
              function (resolve, reject) {
                  if (isMomHappy) {
                      var good = mamHappy();
                      resolve(good); // Всё выполнено
                  } else {
                      var str = mamSad();
                      throw `${str}`;
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
                      momAnswer.innerHTML = fulfilled;
                      //console.log(fulfilled);
                   // output: { brand: 'Samsung', color: 'black' }
                  })
                  .catch(function (error) {
                      // oops, mom don't buy it
                      momAnswer.innerHTML = error;
                      //console.log(error);
                   // output: 'mom is not happy'
                  });
          };
         setTimeout(()=>{
            askMom();
         }, 3000);
      } if (option.value == "none") {
      momAnswer.innerHTML = "";
      }
      if (option.value == "love") {
      momAnswer.innerHTML = "Мама тебя любит :3";
      }
  });
}
//askMom();


document.addEventListener("DOMContentLoaded", ready);


//askMom();


