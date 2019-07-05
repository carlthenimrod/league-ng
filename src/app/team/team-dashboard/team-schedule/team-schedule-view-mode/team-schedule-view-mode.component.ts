import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-team-schedule-view-mode',
  templateUrl: './team-schedule-view-mode.component.html',
  styleUrls: ['./team-schedule-view-mode.component.scss']
})
export class TeamScheduleViewModeComponent implements OnInit {
  @Output() viewSelect: EventEmitter<string> = new EventEmitter();
  selectedView: string = 'list';

  constructor() { }

  ngOnInit() {
  }

  onClickEmitView(view: string) {
    if (view === this.selectedView) { return; }

    this.selectedView = view;
    this.viewSelect.emit(view);
  }
}
