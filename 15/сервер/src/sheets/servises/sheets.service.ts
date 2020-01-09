import { Injectable } from "@nestjs/common";
import { from, Observable } from "rxjs";
import { UserEntity } from "../models/userEntity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSheetDto } from "../dto/create-sheet-dto";
import { EditSheetDto } from "../dto/edit-sheet-dto";

@Injectable()
export class SheetsService {
  constructor(@InjectRepository(UserEntity) private readonly sheetsRepository: Repository<UserEntity>) {
  }

  public findAll(): Observable<CreateSheetDto[]> {
    return from(this.sheetsRepository.find());
  }

  public findId(userId: number): Observable<CreateSheetDto> {
    return from(this.sheetsRepository.findOne(userId));
  }

  public create(createSheetDto: CreateSheetDto): Promise<CreateSheetDto> {
    return this.sheetsRepository.save(createSheetDto);
  }

  public edit(editSheetsDto: EditSheetDto): Promise<CreateSheetDto> {
    return this.sheetsRepository.save(editSheetsDto);
  }

  public delete(userId: number): void {
    this.sheetsRepository.delete(userId);
  }
}

/* {
name: "somename",
surname: "somesurname",
patronymic: "somePatronumic",
date: "10-10-10",
points: 4.5,
group: "A-101",
phone: "8(800)000-00-00",
email: "a@a.ru",
adress: "some text",
}, */
