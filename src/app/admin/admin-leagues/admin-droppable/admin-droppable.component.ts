import { Component, Input, Output, EventEmitter, ViewChild, HostListener, ElementRef, Renderer2, Host } from '@angular/core';

import { Division } from '@app/models/league';
import { Team } from '@app/models/team';

@Component({
  selector: 'admin-droppable',
  templateUrl: './admin-droppable.component.html',
  styleUrls: ['./admin-droppable.component.scss']
})
export class AdminDroppableComponent {

  @Input() dragged: { el: Element, item: Division|Team };
  @Input() dropTarget: Division|Team;
  @Input() last = false;
  @Output() dropped: EventEmitter<string> = new EventEmitter();
  @ViewChild('dropBefore', { static: false }) dropBefore: ElementRef;
  @ViewChild('dropIn', { static: false }) dropIn: ElementRef;
  @ViewChild('dropAfter', { static: false }) dropAfter: ElementRef;
  counter = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('dragenter') onHostEnter() {
    this.renderer.addClass(this.el.nativeElement, 'dragging-over');
  }

  onDragEnter($event: DragEvent, position: string) {
    this.counter++;

    // remove selected
    this.removeSelected();

    if (!this.isAllowed(position)) { return; }

    // add selected
    this.addSelected(position);

    $event.preventDefault();
  }

  onDragOver($event: DragEvent, position: string) {
    if (!this.isAllowed(position)) { return; }

    $event.preventDefault();
  }

  onDragLeave($event: DragEvent) {
    this.counter--;

    if (this.counter === 0) {
      // left element
      this.renderer.removeClass(this.el.nativeElement, 'dragging-over');

      // remove selected
      this.removeSelected();
    }

    $event.preventDefault();
  }

  onDrop($event: DragEvent, position: string) {
    if (position === 'before') {
      this.dropped.emit('before');
    } else if (position === 'in') {
      this.dropped.emit('in');
    } else if (position === 'after') {
      this.dropped.emit('after');
    }

    this.removeSelected();
    this.counter = 0;

    $event.preventDefault();
  }

  addSelected(position) {
    if (position === 'before') {
      this.renderer.addClass(this.dropBefore.nativeElement, 'selected');
    } else if (position === 'in') {
      this.renderer.addClass(this.dropIn.nativeElement, 'selected');
    } else if (position === 'after') {
      this.renderer.addClass(this.dropAfter.nativeElement, 'selected');
    }
  }

  removeSelected() {
    this.renderer.removeClass(this.dropBefore.nativeElement, 'selected');
    this.renderer.removeClass(this.dropIn.nativeElement, 'selected');

    if (this.last) {
      this.renderer.removeClass(this.dropAfter.nativeElement, 'selected');
    }
  }

  isAllowed(position: string) {
    // can't drop on-self
    if (this.dragged.item._id === this.dropTarget._id) { return false; }

    // can't drop division in team
    if (this.isDivision(this.dragged.item)) {
      if (!this.isDivision(this.dropTarget)) { return false; }
    } else {
      // can only drop team inside division, not before or after
      if (this.isDivision(this.dropTarget)) {
        if (position !== 'in') { return false; }
      }
    }

    // if target is a team, can't drop-in
    if (!this.isDivision(this.dropTarget)) {
      if (position === 'in') { return false; }
    }

    return true;
  }

  isDivision(type: Team|Division): type is Division {
    return (<Division>type).teams !== undefined;
  }
}
