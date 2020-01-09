"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const sheets_service_1 = require("./servises/sheets.service");
const rxjs_1 = require("rxjs");
const create_sheet_dto_1 = require("./dto/create-sheet-dto");
const operators_1 = require("rxjs/operators");
const edit_sheet_dto_1 = require("./dto/edit-sheet-dto");
let SheetsController = class SheetsController {
    constructor(sheetsServise) {
        this.sheetsServise = sheetsServise;
    }
    findAll() {
        return this.sheetsServise.findAll().pipe(operators_1.delay(500));
    }
    findId(userId) {
        return this.sheetsServise.findId(userId);
    }
    create(createSheetDto) {
        return this.sheetsServise.create(createSheetDto);
    }
    edit(editSheetsDto) {
        return this.sheetsServise.edit(editSheetsDto);
    }
    delete(userId) {
        this.sheetsServise.delete(userId);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], SheetsController.prototype, "findAll", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], SheetsController.prototype, "findId", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sheet_dto_1.CreateSheetDto]),
    __metadata("design:returntype", Promise)
], SheetsController.prototype, "create", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_sheet_dto_1.EditSheetDto]),
    __metadata("design:returntype", Promise)
], SheetsController.prototype, "edit", null);
__decorate([
    common_1.Delete(":id"),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SheetsController.prototype, "delete", null);
SheetsController = __decorate([
    common_1.Controller("users"),
    __metadata("design:paramtypes", [sheets_service_1.SheetsService])
], SheetsController);
exports.SheetsController = SheetsController;
//# sourceMappingURL=sheets.controller.js.map