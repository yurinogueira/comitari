import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {EventService} from "../../services/event.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    providers: [AuthService, Router]
})
export class AppComponent implements OnInit {

    loading: boolean = false;
    logged: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
        EventService.get("loading").subscribe(data => this.loading = data);
        EventService.get("logged").subscribe(data => this.logged = data);
    }

    ngOnInit() {
        const token = localStorage.getItem("accessToken");
        if (token) {
            this.authService.verifyLogin(token).then(isValid => {
                const page = isValid ? "main" : "login";
                this.router.navigate([page]).then(() => console.log(page));
            });
        } else {
            this.router.navigate(["login"]).then(() => console.log("login"));
        }

    }

    logout() {
        this.authService.logout();
        this.router.navigate(["login"]).then(() => console.log("login"));
    }

}
