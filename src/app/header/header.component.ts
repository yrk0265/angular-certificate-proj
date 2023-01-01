import { LoginService } from './../services/loginservice.service';
import { RoleDetailsService } from './../services/role-details.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageclass!:string;
  constructor(private router: Router,private service:LoginService) { }
  ngOnInit(): void {
    if(this.router.url.replace('/','')==="certificate-details")
    {
      this.pageclass="certificate-details";
    }
    else if(this.router.url.replace('/','')==="user-list") {
      this.pageclass="user-list";
    }
    else if(this.router.url.replace('/','')==="create-role"){
      this.pageclass="create-role";
    }
    else if(this.router.url.replace('/','')==="role-list"){
      this.pageclass="role-list";
    }
  }
  redirect(page:string):void {
    //const navigationExtras: NavigationExtras = {state: {singlerow:row}};
    if (page === 'userlist')
    {
      this.router.navigate(['user-list']);
    }
    else if (page === 'certificatelist')
    {
      this.router.navigate(['certificate-details']);
    }
    else if (page ==='rolelist')
    {
      this.router.navigate(['role-list']);
    }
    else if(page === "createrole"){
      this.router.navigate(['create-role']);
    }
  }
  logIn():boolean{
    return this.service.loggedIn();
  }
  logout():void{
    localStorage.removeItem('certificateEdit');
    this.service.logoutUser();          
  }
}
