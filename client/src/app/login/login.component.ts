import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  hide=true

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthService) { 
    if(authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/exams']);
    }
  }

  ngOnInit(): void {
    
  }

  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe(result => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.router.navigate(['/exams']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

}
