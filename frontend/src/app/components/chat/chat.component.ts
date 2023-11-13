import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";

@Component({
    selector: "chat",
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.component.css"],
    providers: [UserService]
})
export class ChatComponent {
}
