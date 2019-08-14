import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @HostListener('touchmove', ['$event']) stopScroll($event) {
    $event.preventDefault();
  }

  constructor() { }

  ngOnInit() {
  }
}
