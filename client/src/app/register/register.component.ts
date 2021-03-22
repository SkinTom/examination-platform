import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { RegisterService } from './register.service';

export function MustMatch(fieldName: string, matchingFieldName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[fieldName];
    const matchingControl = formGroup.controls[matchingFieldName];

    if(matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if(control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}  

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submit = false;
  user: User = new User();
  hidePassword = true;
  hideConfirmPassword = true;
  users: User[] = [];
  usernames: string[] = [];

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router, private authenticationService: AuthService, private userService: UserService) {
    if(authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/exams']);
    }
   }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.users.forEach(user => {
        this.usernames.push(user.username.toLowerCase());
      });
    })
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group ({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required], [this.usernameValidator()]],
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required] 
    }, {
      validators: [MustMatch('password', 'confirmPassword')]
    });
  }

  get f() { return this.registerForm.controls; }

  usernameAlreadyExists(username: string): Observable<boolean> {
    return of(this.usernames.includes(username.toLowerCase()));
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usernameAlreadyExists(control.value).pipe(
        map(res => {
          return res ? { usernameExists: true } : null;
        })
      );
    };
  }

  handleRegister() {
    this.submit = true;
    this.user.firstName = this.f.firstName.value;
    this.user.lastName = this.f.lastName.value;
    this.user.username = this.f.username.value;
    // this.user.email = this.f.email.value;
    this.user.password = this.f.password.value;
    this.user.active = true;

    this.registerService.createUser(this.user).subscribe(data => {
      console.log(data);
    },
    error => console.log(error));
    
    this.router.navigate(['/login']);
  }
}
