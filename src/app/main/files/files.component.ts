import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Logger } from '../../shared/logger';
import { AuthService } from '../../shared/services/auth.service';
import { UserFile, UserFileService } from '../services/user-file.service';

@Component({
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy {
  fileList: UserFile[];
  isTrash: boolean;

  private tokenParam: string;
  private routerSub: Subscription;

  constructor(
    private route: ActivatedRoute, //
    readonly translate: TranslateService,
    private fileService: UserFileService
  ) {}

  ngOnInit(): void {
    this.routerSub = this.route.queryParamMap.subscribe(params => {
      this.isTrash = params.has('trash');

      this.fileService.search(this.isTrash).subscribe(
        data => {
          this.fileList = data.files;
        },
        err => {
          Logger.warn(err.message || err);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  downloadLink(file: UserFile): string {
    if (!this.tokenParam && this.tokenParam !== '') {
      this.tokenParam = encodeURIComponent(AuthService.currentToken() || '');
    }

    return `${environment.apiBaseUrl}file/${file.id}/download?token=${this.tokenParam}`;
  }

  deleteFile(file: UserFile): void {
    Logger.log('deleteFile', file);

    const i = this.fileList.indexOf(file);
    if (i < 0) {
      return;
    }

    this.translate.get('Are you sure you want to delete this file?', { value: file.name }).subscribe(s => {
      if (confirm(s)) {
        this.fileService.delete(file.id).subscribe(() => this.fileList.splice(i, 1));
      }
    });
  }

  undeleteFile(file: UserFile): void {
    Logger.log('undeleteFile', file);

    const i = this.fileList.indexOf(file);
    if (i < 0 || !file.deleted_at) {
      return;
    }

    this.fileService.undelete(file.id).subscribe(() => this.fileList.splice(i, 1));
  }
}
