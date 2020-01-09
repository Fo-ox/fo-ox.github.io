interface Icontact {
    readonly id: number;
    phone?: string;
    email?: string;
    adress?: string;
}
export declare class Contact implements Icontact {
    private readonly _id;
    private _phone?;
    private _email?;
    private _adress?;
    constructor(id: number, phone?: string, email?: string, adress?: string);
    get id(): number;
    get phone(): string;
    set phone(value: string);
    get email(): string;
    set email(value: string);
    get adress(): string;
    set adress(value: string);
}
export {};
