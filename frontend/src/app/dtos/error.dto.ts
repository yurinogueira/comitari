export class ErrorDto {

    public developer_message: string;
    public user_message: string;

    constructor(developer_message: string, user_message: string) {
        this.developer_message = developer_message;
        this.user_message = user_message;
    }

}
