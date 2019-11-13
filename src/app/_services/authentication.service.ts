import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    url = 'http://localhost:8000/oauth/token';

    login(username: string, password: string) {
        let formData: FormData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('grant_type', 'password');
        formData.append('client_id', '3');
        formData.append('client_secret', 'MrOPdr6pon5oAN5alw71QByu9Ij8QzNIlcabkVMT');

        //const  headers = new  HttpHeaders().set("Authorization", "Basic TUtEQVRBX0ZST05UOjJ4JjlVRDRhYlk/d0F1WVI=");

        return this.http.post<any>(this.url, formData)
            .pipe(map(user => {
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        localStorage.clear();
    }
}