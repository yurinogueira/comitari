import {AfterViewInit, Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {MessageModel} from "../../models/message.model";

@Component({
    selector: "chat",
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.component.css"],
    providers: [ChatService]
})
export class ChatComponent implements AfterViewInit {

    messages: MessageModel[] = []

    private shouldCall: boolean = false;

    public messageForm: FormGroup = new FormGroup({
        msg: new FormControl('', [Validators.min(1)]),
    });

    constructor(private chatService: ChatService) {
        chatService.list().then(messages => {
            this.messages.push(...messages);
        });
    }

    loadMessages() {
        this.shouldCall = false;

        if (this.messages.length > 0) {
            const lastMessage = this.messages[this.messages.length - 1];
            this.chatService.listAfter(lastMessage.id).then(messages => {
                this.messages.push(...messages);
            });
        } else {
            this.chatService.list().then(messages => {
                this.messages.push(...messages);
            });
        }
    }

    submit() {
        if (this.messageForm.valid) {
            this.chatService.create(this.messageForm.value.msg).then(message => {
                this.messageForm.reset();
                if (message) {
                    this.loadMessages();
                }
            });
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (!this.shouldCall) {
                this.shouldCall = true;
            } else {
                this.loadMessages();
            }
        }, 5000)
    }

}
