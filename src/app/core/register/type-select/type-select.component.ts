import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-type-select',
  templateUrl: './type-select.component.html',
  styleUrls: ['./type-select.component.scss']
})
export class TypeSelectComponent implements OnInit {
  @Output() select: EventEmitter<string> = new EventEmitter<string>();
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

  onClickSelectType(type: string) {
    this.select.emit(type);
  }
}
