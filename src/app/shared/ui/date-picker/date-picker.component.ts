import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { skipWhile, skip } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'ui-date-picker',
  styleUrls: ['./date-picker.component.scss'],
  templateUrl: './date-picker.component.html'
})
export class UIDatePickerComponent {
  @Input() show = false;
  @Input() set selected (value: string) {
    const selectedDate = moment(value);

    if (selectedDate.isValid()) {
      this.month = selectedDate.clone().date(1);
      this.selectedDate = selectedDate;
    } else {
      this.month = moment().date(1);
    }
  }
  @Output() dateClicked = new EventEmitter<string>();
  selectedDate: moment.Moment;
  selectedMonth: string;
  month: moment.Moment;
  weeks: Array<moment.Moment[]>;
  subscription: Subscription;
  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    e.stopPropagation();
  }

  open() {
    this.show = true;
    this.createWeeks(this.month);

    this.subscription = fromEvent(document, 'click')
      .pipe(
        skipWhile(() => !this.show),
        skip(1)
      )
      .subscribe(this.close.bind(this));
  }

  close() {
    this.show = false;
    this.subscription.unsubscribe();
  }

  onClickChangeMonth(e: Event, value: string) {
    e.preventDefault();

    if (value === 'prev') {
      this.month.subtract(1, 'month');
      this.createWeeks(this.month);
    } else if (value === 'next') {
      this.month.add(1, 'month');
      this.createWeeks(this.month);
    }
  }

  onClickSelectDate(date: moment.Moment) {
    this.selectedDate = date;

    this.dateClicked.emit(
      this.selectedDate.format('M/D/YY')
    );

    this.close();
  }

  createWeeks(month: moment.Moment) {
    const currentMonth = month.clone();
    const total = month.daysInMonth();
    this.weeks = [];

    let week;
    let i = 1;
    while (i <= total) {
      if (!week) { week = []; }
      const date = currentMonth.clone();

      if (date.day() === 0 && week.length > 0) {
        this.weeks.push(week);
        week = [date];
      } else {
        week.push(date);
      }

      ++i;
      currentMonth.date(i);
    }

    if (week.length > 0) { this.weeks.push(week); }
  }
}
