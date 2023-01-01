import { LoginClass } from './../Models/login.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL= environment.AAPI_URL;
  private _url=this.API_URL+"Auth/Login";
  constructor(private router: Router,private http:HttpClient) { }
  registerUser(login:LoginClass){
    console.log(this.API_URL);
    return this.http.post<any>(this._url,login);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  forgotpass(email:string){
    return this.http.post<any>(this._url,email);
  }
}
