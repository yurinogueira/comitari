export class LoginDto {

    public email: string;
    public password: string;
    public selectedMethod?: string;
    public code?: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

}
