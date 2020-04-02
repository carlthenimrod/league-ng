import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { LoadingService } from './loading/loading.service';
import { TemplateService } from '@app/services/template.service';
import { ScrollService } from '@app/services/scroll.service';

@Component({
  selector: 'ngl-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterViewInit {
  loading: boolean;
  @ViewChild('main', { static: false, read: ElementRef }) main: ElementRef;

  constructor(
    private loadingService: LoadingService,
    private scrollService: ScrollService,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    this.loadingService.loading$
      .subscribe(loading => this.loading = loading);
  }

  ngAfterViewInit() {
    this.templateService.setContainer(this.main);
  }
}
