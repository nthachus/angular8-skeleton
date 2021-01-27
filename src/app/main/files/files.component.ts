import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Logger } from '../../shared/logger';
import { AuthService } from '../../shared/services/auth.service';
import { UserFile, UserFileService } from '../services/user-file.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  fileList: UserFile[];
  private readonly tokenParam: string;

  constructor(private fileService: UserFileService) {
    this.tokenParam = encodeURIComponent(AuthService.currentToken() || '');
  }

  ngOnInit(): void {
    this.fileService.search().subscribe(
      data => {
        this.fileList = data.files;
      },
      err => {
        Logger.warn(err.message || err);
      }
    );
  }

  downloadLink(file: UserFile): string {
    return `${environment.apiBaseUrl}file/${file.id}/download?token=${this.tokenParam}`;
  }

  deleteFile(file: UserFile): void {
    Logger.log('deleteFile', file);

    const i = this.fileList.indexOf(file);
    if (i >= 0) {
      this.fileList.splice(i, 1);
    }
  }
}
