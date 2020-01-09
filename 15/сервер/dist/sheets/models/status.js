"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Status {
    constructor() {
        this.findedUser = "default";
        this.badPoints = false;
    }
    get findedUser() {
        return this._findedUser;
    }
    set findedUser(value) {
        this._findedUser = value;
    }
    get badPoints() {
        return this._badPoints;
    }
    set badPoints(value) {
        this._badPoints = value;
    }
}
exports.Status = Status;
//# sourceMappingURL=status.js.map