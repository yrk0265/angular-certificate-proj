import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Paging } from '../Models/paging.model';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CertificateDetailsService {
  private API_URL= environment.API_URL;
  private AAPI_URL= environment.AAPI_URL;
  private _url=this.API_URL+"CertificateDetails";
  private r_url=this.AAPI_URL+"CertificateDetails";
  reqheader =new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  });
  constructor(private http:HttpClient) { 
  }
  getEditUser(id:number) {
    let params = new HttpParams();
    params = params.append('id',id);
    return this.http.get<any>(this.r_url,{ headers: this.reqheader,params:params });
  }
  search(pg:Paging,certificate_name:string,resource_name:string,type:string,location:string,issuer:string){
    let params = new HttpParams();
    params = params.append('certificate_name', certificate_name);
    params = params.append('resource_name', resource_name);
    params = params.append('type', type);
    params = params.append('location', location);
    params = params.append('issuer', issuer);
    return this.http.get<any>(this.r_url,{ headers: this.reqheader,params:params });
  }
  saveUserEdit(row:any) {
    return this.http.post<any>(this.r_url,JSON.stringify(row),{ headers: this.reqheader });
  }
  delete(json:any) {
    return this.http.patch<any>(this.r_url,json,{ headers: this.reqheader});
  }
}
