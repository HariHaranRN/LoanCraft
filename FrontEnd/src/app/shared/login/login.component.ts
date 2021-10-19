import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [{ value: "", disabled: false},[Validators.required]],
      password: [{ value: "", disabled: false},[Validators.required]],
  });
  }

  login(){
    const username = "hariharan";
    const password = "16itr029IT";
    if(this.loginForm.value.userName == username && this.loginForm.value.password == password){
      sessionStorage.setItem("login", "yes");
      this.router.navigate(['dashboard']);
    }else {
      sessionStorage.removeItem("login");
      this.toastr.error("Username or Password is wrong");
    }
    debugger
  }

}
