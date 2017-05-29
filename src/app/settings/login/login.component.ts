import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../shared/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'kb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  tryLogin(value: any): void {
    const {email, password} = value;
    this.loginService.authByParams(email, password).then(
      res => this.onLoginSuccess(email, password),
      err => this.onLoginError()
    );
  }

  onLoginSuccess(email: string, password: string) {
    this.loginService.saveLogin(email, password);
    this.router.navigate(['../']);
  }

  onLoginError() {
    this.loginForm.reset();
  }

}
