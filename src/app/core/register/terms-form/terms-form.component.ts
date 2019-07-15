import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terms-form',
  templateUrl: './terms-form.component.html',
  styleUrls: ['./terms-form.component.scss']
})
export class TermsFormComponent implements OnInit {
  @Output() step: EventEmitter<string> = new EventEmitter();
  @Output() accept: EventEmitter<boolean> = new EventEmitter<boolean>();
  termsRead: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onScroll($event: UIEvent) {
    const el = (<HTMLElement>$event.target);
    const height = el.scrollHeight - el.offsetHeight;
    const top = el.scrollTop;
    
    this.termsRead = (height === top) ? true : false;
  }

  onClickAccept() {
    this.accept.emit(true);
  }

  onClickBack() {
    this.step.emit('back');
  }
}
