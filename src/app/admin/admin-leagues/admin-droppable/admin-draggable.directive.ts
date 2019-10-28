import { Directive, HostListener, ElementRef, Output, OnInit, Renderer2, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appAdminDraggable]'
})
export class AdminDraggableDirective implements OnInit {

  @Output() dragging: EventEmitter<Element> = new EventEmitter();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }

  @HostListener('touchstart', ['$event']) onTouchStart($event) {
    $event.preventDefault();
  }

  @HostListener('touchmove', ['$event']) onTouchMove($event) {
    $event.preventDefault();
  }

  @HostListener('dragstart', ['$event']) onDragStart($event: DragEvent) {
    $event.dataTransfer.setData('text/plain', 'dragging');

    this.dragging.emit(<Element>$event.target);
    this.renderer.addClass(this.el.nativeElement, 'dragging');
  }

  @HostListener('dragend', ['$event']) onDragEnd($event: DragEvent) {
    this.renderer.removeClass(this.el.nativeElement, 'dragging');
  }
}
