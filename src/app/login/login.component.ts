import { LoginModel } from './../Models/login-model.model';
import { LoginService } from './../services/loginservice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginClass } from './../Models/login.model';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  username!:string;
  constructor(private service:LoginService,private router: Router) {
    this.email='';
    this.password='';
  }
  ngOnInit(): void {
    
  }
  login():void {
      this.email = (document.getElementById("email")  as HTMLInputElement).value;
      this.password = (document.getElementById("pwd") as HTMLInputElement).value;
      this.password=btoa(this.password);
      this.username=this.email.split('@')[0]; 
      if(this.username!="" && this.username.length>0) {    
        var login=new LoginClass(this.email,this.username,this.password);  
        this.service.registerUser(login).subscribe(x=>{
            localStorage.setItem('token',x.token);
            localStorage.removeItem('certificateEdit');
            this.router.navigate(['certificate-details']);
        });
      }
  } 
}
