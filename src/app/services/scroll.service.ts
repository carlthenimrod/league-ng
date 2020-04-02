import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private _renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    rendererFactory: RendererFactory2
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  lock() {
    this._renderer.addClass(this._document.body, 'scroll-lock');
  }

  unlock() {
    this._renderer.removeClass(this._document.body, 'scroll-lock');
  }
}
