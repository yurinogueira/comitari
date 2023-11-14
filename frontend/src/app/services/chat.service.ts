import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageModel} from "../models/message.model";
import {UserModel} from "../models/user.model";


@Injectable()
export class ChatService {

    constructor(private http: HttpClient) {
    }

    private jsonToMessageModel(message: any): MessageModel {
        const userModel = new UserModel(
            message.author.email,
            message.author.username,
            message.author.twoFactor,
            message.author.firstName,
            message.author.lastName,
            message.author.isStaff,
            message.author.isActive,
            message.author.dateJoined
        );

        return new MessageModel(
            message.id,
            message.hasEdit,
            userModel,
            message.content,
            message.timestamp
        );
    }

    private jsonStringToMessageModelList(data: string): MessageModel[] {
        const dataJson = JSON.parse(data);
        const messages: MessageModel[] = [];

        for (let i = 0; i < dataJson.length; i++) {
            const message = dataJson[i];
            const messageModel = this.jsonToMessageModel(message);
            console.log(messageModel);
            messages.push(messageModel);
        }
        return messages;
    }

    public create(content: string): Promise<MessageModel | null> {
        const httpHeaders = new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        });

        return new Promise(resolve => {
            this.http.post(
                "chat/messages/",
                {content},
                {headers: httpHeaders, responseType: "text"}
            ).subscribe({
                next: data => {
                    const dataJson = JSON.parse(data);
                    const messageModel = this.jsonToMessageModel(dataJson);
                    resolve(messageModel);
                },
                error: error => {
                    console.error(error);
                    resolve(null);
                }
            });
        });
    }

    public listAfter(messageId: number): Promise<MessageModel[]> {
        const httpHeaders = new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        });

        return new Promise(resolve => {
            this.http.get(
                `chat/messages/${messageId}/messages/`,
                {headers: httpHeaders, responseType: "text"}
            ).subscribe({
                next: data => {
                    resolve(this.jsonStringToMessageModelList(data));
                },
                error: error => {
                    console.error(error);
                    resolve([]);
                }
            });
        });
    }

    public list(): Promise<MessageModel[]> {
        const httpHeaders = new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        });

        return new Promise(resolve => {
            this.http.get(
                "chat/messages/",
                {headers: httpHeaders, responseType: "text"}
            ).subscribe({
                next: data => {
                    resolve(this.jsonStringToMessageModelList(data));
                },
                error: error => {
                    console.error(error);
                    resolve([]);
                }
            });
        });
    }


}
