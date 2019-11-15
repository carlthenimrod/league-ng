import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-modal-place-permit',
  styleUrls: ['./admin-modal-place-permit.component.scss'],
  templateUrl: './admin-modal-place-permit.component.html'
})
export class AdminModalPlacePermitComponent implements OnInit, OnDestroy {
  permitForm = this.fb.group({
    toggle: ['single', Validators.required],
    date: this.fb.group({
      start: ['']
    }, { validators: Validators.required }),
    time: this.fb.group({
      start: [''],
      end: ['']
    }, { validators: Validators.required })
  });
  unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.permitForm.get('toggle').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.updateForm.bind(this));
  }

  updateForm(value: string) {
    const dateGroup = this.permitForm.get('date') as FormGroup;

    if (value === 'single') {
      dateGroup.removeControl('end');
    } else if (value === 'multi') {
      dateGroup.setControl('end', this.fb.control(''));
    }
  }

  onSubmit() {
    console.log(this.permitForm.value);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
