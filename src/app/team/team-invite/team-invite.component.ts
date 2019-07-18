import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { lightboxTrigger, inviteFormTrigger } from './animations';

@Component({
  selector: 'app-team-invite',
  templateUrl: './team-invite.component.html',
  styleUrls: ['./team-invite.component.scss'],
  animations: [lightboxTrigger, inviteFormTrigger]
})
export class TeamInviteComponent implements OnInit, AfterViewInit {
  inviteForm: FormGroup;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('email', { static: false }) email: ElementRef;
  @HostBinding('@lightbox') lightbox = 'open';

  get emailCtrl() {
    return this.inviteForm.get('email');
  }

  constructor(
    private fb: FormBuilder
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

    console.log(email);
  }
}
