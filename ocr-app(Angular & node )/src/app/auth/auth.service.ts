import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn:"root"})
export class AuthService{

    constructor(private http: HttpClient , private router:Router){}
    private token:string;
    isAuthonticated = false;
    private authStatusListner = new Subject<boolean>();

    getToken(){
        return this.token;
    }

    getIsAuth(){
        return this.isAuthonticated;
    }

    getAuthStatusListner(){
        return this.authStatusListner.asObservable();
    }

    createUser(email:string , password:string){
        const authData : AuthData = {
            email: email,
            password: password
        };
        this.http.post("http://localhost:3000/api/user/signup" , authData)
            .subscribe(response => {
                console.log(response);
            });
    }
    login(email:string , password:string){
        const authData : AuthData = { email: email , password: password};
        this.http.post<{token:string}>("http://localhost:3000/api/user/login" , authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if(token){
                    this.isAuthonticated = true;
                    this.authStatusListner.next(true);
                    this.router.navigate(["/"]);
                }
            });
    }
    logout(){
        this.token = null;
        this.isAuthonticated = false;
        this.authStatusListner.next(false);
        this.router.navigate(["/"]);
    }
}