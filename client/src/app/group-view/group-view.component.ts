import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { GroupService } from '../group.service';
import { UserGroup } from '../user-group';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit, OnChanges {

  @Input() selectedGroup: number;

  group: UserGroup;
  username: string;
  showSpinner = true;

  displayedColumns: string[] = ['num', 'firstName', 'lastName', 'username', 'delete'];

  constructor(private groupService: GroupService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.selectedGroup != null) {
      this.groupService.getGroupById(this.selectedGroup).subscribe(data => {
        this.group = data;
        this.showSpinner = false;
      });
    }
  }

  addMemberDialog(): void {
    let dialogRef = this.matDialog.open(AddMemberDialogComponent, {
      disableClose: true,
      data: { groupId: this.group.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnChanges();
    });
  }

  deleteMember(id: number): void {
    this.groupService.deleteMember(id, this.group.id).subscribe(data => {
      console.log(data);
      this.ngOnChanges();
    });
  }

  deleteGroup(): void {
    this.groupService.deleteGroup(this.group.id).subscribe(data => {
      console.log(data);
    });

    location.reload();
  }
}
