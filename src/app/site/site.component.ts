import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class SiteComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document, //
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'site');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'site');
  }
}
