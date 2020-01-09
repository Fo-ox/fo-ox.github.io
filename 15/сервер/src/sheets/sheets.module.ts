import { Module } from "@nestjs/common";
import { SheetsService } from "./servises/sheets.service";
import { SheetsController } from "./sheets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./models/userEntity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [],
  controllers: [
    SheetsController,
  ],
  providers: [
    SheetsService,
  ],
})

export class SheetsModule {
}
