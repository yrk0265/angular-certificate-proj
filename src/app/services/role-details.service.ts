import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Paging } from '../Models/paging.model';
@Injectable({
  providedIn: 'root'
})
export class RoleDetailsService {
  private API_URL= environment.API_URL;
  private AAPI_URL= environment.AAPI_URL;
  private _url=this.API_URL+"RoleDetails";
  private r_url=this.AAPI_URL+"RoleDetails";
  reqheader =new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  });
  constructor(private http:HttpClient) { }
  getRoleList(pg:Paging,role_id:number,role_name:string) {
    let params = new HttpParams();
    params = params.append('role_id',role_id);
    params = params.append('role_name',role_name);
    return this.http.get<any>(this.r_url,{ headers: this.reqheader,params:params });
  }
  save(RoleDetails:any) {
    return this.http.post<any>(this.r_url,JSON.stringify(RoleDetails),{ headers: this.reqheader });
  }
  delete(json:any) {
    return this.http.patch<any>(this.r_url,json,{ headers: this.reqheader });
  }
}
