import {UserModel} from "./user.model";

export class MessageModel {

    public id: number;
    public hasEdit: boolean;
    public author: UserModel;
    public content: string;
    public timestamp: Date;

    constructor(id: number, hasEdit: boolean, author: UserModel, content: string, timestamp: Date) {
        this.id = id;
        this.hasEdit = hasEdit;
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
    }

}
