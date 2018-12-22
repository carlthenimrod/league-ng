import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terms-form',
  templateUrl: './terms-form.component.html',
  styleUrls: ['./terms-form.component.scss']
})
export class TermsFormComponent implements OnInit {
  @Output() step: EventEmitter<string> = new EventEmitter();
  @Output() accept: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onClickAccept() {
    this.accept.emit(true);
  }

  onClickBack() {
    this.step.emit('back');
  }
}
