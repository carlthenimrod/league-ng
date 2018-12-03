import { Component, OnChanges, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2 } from '@angular/core';

import { Division } from '@app/models/league';
import { Team } from '@app/models/team';

@Component({
  selector: 'app-admin-droppable',
  templateUrl: './admin-droppable.component.html',
  styleUrls: ['./admin-droppable.component.scss']
})
export class AdminDroppableComponent implements OnChanges {

  @Input() dragged: { el: Element, item: Division|Team };
  @Input() dropTarget: Division|Team;
  @Output() dropped: EventEmitter<string> = new EventEmitter();
  last: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnChanges() {
    // check if last
    this.last = this.renderer.nextSibling(this.el.nativeElement) ? false : true;
  }

  @HostListener('dragenter', ['$event']) onDragEnter($event: DragEvent) {
    const el: Element = <Element>$event.target;

    if (!this.isAllowed(el)) { return; }

    this.renderer.addClass(el, 'selected');

    $event.preventDefault();
  }

  @HostListener('dragover', ['$event']) onDragOver($event: DragEvent) {
    const el: Element = <Element>$event.target;

    if (!this.isAllowed(el)) { return; }

    $event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event: DragEvent) {
    this.renderer.removeClass(<Element>$event.target, 'selected');

    $event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop($event: DragEvent) {
    const el: Element = <Element>$event.target;

    if (el.classList.contains('drop-before')) {
      this.dropped.emit('before');
    } else if (el.classList.contains('drop-in')) {
      this.dropped.emit('in');
    } else if (el.classList.contains('drop-after')) {
      this.dropped.emit('after');
    }

    this.renderer.removeClass($event.target, 'selected');

    $event.preventDefault();
  }

  isAllowed(el: Element) {
    // can't drop on-self
    if (this.dragged.item._id === this.dropTarget._id) { return false; }

    // if previous sibling, can't drop before
    if (this.dragged.el === this.el.nativeElement.previousSibling) { return false; }

    // check type
    if (this.isDivision(this.dragged.item)) { // division

    } else { // team
      if (el.classList.contains('drop-in')) { return false; }
    }

    return true;
  }

  isDivision(type: Team|Division): type is Division {
    return (<Division>type).teams !== undefined;
  }
}
