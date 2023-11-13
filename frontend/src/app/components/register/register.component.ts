import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {EventService} from "../../services/event.service";
import {Router} from "@angular/router";
import {RegisterModel} from "../../models/register.model";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";
import {LoginModel} from "../../models/login.model";

@Component({
    selector: "register-form",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
    providers: [UserService, AuthService, MatSnackBar]
})
export class RegisterComponent {

    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.min(6), Validators.required])
    });

    constructor(private userService: UserService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    }

    submit() {
        if (this.form.valid) {
            EventService.get("loading").emit(true);

            const registerModel= new RegisterModel(
                this.form.get("email")?.value,
                this.form.get("firstName")?.value,
                this.form.get("lastName")?.value,
                this.form.get("password")?.value
            );

            this.userService.register(registerModel).then(isValid => {

                if (isValid) {
                    const loginModel= new LoginModel(
                        this.form.get("email")?.value,
                        this.form.get("password")?.value
                    );
                    this.authService.login(loginModel).then(() => {
                        EventService.get("loading").emit(false);

                        this.router.navigate(["main"]).then(r => console.log(r));
                    })
                } else {
                    EventService.get("loading").emit(false);

                    this.snackBar.open("Erro ao realizar registro", "Fechar", {
                        duration: 2000,
                        horizontalPosition: "right",
                        verticalPosition: "top",
                    });
                }
            });
        }
    }

    login() {
        this.router.navigate(["login"]).then(r => console.log(r));
    }

}
