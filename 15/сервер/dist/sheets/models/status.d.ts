interface Istat {
    findedUser?: string;
    badPoints?: boolean;
}
export declare class Status implements Istat {
    private _findedUser?;
    private _badPoints?;
    constructor();
    get findedUser(): string;
    set findedUser(value: string);
    get badPoints(): boolean;
    set badPoints(value: boolean);
}
export {};
