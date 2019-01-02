import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LeagueService } from '@app/core/league.service';
import { Group } from '@app/models/league';
import { AdminModalEditGroupComponent } from './admin-modal-edit-group/admin-modal-edit-group.component';
import { gameListToggleTrigger } from './animations';

@Component({
  selector: 'app-admin-game-group',
  templateUrl: './admin-game-group.component.html',
  styleUrls: ['./admin-game-group.component.scss'],
  animations: [gameListToggleTrigger]
})
export class AdminGameGroupComponent implements OnInit {
  @Input() group: Group;
  show = false;

  constructor(
    private dialog: MatDialog,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
  }

  onClickEditGame() {

  }

  onClickEditGroup($event: MouseEvent) {
    $event.stopPropagation();

    const config = new MatDialogConfig();

    config.autoFocus = false;
    config.data = { group: this.group };
    config.maxWidth = '95vw';
    config.restoreFocus = false;
    config.width = '500px';

    const dialogRef = this.dialog.open(AdminModalEditGroupComponent, config);

    dialogRef.afterClosed().subscribe((group: Group) => {
      if (!group) { return; }
      this.leagueService.updateGroup(group);
    });
  }

  onClickDeleteGroup($event: MouseEvent, group: Group) {
    $event.stopPropagation();

    const msg = `Remove ${group.label}?\nWarning: This will also remove all games associated with ${group.label}`;

    if (confirm(msg)) {
      this.leagueService.removeGroup(group);
    }
  }
}
