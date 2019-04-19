import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '@app/services/config.service';
import { Config } from '@app/models/config';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
  config: Config;
  configForm: FormGroup;

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.configService.configListener().subscribe((config: Config) => {
      this.config = config;
      this.configForm = this.fb.group({
        multi: [this.config.multi, Validators.required]
      });
    });
  }

  onSubmit() {
    if (!this.configForm.valid) { return; }

    this.configService.save(this.configForm.value).subscribe();
    this.router.navigateByUrl('admin');
  }

  onCancel() {
    this.router.navigateByUrl('admin');
  }
}
