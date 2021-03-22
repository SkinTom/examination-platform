import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  loginStatus: boolean;
  username: string;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthService) { }

  ngOnInit(): void {
    this.authenticationService.loginStatus.subscribe(data => {
      this.loginStatus = data;
    })

    this.authenticationService.login.subscribe(data => {
      this.username = data;
    });
  }

  handleLogout() {
    this.authenticationService.logout();
    this.router.navigate(["login"]);
  }

  viewRegisterPage() {
    this.router.navigate(["register"]);
  }

  viewLoginPage() {
    this.router.navigate(["login"]);
  }
}
