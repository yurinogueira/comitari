export class User {

    public id: number;
    public email: string;
    public username: string;
    public twoFactor: boolean;
    public firstName: string;
    public lastName: string;
    public isStaff: boolean;
    public isActive: boolean;
    public dateJoined: Date;

    constructor(id: number,
                email: string,
                username: string,
                twoFactor: boolean,
                firstName: string,
                lastName: string,
                isStaff: boolean,
                isActive: boolean,
                dateJoined: Date) {

        this.id = id;
        this.email = email;
        this.username = username;
        this.twoFactor = twoFactor;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isStaff = isStaff;
        this.isActive = isActive;
        this.dateJoined = dateJoined;

    }

}
