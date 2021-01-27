import { Component, OnInit } from '@angular/core';
import { Tus, UploadAction, UploadState, UploadStatus, UploadxOptions, UploadxService } from 'ngx-uploadx';

import { environment } from '../../../environments/environment';
import { Logger } from '../../shared/logger';
import { AuthService } from '../../shared/services/auth.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalProgress: number | null;

  readonly uploadOptions: UploadxOptions = {
    endpoint: `${environment.apiBaseUrl}upload`,
    autoUpload: false,
    chunkSize: 1048576, // 1MB
    // retryConfig: { maxAttempts: 5 },
    token: AuthService.currentToken as () => string, // Bearer token
    uploaderClass: Tus
  };

  constructor(readonly uploadService: UploadxService, private toastService: ToastService) {}

  ngOnInit(): void {}

  hasUploadState(...states: UploadStatus[]): boolean {
    return (
      !!this.uploadService.queue.length && //
      (!states.length || this.uploadService.queue.some(x => states.indexOf(x.status) >= 0))
    );
  }

  onUpload(state: UploadState): void {
    Logger.log('onUpload', state, this.uploadService.queue.length);

    if (state.status === 'added') {
      this.removeDuplicatedUpload(state.uploadId);
    } else {
      if (state.status === 'error') {
        this.handleUploadError(state);
      }

      this.calculateUploadProgress();
    }
  }

  processUpload(action: UploadAction, uploadId?: string): void {
    this.uploadService.control({ action, uploadId });

    if (action === 'cancel') {
      this.removeUpload(uploadId);
    }
  }

  removeUpload(uploadId?: string): void {
    Logger.info('removeUpload', uploadId);

    if (!uploadId) {
      this.uploadService.queue.splice(0, this.uploadService.queue.length);
    } else {
      const i = this.uploadService.queue.findIndex(x => x.uploadId === uploadId);
      if (i >= 0) {
        this.uploadService.queue.splice(i, 1);
      }
    }
  }

  private removeDuplicatedUpload(uploadId: string): void {
    let i = this.uploadService.queue.length - 1;
    if (i <= 0) {
      return;
    }

    for (let j = 0; j < 2; j++) {
      i = this.uploadService.queue.findIndex((x, k) => k !== i && x.uploadId === uploadId);
      if (i < 0) {
        return;
      }
    }

    Logger.info('removeDuplicatedUpload', uploadId, i);
    this.uploadService.queue.splice(i, 1);
  }

  private handleUploadError(state: UploadState): void {
    this.toastService.showWarning(state.response);
  }

  private calculateUploadProgress(): void {
    const [uploaded, total] = this.uploadService.queue
      .map(x => [0.01 * (x.progress || 0) * x.size, x.size])
      .reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]], [0, 0]);

    this.totalProgress = !total ? null : +((uploaded / total) * 100).toFixed(2);
  }
}
