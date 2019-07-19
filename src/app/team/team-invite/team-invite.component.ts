import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Team } from '@app/models/team';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';
import { lightboxTrigger, inviteFormTrigger, userInviteTrigger } from './animations';
import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'app-team-invite',
  templateUrl: './team-invite.component.html',
  styleUrls: ['./team-invite.component.scss'],
  animations: [
    lightboxTrigger, 
    inviteFormTrigger, 
    userInviteTrigger
  ]
})
export class TeamInviteComponent implements OnInit, AfterViewInit {
  inviteForm: FormGroup;
  invited: boolean;
  user: User;
  @Input() team: Team;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('email', { static: false }) email: ElementRef;
  @HostBinding('@lightbox') lightbox;

  get emailCtrl() {
    return this.inviteForm.get('email');
  }

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private userService: UserService
  ) { }

  @HostListener('click') onClickLightbox() {
    this.close.emit(true);
  }

  ngOnInit() {
    this.inviteForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]]
    });
  }

  ngAfterViewInit() {
    const el = this.email.nativeElement as HTMLElement;
    el.focus();
  }

  onClickInside($event: Event) {
    $event.stopPropagation();
  }

  onSubmit() {
    if (!this.inviteForm.valid) { return; }

    const email = this.inviteForm.value.email;

    this.userService.search(email).subscribe((user: User) => {
      this.user = user;

      console.log(this.team);

      if (!this.team.pending) { this.team.pending = []; }
      const index = this.team.pending.findIndex(u => u._id === user._id);
      this.invited = (index !== -1) ? true : false;
    });
  }

  onClickInvite() {
    this.teamService.invite(this.user);
    this.close.emit(true);
  }
}
