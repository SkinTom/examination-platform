import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from '../group.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss']
})
export class AddMemberDialogComponent implements OnInit {

  users: User[]  = [];
  searchResult: Array<any> = [];
  name: string;
  username: string;
  toggle: boolean = false;

  constructor(private dialogRef: MatDialogRef<AddMemberDialogComponent>, 
    private groupService: GroupService, 
    @Inject(MAT_DIALOG_DATA) public data: { groupId: number },
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    })
  }

  addMember(): void {
    this.groupService.addMember(this.data.groupId, this.username).subscribe(data => {
      console.log(data);
      });
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
