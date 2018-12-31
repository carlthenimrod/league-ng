import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-admin-modal-auto-generate',
  templateUrl: './admin-modal-auto-generate.component.html',
  styleUrls: ['./admin-modal-auto-generate.component.scss']
})
export class AdminModalAutoGenerateComponent implements OnInit {
  generateForm: FormGroup;
  triggerText: string;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  get strategy(): AbstractControl { return this.generateForm.get('strategy'); }

  constructor(
    private dialogRef: MatDialogRef<AdminModalAutoGenerateComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.generateForm = this.fb.group({
      strategy: ['week'],
      total: ['', Validators.required],
      per: ['', Validators.required]
    });

    this.generateForm.get('strategy').valueChanges.subscribe(val => {
      if (val === 'date') {
        this.generateForm.removeControl('total');
        this.generateForm.removeControl('per');
        this.generateForm.addControl('start', new FormControl('', Validators.required));
        this.generateForm.addControl('end', new FormControl('', Validators.required));
        this.generateForm.addControl('days', new FormControl(this.days, Validators.required));
        this.updateTriggerText();
      } else {
        this.generateForm.removeControl('start');
        this.generateForm.removeControl('end');
        this.generateForm.removeControl('days');
        this.generateForm.addControl('total', new FormControl('', Validators.required));
        this.generateForm.addControl('per', new FormControl('', Validators.required));
      }
    });
  }

  updateTriggerText(): void {
    const days: string[] = this.generateForm.get('days').value;
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

  onSubmit() {
    if (this.generateForm.valid) {
      this.dialogRef.close(this.generateForm.value);
    }
  }
}
