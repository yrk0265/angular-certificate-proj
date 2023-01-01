import { UserListComponent } from './user-list/user-list.component';
import { CertificateDetailsEditComponent } from './certificate-details-edit/certificate-details-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CertificateDetailsComponent } from './certificate-details/certificate-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppComponent } from './app.component';
import { UserListEditComponent } from './user-list-edit/user-list-edit.component';
import { RoledetailsComponent } from './roledetails/roledetails.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { RolelistComponent } from './rolelist/rolelist.component';

//  const routes: Routes = [];
const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'certificate-details', component: CertificateDetailsComponent },
    { path: 'certificate-details-add', component: CertificateDetailsEditComponent},
    { path: 'certificate-details-edit', component: CertificateDetailsEditComponent},
    { path: 'user-list', component: UserListComponent},
    { path: 'user-list-edit', component: UserListEditComponent},
    { path: 'user-list-add', component: UserListEditComponent},
    { path: 'role-list', component: RolelistComponent},
    { path: 'create-roles', component: CreateRoleComponent},
    { path: 'create-role-add', component: CreateRoleComponent}
    
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { 

  }
  export const routingComponent=[AppComponent,RegistrationComponent,CertificateDetailsComponent,LoginComponent,UserListComponent,UserListEditComponent,CreateRoleComponent];