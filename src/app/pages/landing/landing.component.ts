import { Component, OnInit } from '@angular/core';
import { LoginDto } from 'src/app/@core/dtos/auth/login.dto';
import { AuthService } from 'src/app/@core/data-services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  ngOnInit(): void {
  }
  useremail ='';
  userpassword = '';
  forgotPassword = false
  messages = '';
  submitButtonText = 'Email';
  loginFailed = false;
  constructor(private auth: AuthService, private router: Router){

  }
toggleForgotPassword(){
  this.forgotPassword = !this.forgotPassword
}
  onSubmit(){
    if(!this.forgotPassword)
    {
      const user:LoginDto = {
        email : this.useremail,
        password: this.userpassword
      }
      this.auth.login(user).subscribe((result) =>{
        this.loginFailed = !result.status??false
        if(result.status)
        {
          this.router.navigate(['/dashboard'])
        }
        else{
        }
        this.messages = result.message ??'login unsuccessful';
       });
    }
    else
    {

      this.auth.resetPassword(this.useremail).subscribe((result) =>{
        console.log(result)
        this.messages = result?.message ??'Please check your email';
      });
    }
  }
}
