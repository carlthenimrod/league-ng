import { Component, OnInit, Input, ViewChild, ElementRef, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ProfileImg } from '@app/models/profile-img';
import { mimeType } from '@app/validators/mime-type.validator';

@Component({
  selector: 'app-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.scss']
})
export class ProfileImgComponent implements OnInit, OnChanges {
  @Input() img: string;
  @Output() save: EventEmitter<{file: File, img: ProfileImg}> = new EventEmitter();
  @ViewChild('file') file: ElementRef;
  imgForm: FormGroup;
  imgPreview: ProfileImg;
  loadingImg = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.imgForm = this.fb.group({ img: ['', null, mimeType] });

    this.imgForm.get('img').statusChanges.subscribe(status => {
      if (status !== 'VALID') { return; }
      this.generatePreview(this.imgForm.get('img').value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadingImg = false;
    this.imgPreview = null;
  }

  onFileSelect($event: Event) {
    const img = (<HTMLInputElement>$event.target).files[0];
    this.imgForm.patchValue({ img });
    this.imgForm.updateValueAndValidity();
  }

  onClickCancel() {
    this.imgForm.patchValue({ img: '' });
    this.imgForm.updateValueAndValidity();
    this.file.nativeElement.value = '';
    this.imgPreview = null;
  }

  onClickSave() {
    const img = this.imgForm.get('img');

    if (img.valid && !this.loadingImg) {
      this.loadingImg = true;
      this.save.emit({file: img.value, img: this.imgPreview});
    }
  }

  onPan($event) {
    const {x, y} = this.imgPreview.pos;
    const {deltaX, deltaY} = $event;

    x.current = x.last + deltaX;
    y.current = y.last + deltaY;

    if (x.current < x.max) { x.current = x.max; }
    if (y.current < y.max) { y.current = y.max; }

    if (x.current > 0) { x.current = 0; }
    if (y.current > 0) { y.current = 0; }

    this.position();

    $event.preventDefault();
  }

  onPanEnd($event) {
    const {x, y} = this.imgPreview.pos;
    const {deltaX, deltaY} = $event;

    x.last = x.last + deltaX;
    y.last = y.last + deltaY;

    if (x.last < x.max) { x.last = x.max; }
    if (y.last < y.max) { y.current = y.max; }

    if (x.last > 0) { x.last = 0; }
    if (y.last > 0) { y.last = 0; }

    $event.preventDefault();
  }

  generatePreview(img: File) {
    if (!img) { return; }

    const fr = new FileReader();

    fr.onload = () => {
      this.imgPreview = { el: new Image() };
      this.imgPreview.el.src = <string>fr.result;

      this.imgPreview.el.onload = () => {
        this.imgPreview.loaded = true;
        this.calculate();
      };
    };
    fr.readAsDataURL(img);
  }

  calculate() {
    const {height, width} = this.imgPreview.el;

    if (height >= width) {
      const calcHeight = height * (150 / width);
      const y = ((calcHeight / 2) - 75) * -1;

      this.imgPreview.dimensions = {
        height: calcHeight,
        width: 150
      };

      this.imgPreview.pos = {
        x: {
          current: 0,
          last: 0,
          max: 0
        },
        y: {
          current: y,
          last: y,
          max: (calcHeight - 150) * -1
        }
      };
    } else {
      const calcWidth = width * (150 / height);
      const x = ((calcWidth / 2) - 75) * -1;

      this.imgPreview.dimensions = {
        height: 150,
        width: calcWidth
      };

      this.imgPreview.pos = {
        x: {
          current: x,
          last: x,
          max: (calcWidth - 150) * -1
        },
        y: {
          current: 0,
          last: 0,
          max: 0
        }
      };
    }

    this.position();
  }

  position(): { [key: string]: any } {
    const styles: { [key: string]: any } = {};
    const {x, y} = this.imgPreview.pos;

    styles.height = `${this.imgPreview.dimensions.height}px`;
    styles.width = `${this.imgPreview.dimensions.width}px`;
    styles.transform = `translate(${x.current}px, ${y.current}px)`;

    return styles;
  }
}
