import { Component, Input, OnInit, OnDestroy, ViewChildren, ViewContainerRef, QueryList, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { SocketData } from '@app/models/socket';
import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { TeamSocketService } from '@app/services/team-socket.service';
import { UserCardService } from './user-card.service';


@Component({
  selector: 'app-team-roster',
  styleUrls: ['./team-roster.component.scss'],
  templateUrl: './team-roster.component.html',
  providers: [UserCardService]
})
export class TeamRosterComponent implements OnInit, OnDestroy {
  @Input() team: Team;
  @Input() rosterOpen: boolean;
  @Output() rosterToggle: EventEmitter<boolean> = new EventEmitter();
  @ViewChildren('card', { read: ViewContainerRef }) cards: QueryList<ViewContainerRef>;
  rosterSub: Subscription;

  constructor(
    private teamService: TeamService,
    private teamSocket: TeamSocketService,
    private userCard: UserCardService
  ) {}

  ngOnInit() {
    this.rosterSub = this.teamSocket.roster$().subscribe((data: SocketData) => {
      switch (data.action) {
        case 'update':
          this.teamService.updateUser(data.users);
          break;
      }
    });
  }

  ngOnDestroy() {
    this.rosterSub.unsubscribe();
  }

  onClickRosterToggle() {
    if (this.rosterOpen) {
      this.rosterToggle.emit(false);
    } else {
      this.rosterToggle.emit(true);
    }
  }

  onClick(e, user, i) {
    const viewRef = this.cards.toArray()[i];

    this.userCard.open(user, viewRef);
  }
}
