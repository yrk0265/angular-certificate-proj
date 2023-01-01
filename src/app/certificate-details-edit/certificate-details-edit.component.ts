import { CertificateDetailsService } from './../services/certificate-details.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Paging } from '../Models/paging.model';
@Component({
  selector: 'app-certificate-details-edit',
  templateUrl: './certificate-details-edit.component.html',
  styleUrls: ['./certificate-details-edit.component.css']
})
export class CertificateDetailsEditComponent implements OnInit {
  AddorEdit!:string;
  single:any=[];
  data: any = {};
  start:number = 0;
  pageSize:number = 10;
  pageNumber:number = 0;
  pg = new Paging(); 
  IsChecked:Boolean=false;
  
  constructor(private router: Router,private service:CertificateDetailsService) {
    const navigation = this.router.getCurrentNavigation();
    let state!:any;
    let d!:any;
    if(navigation?.extras.state!=undefined && this.router.url.replace('/','')!='certificate-details-add') {
      state = navigation?.extras.state as {singlerow: any};
    }
    if(this.router.url.replace('/','')=='certificate-details-add')
    {
      this.AddorEdit = "Add";
    }
    else if(navigation?.extras.state==undefined || (navigation?.extras?.state as {singlerow: any}).singlerow!='') {
      this.AddorEdit = "Edit";
      if(localStorage.getItem('certificateEdit')!=undefined && localStorage.getItem('certificateEdit'))
      {
          let r=localStorage.getItem('certificateEdit');
          if(r)
          {
            r=JSON.parse(r);
            this.single=r;
            console.log(this.parseDate(this.single.issue_date));
            this.single.issue_date=this.parseDate(this.single.issue_date);
            this.single.expiration_date=this.parseDate(this.single.expiration_date);
            this.IsChecked=(this.single.certificate_active_status.toString() =='Yes' ? true:false);    
          }
      }
      else {
          this.loadlist(0,0,0,state.singlerow.id);
      }
    }
  } 
  ngOnInit(): void {
  }
  parseDate(input:any):any {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }
  editFetchData(id:number){
    this.service.getEditUser(id).subscribe(x=>{
      if(x.msg=="Success")
      {
        let fetchedData = x.data;
        if(fetchedData != null && fetchedData != "" && fetchedData != '')
        {
          let data = fetchedData;
          this.single.id=data.id;
          this.IsChecked = data.certificate_active_status == "Yes"  ? true : false;
          this.single.certificate_name = data.certificate_name;
          this.single.issuer = data.issuer;
          this.single.resource_id = data.resource_id;
          this.single.resource_name = data.resource_name;
          this.single.type = data.type;
          this.single.resource_location = data.resource_location;
          this.single.issue_date = this.parseDate(data.issue_date);
          this.single.expiration_date = this.parseDate(data[0].expiration_date);
          //console.log(data[0]);
          //this.single.created_by = "test";
        }
      }
    });
  }
  loadlist(start:number,pageSize:number,pageNumber:number,id:number):void {
    this.pg.id = id;
    if(id>0)
    {
      this.editFetchData(id);
    }
    else {
    this.pg.start=this.start;
    this.pg.pageSize = this.pageSize;
    this.pg.pageNumber = pageNumber;
    this.service.search(this.pg,this.single.certificatename,
      this.single.resourcename,
      this.single.type,
      this.single.location,
      this.single.issuer).subscribe(x=>{
      this.single = x;
      console.log(x);
      //localStorage.setItem('certificateEdit',JSON.stringify(x));
      //this.single.issue_date=this.parseDate(this.single.issue_date);
      //this.single.expiration_date=this.parseDate(this.single.expiration_date);
      //this.IsChecked=(this.single.certificate_active_status.toString() =='Yes' ? true:false);    
    });
  }
}
 

  save():any{
    if(!this.single.id || this.single.id==0)
    {
      //this.data.id=0;
      this.data.certificate_active_status= this.IsChecked ? 1:0;
      this.data.certificate_name=this.single.certificate_name;
      this.data.issuer=this.single.issuer;
      this.data.resource_id=this.single.resource_id;
      this.data.resource_name=this.single.resource_name;
      this.data.type=this.single.type;
      this.data.resource_location=this.single.resource_location;
      this.data.issue_date=this.single.issue_date;
      this.data.expiration_date=this.single.expiration_date;
      this.data.created_by=1;
      this.data.IS_Active=1;
      this.data.Current_User=8;
      this.service.saveUserEdit(this.data).subscribe(x=>{
        if(x=="Failure")
        {
          alert("Failed to insert record.");
        }
        else {
          alert("Successfully inserted record.");
        }
      });
    }
    else {
      this.single.certificate_active_status = this.IsChecked ? 1:0;
      this.data.id=this.single.id;
      this.data.certificate_active_status=this.single.certificate_active_status;
      this.data.certificate_name=this.single.certificate_name;
      this.data.issuer=this.single.issuer;
      this.data.resource_id=this.single.resource_id;
      this.data.resource_name=this.single.resource_name;
      this.data.type=this.single.type;
      this.data.resource_location=this.single.resource_location;
      this.data.issue_date=this.single.issue_date;
      this.data.expiration_date=this.single.expiration_date;
      this.service.saveUserEdit(this.data).subscribe(x=>{
        if(x=="Failure")
        {
            alert("Due some a error we weren't able to save your request.");
        }
        else {
          alert("Successfully saved.");
        }
      });
    }
  }
}
