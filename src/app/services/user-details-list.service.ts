import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paging } from '../Models/paging.model';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserDetailsListService {
  private API_URL= environment.API_URL;
  private AAPI_URL= environment.AAPI_URL;
  private _url=this.API_URL+"UserDetails";
  private r_url=this.AAPI_URL+"UserDetails";
  reqheader =new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  });
  constructor(private http:HttpClient) { }
  getUserList(pg:Paging,user_id:number,user_name:string,role_name:string) {
    let params = new HttpParams();
    params = params.append('user_id', user_id);
    params = params.append('user_name', user_name);
    params = params.append('role_name', role_name);
    // params = params.append('start', pg.start);
    // params = params.append('pageSize', pg.pageSize);
    // params = params.append('pageNumber', pg.pageNumber);
    return this.http.get<any>(this.r_url,{ headers: this.reqheader,params:params });
  }
  saveEdit(userDetails:any) {
    return this.http.post<any>(this.r_url,JSON.stringify(userDetails),{ headers: this.reqheader });
  }
  deleteuser(json:any){
    return this.http.patch<any>(this.r_url,json,{ headers: this.reqheader });
  }
}
