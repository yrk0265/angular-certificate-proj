import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email!:string;
  ShownHide!:boolean;
  password:string="";
  constructor() { }

  ngOnInit(): void {
  }
  save(mail:string){
    
      //   this.service.saveUserEdit(this.single).subscribe(x=>{
    //     console.log(x);
    //   });
  }
}
