import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { Permit, Slot } from '@app/models/place';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-modal-time',
  templateUrl: './admin-modal-time.component.html',
  styleUrls: ['./admin-modal-time.component.scss']
})
export class AdminModalTimeComponent implements OnInit {
  timeForm: FormGroup;
  triggerText: string;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  get occurences(): AbstractControl { return this.timeForm.get('occurences'); }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { permit: Permit },
    private dialogRef: MatDialogRef<AdminModalTimeComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.timeForm = this.fb.group({
      occurences: ['single'],
      date: [''],
      time: this.fb.group({
        start: [''],
        end: ['']
      })
    });

    this.timeForm.get('occurences').valueChanges.subscribe(val => {
      if (val === 'single') {
        this.timeForm.removeControl('days');
        this.timeForm.removeControl('dates');
        this.timeForm.addControl('date', new FormControl('', Validators.required));
      } else {
        this.timeForm.removeControl('date');
        this.timeForm.addControl('dates', this.fb.group({
          start: ['', new FormControl('', Validators.required)],
          end: ['', new FormControl('', Validators.required)]
        }));
        this.timeForm.get('dates').updateValueAndValidity();
        this.timeForm.addControl('days', new FormControl(this.days, Validators.required));
        this.updateTriggerText();
      }
    });
  }

  updateTriggerText(): void {
    const days: string[] = this.timeForm.get('days').value;
    let text = '';

    for (let i = 0; i < days.length; i++) {
      const d = days[i];

      if (i > 0) { text += ', '; }

      if (days.length > 2) {
        text += d.charAt(0).toUpperCase();
      } else {
        text += d;
      }
    }

    this.triggerText = text;
  }

  createDate(date, time): Slot {
    const startDate = moment(date);
    const startTime = moment(time.start, 'HH:mm');
    const endTime = moment(time.end, 'HH:mm');

    startDate.set({
      hour: startTime.get('hour'),
      minute: startTime.get('minute')
    });

    const endDate = startDate.clone();
    const duration = startTime.diff(endTime, 'hours');

    if (duration > 0) {
      endDate.add(1, 'd');
      endDate.set({
        hour: endTime.get('hour'),
        minute: endTime.get('minute')
      });
    } else {
      endDate.set({
        hour: endTime.get('hour'),
        minute: endTime.get('minute')
      });
    }

    return {
      start: startDate.toJSON(),
      end: endDate.toJSON()
    };
  }

  createDates(dates, time, days): Slot[] {
    const startDate = moment(dates.start);
    const endDate = moment(dates.end);
    const startTime = moment(time.start, 'HH:mm');
    const endTime = moment(time.end, 'HH:mm');
    const duration = startTime.diff(endTime, 'hours');
    const results: Slot[] = [];

    while (startDate.isSameOrBefore(endDate)) {
      const day = startDate.format('dddd');

      // matched
      if (days.indexOf(day) > -1) {
        const start = startDate.clone();
        start.set({
          hour: startTime.get('hour'),
          minute: startTime.get('minute')
        });

        const end = start.clone();
        if (duration > 0) {
          end.add(1, 'd');
          end.set({
            hour: endTime.get('hour'),
            minute: endTime.get('minute')
          });
        } else {
          end.set({
            hour: endTime.get('hour'),
            minute: endTime.get('minute')
          });
        }

        results.push({
          start: start.toJSON(),
          end: end.toJSON()
        });
      }

      startDate.add(1, 'd');
    }

    return results;
  }

  onSubmit() {
    if (!this.timeForm.valid) { return; }

    const permit: Permit = {...this.data.permit};

    const occurences = this.timeForm.value.occurences;

    if (occurences === 'single') {
      const {date, time} = this.timeForm.value;
      const slot = this.createDate(date, time);
      permit.slots.push(slot);
      this.dialogRef.close(permit);
    } else {
      const {dates, time, days} = this.timeForm.value;
      const slots = this.createDates(dates, time, days);
      permit.slots.push(...slots);
      this.dialogRef.close(permit);
    }
  }
}
