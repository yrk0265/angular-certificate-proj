import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router'
import { Paging } from '../Models/paging.model';
import { CertificateDetailsService } from '../services/certificate-details.service';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.css'],
  providers:[CertificateDetailsService]
})
export class CertificateDetailsComponent implements OnInit {
  ButtonVisible!:boolean;
  data:any = []; 
  deleteid: number[] = [];
  start:number = 0;
  pageSize:number = 10;
  pageNumber:number = 0;
  pg = new Paging(); 
  u: any = {};
  certificate_id=[];
  totalPages:number=0;
  valueEmittedFromChildComponent: any = [];
  certificatename:string="";
  resourcename:string="";
  type:string="";
  location:string="";
  issuer:string="";
  constructor(private service:CertificateDetailsService,private router: Router) 
  { 

  }
  ngOnInit(): void {
    this.loadData(); 
  }
  loadData():void{
    if(this.certificatename==null || this.certificatename=="" || this.certificatename==undefined
    && this.resourcename==null || this.resourcename=="" || this.resourcename==undefined
    && this.type==null || this.type=="" || this.type==undefined
    && this.location==null || this.location=="" || this.location==undefined
    && this.issuer==null || this.issuer=="" || this.issuer==undefined)
    {
      this.loadlist(this.start,this.pageSize,this.pageNumber);
    }
  }
  loadlist(start:number,pageSize:number,pageNumber:number):void {
    this.pg.start=this.start;
    this.pg.pageSize = this.pageSize;
    this.pg.pageNumber = pageNumber;
    this.service.search(this.pg,this.certificatename,this.resourcename,this.type,this.location,this.issuer).subscribe(x=>{
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
    });
  }
  search(certificate_name:string,resource_name:string,type:string,location:string,issuer:string):void{
      this.pg.start=this.start;
      this.pg.pageSize = this.pageSize;
      this.pg.pageNumber = this.pageNumber;
      this.service.search(this.pg,certificate_name,resource_name,type,location,issuer).subscribe(x=>{
        if(x.data==null || x.data==undefined)
        {
          this.data = x;
          //this.totalPages=x.count;
        }
        else { 
          this.data = x.data;
          //this.totalPages=x.count;
        }
        //  console.log(x);
      });
  }
  redirect(row:any):void {
      if(row=='')
      {
        this.router.navigate(['certificate-details-add']);
      } 
      else {
        row.certificatename=this.certificatename;
        row.resourcename=this.resourcename;
        row.type=this.type;
        row.location=this.location;
        row.issuer=this.issuer;
        const navigationExtras: NavigationExtras = {state: {singlerow:row}};
        this.router.navigate(['certificate-details-edit'],navigationExtras);
      }
  }
  parentEventHandlerFunction(valueEmitted:any){
    this.start = ((valueEmitted.page-1) * valueEmitted.itemsPerPage);
    this.pageSize = ((valueEmitted.page) * (valueEmitted.itemsPerPage));
    this.pageNumber=valueEmitted.page;
    this.loadlist(this.start,this.pageSize,this.pageNumber);
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
      this.u.id=this.certificate_id;
      this.u.id=this.deleteid;
      this.u.modified_by="1";
      this.u.action="Deactivate";
      this.service.delete(JSON.stringify(this.u)).subscribe(x=>{
            if(x.msg=="success")
            {
              this.loadlist(this.start,this.pageSize,this.pageNumber);
            }
            else {
              alert("Error occurred hence failed to delete the record."+x);
            }
      });
    }
  }
}
