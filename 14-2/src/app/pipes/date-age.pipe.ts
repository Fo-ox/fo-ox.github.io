import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
  name: "dateAndAge"
})

export class DateAgePipe implements PipeTransform {
  transform(value: Date): string {
    let word: string = "";
    const currentDate: Date = new Date();
    let age: number = 0;
    age = (+`${currentDate.getFullYear()}${("0" + (currentDate.getMonth() + 1)).slice(-2)}${("0" + currentDate.getDate()).slice(-2)}`) -
      (+`${value.getFullYear()}${("0" + (value.getMonth() + 1)).slice(-2)}${("0" + value.getDate()).slice(-2)}`);
    switch ((+((age + "").substr(0, 2))) % 10) {
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9: {
        word = "лет";
        break;
      }
      case 1: {
        (+(currentDate.getFullYear() - value.getFullYear()) % 100 === 11) ? word = "лет" : word = "год";
        break;
      }
      case 2:
      case 3:
      case 4: {
        ((+(currentDate.getFullYear() - value.getFullYear()) % 100 === 12) || (+(currentDate.getFullYear() - value.getFullYear()) % 100 === 13) || (+(currentDate.getFullYear() - value.getFullYear()) % 100 === 14 )) ?
          word = "лет" : word = "года";
        break;
      }
    }
    return `${("0" + value.getDate()).slice(-2)}-${("0" + (+value.getMonth() + 1)).slice(-2)}-${(value.getFullYear()).toString().slice(2)}
     (${currentDate.getFullYear() - value.getFullYear()} ${word})`;
  }
}
