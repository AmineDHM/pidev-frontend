import { LoginService } from './../../services/login.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  currentUser: any;
  isLoggedIn = false;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.router.navigate(['/home'])
    }
  }

  onLogin(): void {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.tokenService.saveUser(res);
        this.isLoggedIn = true;
        this.currentUser = this.tokenService.getUser();
        this.loginForm.reset()
        this.router.navigate(['/home']).then(() => window.location.reload())
      },
      error: (err) => console.error(err),
    });
  }
}
