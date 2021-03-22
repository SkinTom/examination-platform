import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { GroupService } from '../group.service';
import { UserGroup } from '../user-group';

@Component({
  selector: 'app-groups-view',
  templateUrl: './groups-view.component.html',
  styleUrls: ['./groups-view.component.scss']
})
export class GroupsViewComponent implements OnInit {

  groups: UserGroup[] = new Array;
  showSpinner = false;

  constructor(private groupService: GroupService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.groupService.getGroupList().subscribe(data => {
      this.groups = data;
      this.showSpinner = false;
    })
  }

  createGroup(): void {
    let dialogRef = this.matDialog.open(CreateGroupDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
