import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styles: [],
    providers: [UserService, Router]
})
export class AppComponent implements OnInit {

    constructor(private _userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        const token = localStorage.getItem("accessToken");
        if (token) {
            this._userService.verifyLogin(token).then(isValid => {
                const page = isValid ? "main" : "login";
                this.router.navigate([page]).then(() => console.log(page));
            });
        } else {
            this.router.navigate(["login"]).then(() => console.log("login"));
        }

    }

}
