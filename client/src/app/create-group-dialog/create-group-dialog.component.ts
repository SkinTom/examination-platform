import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../group.service';
import { UserGroup } from '../user-group';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent implements OnInit {

  group: UserGroup = new UserGroup();

  constructor(private dialogRef: MatDialogRef<CreateGroupDialogComponent>, private groupService: GroupService) { }

  ngOnInit(): void {
  }

  saveGroup(): void {
    this.groupService.createGroup(this.group).subscribe(data => {
      console.log(data);
    },
    error => console.log(error));
  }

  close(): void {
    this.dialogRef.close();
  }
}
