import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { TokenService } from 'src/app/services/auth-services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  onLogin(): void {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.tokenService.saveUser(res);
        this.loginForm.reset()
        this.router.navigate(['/'])
        this.toastr.success('Your logged in.', 'Welcome Back')
      },
      error: (err) => {this.toastr.error('Incorrect username or password.', 'Error'), console.log("i'm in error section")},
    });
  }

  ngOnInit(): void {}
}
