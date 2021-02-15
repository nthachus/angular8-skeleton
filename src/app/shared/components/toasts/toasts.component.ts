import { Component, HostBinding, OnInit } from '@angular/core';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {
  @HostBinding('class.ngb-toasts')
  readonly wrapperClass = true;

  constructor(readonly toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.clear();
  }
}
