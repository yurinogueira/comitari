import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginModel} from "../models/login.model";
import {EventService} from "./event.service";


@Injectable()
export class AuthService {

    private httpHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.httpHeaders = new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });
    }

    public login(login: LoginModel): Promise<boolean> {
        return new Promise(resolve => {
            this.http.post(
                "api/token/",
                JSON.stringify(login),
                {headers: this.httpHeaders, responseType: "text"}
            ).subscribe({
                next: data => {
                    const dataJson = JSON.parse(data);

                    localStorage.setItem("accessToken", dataJson["token"]);
                    localStorage.setItem("refreshToken", dataJson["refresh"]);
                    localStorage.setItem("username", dataJson["username"]);

                    EventService.get("logged").emit(true);
                    resolve(true);
                },
                error: error => {
                    console.error(error);
                    resolve(false);
                }
            });
        });
    }

    public refreshLogin(refreshToken: string): Promise<boolean> {
        return new Promise(resolve => {
            this.http.post(
                "api/token/refresh/",
                JSON.stringify({token: refreshToken}),
                {headers: this.httpHeaders, responseType: "text"}
            ).subscribe({
                next: data => {
                    const dataJson = JSON.parse(data);

                    localStorage.setItem("accessToken", dataJson["token"]);

                    resolve(true);
                },
                error: error => {
                    console.log(error);
                    resolve(false);
                }
            });
        });
    }

    public verifyLogin(accessToken: string): Promise<boolean> {
        return new Promise(resolve => {
            this.http.post(
                "api/token/verify/",
                JSON.stringify({token: accessToken}),
                {headers: this.httpHeaders, responseType: "text"}
            ).subscribe({
                next: data => {
                    EventService.get("logged").emit(true);
                    resolve(true);
                },
                error: error => {
                    console.log(error);
                    this.logout();
                    resolve(false);
                }
            });
        });
    }

    public logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        EventService.get("logged").emit(false);
    }

}
