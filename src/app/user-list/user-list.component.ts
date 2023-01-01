import { LoginService } from './../services/loginservice.service';
import { UserDetailsListService } from './../services/user-details-list.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Paging } from '../Models/paging.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  data:any = []; 
  ButtonVisible!:boolean;
  deleteid: number[] = [];
  start:number = 0;
  pageSize:number = 10;
  pageNumber:number = 0;
  pg = new Paging(); 
  u: any = {};
  user_id=[];
  valueEmittedFromChildComponent: any = [];
  totalPages:number=0;
  username:string="";
  rolename:string="";
  userid!:number;
  constructor(private service:UserDetailsListService,private router: Router,private loginservice:LoginService) { 

  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData():void{
    if(this.username==null || this.username=="" || this.username==undefined
    && this.rolename==null || this.rolename=="" || this.rolename==undefined
    )
    {
      this.loadlist(this.start,this.pageSize,this.pageNumber);
    }
  }
  loadlist(start:number,pageSize:number,pageNumber:number):void {
    this.pg.start=start;
    this.pg.pageSize = pageSize;
    this.pg.pageNumber = pageNumber;
     this.service.getUserList(this.pg,this.userid,this.username,this.rolename).subscribe(x=>{
        if(x.data==null || x.data==undefined)
        {
            this.data = x;
            console.log('user'+this.data);
            this.totalPages=x.count;
        }
        else {
            this.data = x.data;
            console.log(this.data);
            this.totalPages = x.count;
        }
        if(this.data.length==0)
        {
          this.ButtonVisible=false;
          this.loginservice.logoutUser();
        }
        else if(this.data.length>0)
            this.ButtonVisible=true;
     });
  }
  parentEventHandlerFunction(valueEmitted:any){
    this.start = ((valueEmitted.page-1) * valueEmitted.itemsPerPage);
    this.pageSize = ((valueEmitted.page) * (valueEmitted.itemsPerPage));
    this.pageNumber=valueEmitted.page;
    this.loadData();
  }
  redirect(row:any):void {
    console.log(row);
    if(row=='')
    {
      this.router.navigate(['user-list-add']);
    } 
    else {
      const navigationExtras: NavigationExtras = {state: {singlerow:row}};
      this.router.navigate(['user-list-edit'],navigationExtras);
    }
  }
  Delete():void{
    this.deleteid=[];
     var elements = (<HTMLInputElement[]><any>document.getElementsByName("rows"));
     for (let i = 0; i < elements.length; i++) {
       var inputElementId=(<HTMLInputElement><any>(elements[i]).lastChild?.lastChild).id;
       var inputId = (<HTMLInputElement><any>document.getElementById(inputElementId));
       if (inputId.type == "checkbox") {
          if (inputId.checked) {
            let id=Number(inputId.id.replace("flexCheckDefault_",""));
            this.deleteid.push(id);
          }
        }
    }
    if(this.deleteid.length>0)
    {
      this.u={};
      this.u.user_id=this.user_id;
      this.u.user_id=this.deleteid;
      this.u.modified_by="1";
      this.u.action="Deactivate";
        this.service.deleteuser(JSON.stringify(this.u)).subscribe(x=>{
            if (x == "success")
            {
              alert("Deletion of record was successful.")
              this.loadlist(this.start,this.pageSize,this.pageNumber);
            }
            else {
              alert("Failed to delete.");
            }
        });
    }
  }
}
