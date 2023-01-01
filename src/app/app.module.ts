import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule,routingComponent } from './app-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CertificateDetailsComponent } from './certificate-details/certificate-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginService } from './services/loginservice.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CertificateDetailsEditComponent } from './certificate-details-edit/certificate-details-edit.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationComponent } from './pagination/pagination.component';
import { RoledetailsComponent } from './roledetails/roledetails.component';
import { HeaderComponent } from './header/header.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { InterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { RolelistComponent } from './rolelist/rolelist.component';



@NgModule({
  declarations: [
    routingComponent,
    UserListComponent,
    ForgotPasswordComponent,
    CertificateDetailsEditComponent,
    PaginationComponent,
    RoledetailsComponent,
    HeaderComponent,
    LoginHeaderComponent,
    CreateRoleComponent,
    RolelistComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    PaginationModule 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi: true
  },LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
