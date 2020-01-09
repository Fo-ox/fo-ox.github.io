import { Controller, Get, Post, Body, Put, Delete, Param } from "@nestjs/common";
import { SheetsService } from "./servises/sheets.service";
import { Observable } from "rxjs";
import { UserEntity } from "./models/userEntity";
import { CreateSheetDto } from "./dto/create-sheet-dto";
import { delay } from "rxjs/operators";
import { EditSheetDto } from "./dto/edit-sheet-dto";

@Controller("users")
export class SheetsController {

  constructor(private sheetsServise: SheetsService) {}

  @Get()
  findAll(): Observable<CreateSheetDto[]> {
    return this.sheetsServise.findAll().pipe(delay(500));
  }

  @Get(":id")
  findId(@Param() userId: number): Observable<CreateSheetDto> {
    return this.sheetsServise.findId(userId);
  }

  @Post()
  create(@Body() createSheetDto: CreateSheetDto): Promise<CreateSheetDto> {
    return this.sheetsServise.create(createSheetDto);
  }

  @Put()
  edit(@Body() editSheetsDto: EditSheetDto): Promise<CreateSheetDto> {
    return this.sheetsServise.edit(editSheetsDto);
  }

  @Delete(":id")
  delete(@Param() userId: number): void {
    this.sheetsServise.delete(userId);
  }
}
