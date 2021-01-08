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
  toasts: ToastData[] = [];

  remove(toast: ToastData): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear(): void {
    this.toasts = [];
  }

  show(message: any, details?: any, options: ToastOptions = {}): void {
    if (details && !Array.isArray(details)) {
      details = [details];
    }
    this.toasts.push({ message, details, ...options });
  }

  error(message: any, details?: any, options: ToastOptions = {}): void {
    this.show(message, details, { className: 'alert-danger', ...options });
  }
}
