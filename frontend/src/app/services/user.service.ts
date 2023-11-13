import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterModel} from "../models/register.model";


@Injectable()
export class UserService {

    private httpHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.httpHeaders = new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });
    }

    public register(register: RegisterModel): Promise<boolean> {
        return new Promise(resolve => {
            this.http.post(
                "users/register",
                JSON.stringify(register),
                {headers: this.httpHeaders, responseType: "text"}
            ).subscribe({
                next: () => {
                    resolve(true);
                },
                error: error => {
                    console.error(error);
                    resolve(false);
                }
            });
        });
    }

}
