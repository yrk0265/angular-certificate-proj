import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Paging } from '../Models/paging.model';
import { RoledetailsComponent } from '../roledetails/roledetails.component';
import { RoleDetailsService } from '../services/role-details.service';
import { UserDetailsListService } from '../services/user-details-list.service';


@Component({
  selector: 'app-user-list-edit',
  templateUrl: './user-list-edit.component.html',
  styleUrls: ['./user-list-edit.component.css']
})
export class UserListEditComponent implements OnInit {
  AddorEdit!:string;
  single:any=[];
  IsChecked:Boolean=false;
  IsRoleChecked:Boolean=false;
  roleid!:number;
  role_id!:number;
  rolename!:string;
  start:number = 0;
  pageSize:number = 10;
  pageNumber:number = 0;
  pg = new Paging(); 
  selected:any;
  data: any = {};
  @ViewChild('child') children!:RoledetailsComponent;
  constructor(private router: Router,private service:RoleDetailsService,private serviceUser:UserDetailsListService) { 
    const navigation = this.router.getCurrentNavigation();
    let state!:any;
    if(navigation?.extras.state!=undefined && this.router.url.replace('/','')!='user-list-add') {
      state = navigation?.extras.state as {singlerow: any};
    }
    if (this.router.url.replace('/','')=='user-list-add')
    {
      this.AddorEdit ="Add";
    }
    else if(navigation?.extras.state==undefined || (navigation?.extras?.state as {singlerow: any}).singlerow!='') {
      this.AddorEdit = "Edit";
      this.single=state.singlerow;
      this.IsRoleChecked=(this.single.user_role_active_status.toString() =='Yes' ? true:false);
      this.IsChecked=(this.single.user_active_status.toString() =='Yes' ? true:false);
      
    }
  }
  ngOnInit(): void {
    //this.roleid = this.single.user_role_id;
    //console.log(this.role_id);
  }
  ngAfterViewInit(){
    if(this.single.user_role_id>0)
      {
        //this.roleid = this.single.user_role_id;
        this.children.changes(this.single.user_role_id);
      }
  }
  ngOnChanges(changes: any) {
    //console.log(changes);
  }
  parseDate(input:any):any {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
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
            this.router.navigate(['user-list']);
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
