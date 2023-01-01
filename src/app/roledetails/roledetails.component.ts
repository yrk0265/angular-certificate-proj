import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Paging } from '../Models/paging.model';
import { RoleDetailsService } from '../services/role-details.service';

@Component({
  selector: 'app-roledetails',
  templateUrl: './roledetails.component.html',
  styleUrls: ['./roledetails.component.css']
})
export class RoledetailsComponent implements OnInit {
  @Input() roleid!:number;
  rolename!:string;
  selected: any=1;
  x:any=[];
  pg = new Paging(); 
  start:number = 0;
  pageSize:number = 10;
  pageNumber:number = 0;
  @Output() valueChange:EventEmitter<any> = new EventEmitter()
  constructor(private router: Router,private service:RoleDetailsService) { }
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist():void {
    let select = document.getElementById("role");
    this.pg.start=this.start;
    this.pg.pageSize = this.pageSize;
    this.pg.pageNumber = this.pageNumber;
    this.service.getRoleList(this.pg,this.roleid,this.rolename).subscribe(x=> {
          this.x=x.data;
          if (this.roleid==undefined)
          {
              this.roleid=this.selected;
              this.modelchange(this.roleid);
          }
    });
  }
  modelchange(change:any):void{
      this.valueChange.emit(change);
  }
  changes(id:number): void {
    this.selected=id;
    this.modelchange(id);
  }
}
