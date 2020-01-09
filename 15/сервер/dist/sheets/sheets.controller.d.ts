import { SheetsService } from "./servises/sheets.service";
import { Observable } from "rxjs";
import { CreateSheetDto } from "./dto/create-sheet-dto";
import { EditSheetDto } from "./dto/edit-sheet-dto";
export declare class SheetsController {
    private sheetsServise;
    constructor(sheetsServise: SheetsService);
    findAll(): Observable<CreateSheetDto[]>;
    findId(userId: number): Observable<CreateSheetDto>;
    create(createSheetDto: CreateSheetDto): Promise<CreateSheetDto>;
    edit(editSheetsDto: EditSheetDto): Promise<CreateSheetDto>;
    delete(userId: number): void;
}
