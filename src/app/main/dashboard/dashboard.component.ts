import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tus, UploadAction, Uploader, UploadxOptions, UploadxService, UploadState } from 'ngx-uploadx';

import { environment } from '../../../environments/environment';
import { Logger } from '../../shared/logger';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly uploads$: Observable<Uploader[]>;

  private uploadOptions: UploadxOptions = {
    endpoint: `${environment.apiBaseUrl}upload`,
    autoUpload: true,
    chunkSize: 1048576, // 1MB
    // retryConfig: { maxAttempts: 5 },
    token: AuthService.currentToken as () => string, // Bearer token
    uploaderClass: Tus
  };

  constructor(private uploadService: UploadxService) {
    this.uploads$ = this.uploadService.connect(this.uploadOptions);
  }

  ngOnInit(): void {}

  onUploading(state: UploadState): void {
    Logger.log(state);
  }

  processUpload(action: UploadAction, uploadId?: string): void {
    this.uploadService.control({ action, uploadId });
  }
}
