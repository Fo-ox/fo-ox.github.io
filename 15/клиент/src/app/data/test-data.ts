import { Contact } from "../model/contact";
import { User } from "../model/user";


const user1 = new User(1, new Date("1994-01-01"), new Contact(1, "8(800)000-00-01", "a@yandex.ru"), "Никита", "Давидов", "Олегович", 4.44, "A-102");
const user2 = new User(2, new Date("1994-04-30"), new Contact(2, "8(800)000-00-02"),  "Ольга", "Майорова", "Андреевна", 2.38, "A-101");
const user3 = new User(3, new Date("1995-11-01"), new Contact(3, "", "b@yandex.ru"),  "Андрей", "Дунаев", "Васильевич", 2, "A-105");
const user4 = new User(4, new Date("1998-12-17"), new Contact(4), "Виктор", "Долголетов", "Анатольевич", 1, "A-101");
const user5 = new User(5, new Date("1995-01-11"), new Contact(5), "Анна", "Тихомирова", "Сергеевна", 3.5, "A-101");
const user6 = new User(6, new Date("1992-05-19"), new Contact(6), "Никита", "Гридин", "Юрьевич", 5, "A-103");
const user7 = new User(7, new Date("1993-08-24"), new Contact(7), "Никита", "Шилов", "Максимович", 4.44, "A-102");
const user8 = new User(8, new Date("1992-12-12"), new Contact(8), "Кристина", "Кондракова", "Васильевна", 5, "A-103");

export class TestData {
  static studentList  = [user1, user2, user3, user4, user5, user6, user7, user8];
  static pointsList = [
    user1.points,
    user2.points,
    user3.points,
    user4.points,
    user5.points,
    user6.points,
  ];
  static ageList = [
    user1.date.getFullYear(),
    user2.date.getFullYear(),
    user3.date.getFullYear(),
    user4.date.getFullYear(),
    user5.date.getFullYear(),
    user6.date.getFullYear(),
  ];
}
