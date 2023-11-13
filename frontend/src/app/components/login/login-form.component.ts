import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {LoginDto} from "../../dtos/login.dto";
import {UserService} from "../../services/user.service";

@Component({
    selector: "login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.css"],
    providers: [UserService]
})
export class LoginFormComponent {

    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.min(6), Validators.required])
    });

    constructor(private _userService: UserService) {
    }

    submit() {
        if (this.form.valid) {
            const loginDto= new LoginDto(
                this.form.get("email")?.value,
                this.form.get("password")?.value
            );

            this._userService.login(loginDto);
        }
    }

    register() {
    }

}
