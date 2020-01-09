import { Observable } from "rxjs";
import { UserEntity } from "../models/userEntity";
import { Repository } from "typeorm";
import { CreateSheetDto } from "../dto/create-sheet-dto";
import { EditSheetDto } from "../dto/edit-sheet-dto";
export declare class SheetsService {
    private readonly sheetsRepository;
    constructor(sheetsRepository: Repository<UserEntity>);
    findAll(): Observable<CreateSheetDto[]>;
    findId(userId: number): Observable<CreateSheetDto>;
    create(createSheetDto: CreateSheetDto): Promise<CreateSheetDto>;
    edit(editSheetsDto: EditSheetDto): Promise<CreateSheetDto>;
    delete(userId: number): void;
}
