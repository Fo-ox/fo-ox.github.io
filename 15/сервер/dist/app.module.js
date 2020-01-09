"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const sheets_module_1 = require("./sheets/sheets.module");
const typeorm_1 = require("@nestjs/typeorm");
const userEntity_1 = require("./sheets/models/userEntity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            sheets_module_1.SheetsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "31.31.196.162",
                port: 3306,
                username: "u0508300",
                password: "**********",
                database: "u0508300_user_list",
                entities: [userEntity_1.UserEntity],
                synchronize: true,
            }),
        ],
        exports: [],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map