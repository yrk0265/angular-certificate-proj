import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paging } from '../Models/paging.model';
import { RoleDetailsService } from '../services/role-details.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  u:any={};
  roleid!:number;
  RoleName!:any;
  IsActive!:boolean;
  pg = new Paging(); 
  start:number = 0;
  pageSize:number = 10;
  pageNumber:number = 0;
  AddorEdit!:string;
  description:string="";;
  constructor(private route: ActivatedRoute,private router: Router,private service:RoleDetailsService) { 
  }
  ngOnInit(): void {
    let state!:any;
    let d!:any;
    console.log(this.router.url);
    if(this.router.url.replace('/','')=='create-role-add')
    {
      this.AddorEdit = "Add";
    }
    else 
    {
      this.AddorEdit = "Edits";
      this.route.queryParams.subscribe(params => {
        this.roleid=params['role_id'];
        this.RoleName=params['role_name'];
        this.IsActive=true;
      });
    }
  }
  loadlist(start:number,pageSize:number,pageNumber:number,roleid:number){
    this.pg.start=this.start;
    this.pg.pageSize = this.pageSize;
    this.pg.pageNumber = this.pageNumber;
    
  }
  save():void{
    if(this.roleid>0)
      this.u.role_id=this.roleid;

    this.u.role_name=this.RoleName;
    this.u.is_Active=this.IsActive==true ? 1 : 0;
    this.u.Current_User=8;
    this.u.description=this.description;
    this.service.save(this.u).subscribe(x=> {
      if(x='Success')
      {
        alert("Successfull");
        this.router.navigate(['certificate-details']);
      }
    });
  }
}
