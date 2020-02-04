import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { LeagueService } from '@app/services/league.service';
import { League, GameGroup } from '@app/models/league';
import { Game } from '@app/models/game';
import { AdminModalEditGroupComponent } from './admin-modal-edit-group/admin-modal-edit-group.component';
import { AdminModalAddGameComponent } from '../admin-modal-add-game/admin-modal-add-game.component';
import { gameListEnterTrigger, gameToggleTrigger } from './animations';

@Component({
  selector: 'app-admin-game-group',
  templateUrl: './admin-game-group.component.html',
  styleUrls: ['./admin-game-group.component.scss'],
  animations: [gameListEnterTrigger, gameToggleTrigger]
})
export class AdminGameGroupComponent implements OnInit {
  @Input() league: League;
  @Input() group: GameGroup;
  show = false;

  constructor(
    private dialog: MatDialog,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
  }

  onClickEditGame(groupId, game) {
    const config = new MatDialogConfig();

    config.autoFocus = false;
    config.data = { league: this.league, game };
    config.maxWidth = '95vw';
    config.restoreFocus = false;
    config.width = '500px';

    const dialogRef = this.dialog.open(AdminModalAddGameComponent, config);

    dialogRef.afterClosed().subscribe((data: {game: Game}) => {
      if (!data) { return; }
      this.leagueService.updateGame(groupId, data.game);
    });
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

    dialogRef.afterClosed().subscribe((group: GameGroup) => {
      if (!group) { return; }
      this.leagueService.updateGroup(group);
    });
  }

  onClickDeleteGroup($event: MouseEvent, group: GameGroup) {
    $event.stopPropagation();

    const msg = `Remove ${group.label}?\nWarning: This will also remove all games associated with ${group.label}`;

    if (confirm(msg)) {
      this.leagueService.removeGroup(group);
    }
  }

  trackById(index: number, game: Game) {
    return game._id;
  }
}
