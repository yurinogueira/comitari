import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {LoginModel} from "../../models/login.model";
import {AuthService} from "../../services/auth.service";
import {EventService} from "../../services/event.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: "login-form",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [AuthService, MatSnackBar]
})
export class LoginComponent {

    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.min(6), Validators.required])
    });

    constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    }

    submit() {
        if (this.form.valid) {
            EventService.get("loading").emit(true);

            const loginModel= new LoginModel(
                this.form.get("email")?.value,
                this.form.get("password")?.value
            );

            this.authService.login(loginModel).then(isValid => {
                EventService.get("loading").emit(false);

                if (isValid) {
                    this.router.navigate(["main"]).then(r => console.log(r));
                } else {
                    this.snackBar.open("Erro ao logar", "Fechar", {
                        duration: 2000,
                        horizontalPosition: "right",
                        verticalPosition: "top",
                    });
                }
            });
        }
    }

    register() {
        this.router.navigate(["register"]).then(r => console.log(r));
    }

}
