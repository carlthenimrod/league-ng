import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';

import { TeamService } from './team.service';
import { TeamSocketService } from './team-socket.service';
import { Team, Message } from '@app/models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamFeedService implements OnDestroy {
  api: string = environment.api;

  team: Team;
  teamSub: Subscription;

  constructor(
    private http: HttpClient,
    private teamService: TeamService,
    private teamSocket: TeamSocketService
  ) {
    this.teamSub = this.teamService
      .teamListener().subscribe((team: Team) => this.team = team);
  }

  send(message: Message) {
    const url = this.api + `teams/${this.team._id}/feed`;

    return this.http.post(url, message)
      .pipe(
        tap((newMessage: Message) => {
          this.teamSocket.feed(this.team._id, 'new', newMessage);
        })
      );
  }

  isTyping(typing: boolean) {
    this.teamSocket.typing(this.team._id, typing);
  }

  ngOnDestroy() {
    this.teamSub.unsubscribe();
  }
}
