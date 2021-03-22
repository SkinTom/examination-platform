import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MustMatch } from '../register/register.component';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: User;
  firstName: string;
  lastName: string;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideNewPasswordRepeat = true;
  changePasswordForm: FormGroup;

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
    });

    this.initializeForm();
  }

  initializeForm(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPasswordRepeat: ['', Validators.required]
    }, {
      validators: MustMatch('newPassword', 'newPasswordRepeat')
    });
  }

  get f() { return this.changePasswordForm.controls; }

  updateAccount(): void {
    this.userService.updateAccount(this.firstName, this.lastName, this.user).subscribe(data => {
      console.log(data);
      this._snackBar.open('Zaktualizowano dane konta!', 'Sukces', {
        duration: 2000,
      })
    },
    error => {
      this._snackBar.open('Aktualizacja danych sie nie powiodła!', 'Niepowodzenie', {
        duration: 2000,
      })
    });
  }

  changePassword(): void {
    let currPass = this.f.currentPassword.value;
    let newPass = this.f.newPassword.value;
    this.userService.updatePassword(this.user, currPass, newPass).subscribe(data => {
      this._snackBar.open('Zaktualizowano hasło!', 'Sukces', {
        duration: 2000,
      })
    },
    error => {
      this._snackBar.open('Podane hasło nie jest zgodne z obecnym hasłem', 'Niepowodzenie', {
        duration: 2000,
      })
    })
  }

}
