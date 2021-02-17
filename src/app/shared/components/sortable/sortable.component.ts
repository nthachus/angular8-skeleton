import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface SortEvent {
  [key: string]: SortDirection;
}

@Component({
  // tslint:disable-next-line component-selector
  selector: 'sortable-header[column]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./sortable.component.scss']
})
export class SortableComponent {
  @Input() column: string;
  @Output() sort = new EventEmitter<SortEvent>();

  @Input() state: SortEvent;
  @Output() stateChange = new EventEmitter<SortEvent>();

  @HostBinding('class.disabled') get disabled(): boolean {
    return !this.state || !this.column;
  }

  @HostBinding(`class.${SortDirection.ASC}`) get ascending(): boolean {
    return !this.disabled && this.state[this.column] === SortDirection.ASC;
  }

  @HostBinding(`class.${SortDirection.DESC}`) get descending(): boolean {
    return !this.disabled && this.state[this.column] === SortDirection.DESC;
  }

  @HostListener('click') onClick(): void {
    if (this.disabled) {
      return;
    }

    this.rotate();

    this.sort.emit(this.state);
    this.stateChange.emit(this.state);
  }

  private rotate(): void {
    switch (this.state[this.column]) {
      case SortDirection.ASC:
        this.state[this.column] = SortDirection.DESC;
        break;
      case SortDirection.DESC:
        delete this.state[this.column];
        break;
      default:
        this.state[this.column] = SortDirection.ASC;
        break;
    }
  }
}
