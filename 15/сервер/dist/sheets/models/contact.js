"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Contact {
    constructor(id, phone, email, adress) {
        this._id = id;
        this._phone = phone;
        this._email = email;
        this._adress = adress;
    }
    get id() {
        return this._id;
    }
    get phone() {
        return this._phone;
    }
    set phone(value) {
        this._phone = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get adress() {
        return this._adress;
    }
    set adress(value) {
        this._adress = value;
    }
}
exports.Contact = Contact;
//# sourceMappingURL=contact.js.map