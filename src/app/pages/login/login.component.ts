import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ,RouterLink , TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
  
    isLoading:boolean= false
    msgError:string = ""
    success:string = "" 
  
    loginForm:FormGroup = new FormGroup({
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
    },)
  
    submitForm():void{
      if(this.loginForm.valid){
        this.isLoading = true 
        this.authService.sendLoginForm(this.loginForm.value).subscribe({
          next:(res)=>{
            if(res.message === 'success'){
              //1)save token
              localStorage.setItem("token",res.token)
              
              //2)get user data
              this.authService.getUserData()
              
              //3)navigate to home
              this.router.navigate(['/home'])
              this.success = res.message
            }
            this.isLoading = false
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err);
            this.msgError =  err.error.message
            this.isLoading = false
          }
        })
      }else{
        this.loginForm.markAllAsTouched()
      }
    }
}
