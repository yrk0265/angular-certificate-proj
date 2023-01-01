import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,  
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators'; 
import { throwError } from 'rxjs';
import { Router } from '@angular/router'
@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  reqheader:any;
  constructor(private router: Router) {
    if(localStorage.getItem("token"))
    {
      this.reqheader =new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      });
    }  
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("intercepted request ... ");
        //clone the request to add the new header.
        //const authReq = req.clone({ headers: req.headers.set("Token", localStorage.getItem("Token")) });
        //console.log("Sending request with new header now ...");
        //send the newly created request
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                         this.router.navigate(['']);
                    }
                    if(err.status==502){
                       console.log(err.error.Message); 
                    }
                }
                return throwError(err);
        }) as any);
  }
}
