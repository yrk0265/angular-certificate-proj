import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paging } from '../Models/paging.model';
import { RoleDetailsService } from '../services/role-details.service';
import { UserDetailsListService } from '../services/user-details-list.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  AddorEdit!:string;
  single:any=[];
  pg = new Paging(); 
  IsChecked:Boolean=false;
  IsRoleChecked:Boolean=false;
  roleid!:number;
  role_id!:number;
  rolename!:string;
  start:number = 0;
  pageSize:number = 10;
  pageNumber:number = 0;
  selected:any;
  data: any = {};
  constructor(private router: Router,private service:RoleDetailsService,private serviceUser:UserDetailsListService) { }

  ngOnInit(): void {
  }
  save():any{
    //this.roleid = this.single.user_role_id;
    //this.single.user_id=0;
    this.single.user_active_status=this.IsChecked ? "Yes":"No";
    if(this.single.user_id>0)
    {
      this.data.user_id=this.single.user_id;
    }
    this.data.user_name=this.single.user_name;
    this.data.password=btoa(this.single.password);
    this.data.user_active_status=this.single.user_active_status;
    this.data.user_role_id=this.single.user_role_id;
    this.data.user_role_name=this.single.user_role_name;
    this.data.user_role_active_status=this.IsRoleChecked ? "Yes":"No";
    if(this.single.created_by)
    {
       this.data.created_by=this.single.created_by;
    }
    this.data.created_on=this.single.created_on;
    this.data.modified_by=this.single.modified_by;
    this.data.modified_on=this.single.modified_on;
    this.data.IS_Active=1;
    this.data.Current_User=8;
    //this.single.user_role_id=this.roleid;
    //this.single.certificate_active_status = this.IsChecked ? "Yes":"No";
    this.serviceUser.saveEdit(this.data).subscribe(x=>{
        if (x == "Success")
        {
            alert("Successfully created user.");
            this.router.navigate(['']);
        }
        else {
            alert("Failed to create user.");
        }
    });
  }
  valueChangeHandler(count:any){
    this.service.getRoleList(this.pg,this.roleid,this.rolename).subscribe(x=> {
      for (let s = 0;s < x.data.length; s++)
      {
        if(count==x.data[s].role_id)
        {
          this.single.user_role_id=x.data[s].role_id;
          this.single.user_role_name=x.data[s].role_name;
          this.single.user_role_active_status="Yes";
          this.single.created_by=1;
          this.single.created_on="2022-08-10";
          this.single.modified_by=1;
          this.single.modified_on="2022-08-10";
          break;
        }
      }
    });
    //this.selected=count;
  }

}
