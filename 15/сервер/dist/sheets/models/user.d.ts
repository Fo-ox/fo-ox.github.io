import { Contact } from "./contact";
import { Status } from "./status";
interface Iuser {
    readonly id: number;
    name: string;
    surname: string;
    patronymic: string;
    date: Date;
    points: number;
    group: string;
    contact: Contact;
    status?: Status;
}
export declare class User implements Iuser {
    private readonly _id;
    private _name;
    private _surname;
    private _patronymic?;
    private _date;
    private _points?;
    private _group?;
    private _contact?;
    private _status;
    constructor(Id: number, Dates: Date, Contacts: Contact, Name: string, Surname: string, Patronymic?: string, Points?: number, Group?: string);
    get id(): number;
    get name(): string;
    set name(Name: string);
    get surname(): string;
    set surname(Surname: string);
    get patronymic(): string;
    set patronymic(Patronymic: string);
    get group(): string;
    set group(Patronymic: string);
    get date(): Date;
    set date(Dates: Date);
    get contact(): Contact;
    set contact(value: Contact);
    get points(): number;
    set points(value: number);
    get status(): Status;
    set status(value: Status);
}
export {};
