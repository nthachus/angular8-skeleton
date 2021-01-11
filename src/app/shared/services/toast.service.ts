import { Injectable } from '@angular/core';

export interface ToastOptions {
  className?: string;
  delay?: number;
}

interface ToastData extends ToastOptions {
  message: any;
  details: any[];
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts: ToastData[] = [];

  removeAt(index: number): void {
    if (index >= 0) {
      this.toasts.splice(index, 1);
    }
  }

  remove(toast: ToastData): void {
    this.removeAt(this.toasts.indexOf(toast));
  }

  clear(): void {
    this.toasts.splice(0, this.toasts.length);
  }

  show(message: any, details?: any, options: ToastOptions = {}): void {
    if (details && !Array.isArray(details)) {
      details = [details];
    }
    this.toasts.push({ message, details, ...options });
  }

  showError(message: any, details?: any, options: ToastOptions = {}): void {
    this.show(message, details, { className: 'toast-danger alert-danger', ...options });
  }

  showInfo(message: any, details?: any, options: ToastOptions = {}): void {
    this.show(message, details, { className: 'toast-info alert-info', ...options });
  }

  showSuccess(message: any, details?: any, options: ToastOptions = {}): void {
    this.show(message, details, { className: 'toast-success alert-success', ...options });
  }

  showWarning(message: any, details?: any, options: ToastOptions = {}): void {
    this.show(message, details, { className: 'toast-warning alert-warning', ...options });
  }
}
