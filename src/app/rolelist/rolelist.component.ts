import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Paging } from '../Models/paging.model';
import { RoleDetailsService } from '../services/role-details.service';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.css']
})
export class RolelistComponent implements OnInit {
  ButtonVisible!:boolean;
  data:any = []; 
  u: any = {};
  deleteid: number[] = [];
  start:number = 0;
  pageSize:number = 10;
  pageNumber:number = 0;
  pg = new Paging(); 
  totalPages:number=0;
  roleid!:number;
  rolename!:string;
  x!:any;
  constructor(private service:RoleDetailsService,private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData():void{
    // if(this.rolename==null || this.rolename=="" || this.rolename==undefined)
    // {
      this.loadlist(this.start,this.pageSize,this.pageNumber);
    //}
  }
  loadlist(start:number,pageSize:number,pageNumber:number):void {
    this.pg.start=this.start;
    this.pg.pageSize = this.pageSize;
    this.pg.pageNumber = pageNumber;
    this.service.getRoleList(this.pg,this.roleid,this.rolename).subscribe(x=>{
      if(x!=null)
      {
        if(x.data==null || x.data==undefined)
        {
          this.data = x;
          this.totalPages=x.count;
        }
        else { 
          this.data = x.data;
          this.totalPages=x.count;
        }
        if(this.data.length==0)
        {
            this.ButtonVisible=false;
        }
        else if(this.data.length>0)
          this.ButtonVisible=true;
      }
    });
  }
  redirect(row:any):void {
    if(row=='')
    {
      this.router.navigate(['create-role-add']);
    } 
    else {
      const navigationExtras: NavigationExtras = {queryParams: {role_id:row.role_id,role_name:row.role_name}};
      this.router.navigate(['create-roles'],navigationExtras);
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
      this.u.role_id=this.deleteid;
      this.u.modified_by="1";
      this.u.action="Deactivate";
      this.service.delete(JSON.stringify(this.u)).subscribe(x=>{
            if(x=="success")
            {
              alert("Successfully deleted record.")
              this.loadlist(this.start,this.pageSize,this.pageNumber);
            }
            else {
              alert("Error occurred hence failed to delete the record."+x);
            }
      });
    }
  }
}
