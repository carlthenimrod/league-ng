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
  searchUserForm: FormGroup;
  sendInviteForm: FormGroup;
  invited: boolean;
  teamMember: boolean;
  user: User;
  searchComplete: boolean = false;
  @Input() team: Team;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('email', { static: false }) email: ElementRef;
  @HostBinding('@lightbox') lightbox;

  get emailCtrl() {
    return this.searchUserForm.get('email');
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
    this.searchUserForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]]
    });

    this.sendInviteForm = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    <HTMLElement>(this.email.nativeElement).focus();
  }

  onClickInside($event: Event) {
    $event.stopPropagation();
  }

  onFocus() {
    if (this.user) { this.user = null; }
    this.searchComplete = false;
  }

  onSubmitSearchUser() {
    if (!this.searchUserForm.valid) { return; }

    const email = this.searchUserForm.value.email;

    this.userService.search(email).subscribe((user: User) => {
      this.user = user;
      this.searchComplete = true;

      if (user) {
        this.teamMember = this.isTeamMember(user);
        this.invited = this.isInvited(user);
      }
    });
  }

  onSubmitSendInvite() {
    if (!this.sendInviteForm.valid) { return; }

    const {first, last} = this.sendInviteForm.value;
    const email = this.searchUserForm.value.email;

    const user: User = {
      email,
      name: { first, last }
    };

    this.teamService.invite(user);
    this.close.emit(true);
  }

  isTeamMember(user: User): boolean {
    if (!this.team.users) { return false; }

    const index = this.team.users.findIndex(u => u._id === user._id);
    return (index !== -1) ? true : false;
  }

  isInvited(user: User): boolean {
    if (!this.team.pending) { return false; }

    const index = this.team.pending.findIndex(u => u._id === user._id);
    return (index !== -1) ? true : false;
  }

  onClickInvite() {
    this.teamService.invite(this.user);
    this.close.emit(true);
  }

  onSwipeup() {
    this.close.emit(true);
  }

  onEnter() {
    <HTMLElement>(this.email.nativeElement).blur();
  }
}
