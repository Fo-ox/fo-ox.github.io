"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("./status");
class User {
    constructor(Id, Dates, Contacts, Name, Surname, Patronymic, Points, Group) {
        this._id = Id;
        this._date = Dates;
        this._name = Name;
        this._surname = Surname;
        this._contact = Contacts;
        if (Patronymic) {
            this._patronymic = Patronymic;
        }
        if (Group) {
            this._group = Group;
        }
        if (Points) {
            this._points = Points;
        }
        this._status = new status_1.Status();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(Name) {
        this._name = Name;
    }
    get surname() {
        return this._surname;
    }
    set surname(Surname) {
        this._surname = Surname;
    }
    get patronymic() {
        return this._patronymic;
    }
    set patronymic(Patronymic) {
        this._patronymic = Patronymic;
    }
    get group() {
        return this._group;
    }
    set group(Patronymic) {
        this._group = Patronymic;
    }
    get date() {
        return this._date;
    }
    set date(Dates) {
        this._date = Dates;
    }
    get contact() {
        return this._contact;
    }
    set contact(value) {
        this._contact = value;
    }
    get points() {
        return this._points;
    }
    set points(value) {
        this._points = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map