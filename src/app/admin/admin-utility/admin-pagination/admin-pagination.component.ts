import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-admin-pagination',
  templateUrl: './admin-pagination.component.html',
  styleUrls: ['./admin-pagination.component.scss']
})
export class AdminPaginationComponent implements OnInit, OnChanges {

  @Output() page: EventEmitter<number> = new EventEmitter();
  @Output() perPageChange: EventEmitter<number> = new EventEmitter();
  @Input() label = 'Items';
  @Input() currentPage = 0;
  @Input() totalItems = 0;
  @Input() perPage = 10;

  start: number;
  end: number;
  totalPages: number;

  constructor() { }

  ngOnInit() {
    this.updateData();
  }

  ngOnChanges() {
    this.updateData();
  }

  updateData() {
    this.totalPages = Math.ceil(this.totalItems / this.perPage);

    this.start = (this.currentPage * this.perPage) + 1;

    if ((this.currentPage + 1) >= this.totalPages) {
      this.end = this.totalItems;
    } else {
      this.end = (this.currentPage + 1) * this.perPage;
    }
  }

  onChange($event: MatSelectChange) {
    this.currentPage = 0;
    this.perPage = +$event.value;
    this.updateData();
    this.perPageChange.emit(+$event.value);
  }

  onClickPrev() {
    if (this.currentPage <= 0) { return; }

    --this.currentPage;
    this.updateData();
    this.page.emit(this.currentPage);
  }

  onClickNext() {
    if (this.currentPage >= (this.totalPages - 1)) { return; }

    ++this.currentPage;
    this.updateData();
    this.page.emit(this.currentPage);
  }
}
