export class RegisterModel {

    public email: string;
    public firstName: string;
    public lastName: string;
    public password: string;

    constructor(email: string, firstName: string, lastName: string, password: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

}
