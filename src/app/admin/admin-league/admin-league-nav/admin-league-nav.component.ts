import { Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, ElementRef, Renderer2, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-admin-league-nav',
  templateUrl: './admin-league-nav.component.html',
  styleUrls: ['./admin-league-nav.component.scss']
})
export class AdminLeagueNavComponent implements AfterViewInit {
  @Input() selected: string;
  @Output() select = new EventEmitter<string>();
  @ViewChild('underline', { static: true }) underline: ElementRef;
  @ViewChildren('linkList') linkList: QueryList<ElementRef>;
  links = ['overview', 'schedule'];

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    const first = (this.linkList.first.nativeElement as HTMLElement);
    this.moveUnderline(first);
  }

  onClick(event: Event, value: string) {
    const clicked = (event.target as HTMLElement);
    this.moveUnderline(clicked);

    this.select.emit(value);
  }

  moveUnderline(el: HTMLElement) {
    const underline = (this.underline.nativeElement as HTMLElement);

    this.renderer.setStyle(underline, 'width', `${el.offsetWidth}px`);
    this.renderer.setStyle(underline, 'left', `${el.offsetLeft}px`);
  }
}
