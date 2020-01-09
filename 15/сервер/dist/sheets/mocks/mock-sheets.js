"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = require("../models/contact");
const user_1 = require("../models/user");
const user1 = new user_1.User(1, new Date("1994-01-01"), new contact_1.Contact(1, "8(800)000-00-01", "a@yandex.ru"), "Никита", "Давидов", "Олегович", 4.44, "A-102");
const user2 = new user_1.User(2, new Date("1994-04-30"), new contact_1.Contact(2, "8(800)000-00-02"), "Ольга", "Майорова", "Андреевна", 2.38, "A-101");
const user3 = new user_1.User(3, new Date("1995-11-01"), new contact_1.Contact(3, "", "b@yandex.ru"), "Андрей", "Дунаев", "Васильевич", 2, "A-105");
const user4 = new user_1.User(4, new Date("1998-12-17"), new contact_1.Contact(4), "Виктор", "Долголетов", "Анатольевич", 1, "A-101");
const user5 = new user_1.User(5, new Date("1995-01-11"), new contact_1.Contact(5), "Анна", "Тихомирова", "Сергеевна", 3.5, "A-101");
const user6 = new user_1.User(6, new Date("1992-05-19"), new contact_1.Contact(6), "Никита", "Гридин", "Юрьевич", 5, "A-103");
const user7 = new user_1.User(7, new Date("1993-08-24"), new contact_1.Contact(7), "Никита", "Шилов", "Максимович", 4.44, "A-102");
const user8 = new user_1.User(8, new Date("1992-12-12"), new contact_1.Contact(8), "Кристина", "Кондракова", "Васильевна", 5, "A-103");
exports.TestData = [user1, user2, user3, user4, user5, user6, user7, user8];
//# sourceMappingURL=mock-sheets.js.map