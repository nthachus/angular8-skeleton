import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-toasts></app-toasts>
  `
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document, //
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'main');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'main');
  }
}
