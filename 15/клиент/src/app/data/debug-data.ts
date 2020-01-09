import { ServerUser } from "../model/server-user";

const user1 = new ServerUser(1, new Date("1994-01-01"),  "Никита", "Давидов", "Олегович", 5, "A-100", "8(800)000-10-11", "A@A.RU", "Street-10-A");
const user2 = new ServerUser(2, new Date("1994-04-30"),  "Ольга", "Майорова", "Олеговна", 2.38, "A-101");
const user3 = new ServerUser(3, new Date("1992-09-12"),  "Андрей", "Дунаев", "Васильевич", 2, "A-105");
const user4 = new ServerUser(4, new Date("1998-12-17"),  "Виктор", "Долголетов", "Анатольевич", 1, "A-101");
const user5 = new ServerUser(5, new Date("1995-01-11"),  "Анна", "Тихомирова", "Сергеевна", 3.5, "A-101");
const user6 = new ServerUser(6, new Date("1992-05-19"),  "Никита", "Гридин", "Юрьевич", 5, "A-103");
const user7 = new ServerUser(7, new Date("1993-08-24"),  "Никита", "Шилов", "Максимович", 4.44, "A-102");
const user8 = new ServerUser(8, new Date("1992-12-12"),  "Кристина", "Кондракова", "Васильевна", 5, "A-103");

export class DebugData {
  static studentList  = [user1, user2, user3, user4, user5, user6, user7, user8];
}
