import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tus, UploadAction, Uploader, UploadState, UploadxOptions, UploadxService } from 'ngx-uploadx';

import { environment } from '../../../environments/environment';
import { Logger } from '../../shared/logger';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly uploads$: Observable<Uploader[]>;
  totalProgress: number;

  private uploadOptions: UploadxOptions = {
    endpoint: `${environment.apiBaseUrl}upload`,
    autoUpload: false,
    chunkSize: 1048576, // 1MB
    // retryConfig: { maxAttempts: 5 },
    token: AuthService.currentToken as () => string, // Bearer token
    uploaderClass: Tus
  };

  constructor(private uploadService: UploadxService) {
    this.uploads$ = this.uploadService.connect(this.uploadOptions);
  }

  ngOnInit(): void {}

  onUpload(state: UploadState): void {
    Logger.log(state);
    this.totalProgress = 0;
  }

  processUpload(action: UploadAction, uploadId?: string): void {
    this.uploadService.control({ action, uploadId });
  }
}
