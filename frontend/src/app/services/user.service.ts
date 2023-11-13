import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginDto} from "../dtos/login.dto";


@Injectable()
export class UserService {

    private httpHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.httpHeaders = new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });
    }

    public login(login: LoginDto): Promise<boolean> {
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
    }

}
