import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Exam } from '../exam';
import { GroupService } from '../group.service';
import { Result } from '../result';
import { ResultService } from '../result.service';
import { User } from '../user';
import { UserGroup } from '../user-group';
import { UserService } from '../user.service';

@Component({
  selector: 'app-share-exam-dialog',
  templateUrl: './share-exam-dialog.component.html',
  styleUrls: ['./share-exam-dialog.component.scss']
})
export class ShareExamDialogComponent implements OnInit {

  groupControl = new FormControl('', Validators.required); 
  groups: UserGroup[];

  group: UserGroup = new UserGroup();
  result: Result = new Result();

  users: User[]  = [];
  searchResult: Array<any> = [];
  name: string;
  username: string;
  toggle: boolean = false;

  constructor(private resultService: ResultService, 
    private groupService: GroupService, 
    public dialogRef: MatDialogRef<ShareExamDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { exam: Exam },
    private _snackBar: MatSnackBar,
    private userService: UserService) { }

  ngOnInit(): void {
    this.groupService.getGroupList().subscribe(data => {
      this.groups = data;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  share(): void {
    this.resultService.createResultByUsername(this.username, this.data.exam.id).subscribe(data => {
      console.log(data);
      this._snackBar.open('Udostępniono egzamin użytkownikowi ' + this.username + '.', 'Sukces', {
        duration: 3000,
        panelClass: ['green-snackbar']
      })
    }, 
    error => {
      this._snackBar.open('Użytkownik o nazwie ' + this.username + ' ma już udostępniony ten egzamin.', 'Niepowodzenie', {
        duration: 3000,
        panelClass: ['mat-warn']
      })
    });
  }

  shareGroup(): void {
    this.group = this.groupControl.value;
    this.result.exam = this.data.exam;
    this.result.completed = false;

    this.group.members.forEach(member => {
      this.result.user = member;  
      this.resultService.createResult(this.result).subscribe();
    });

    this._snackBar.open('Udostępniono wybranej grupie!', 'Sukces', {
      duration: 3000,
    })
  }

  fetchUsers(event: any) {
    if(event.target.value === '') {
      return this.searchResult = [];
    }
    let pattern: string;

    this.searchResult = this.users.filter((user) => {
      pattern = user.firstName + ' ' + user.lastName;
      return pattern.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
    this.username = '';
    this.toggle = false;
  }

  selectUser(username: string, firstName: string, lastName: string): void {
    this.username = username;
    this.name = firstName + ' ' + lastName;
    this.toggle = true;
  }

  close(): void {
    this.dialogRef.close();
  }

}
