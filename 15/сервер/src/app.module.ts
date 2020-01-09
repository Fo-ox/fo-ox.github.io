import { Module } from "@nestjs/common";
import { SheetsModule } from "./sheets/sheets.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./sheets/models/userEntity";

@Module({
  imports: [
    SheetsModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "31.31.196.162",
      port: 3306,
      username: "u0508300",
      password: "***********",
      database: "u0508300_user_list",
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
