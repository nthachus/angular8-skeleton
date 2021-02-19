import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Subscription } from 'rxjs';
import { orderBy } from 'lodash';

import { environment } from '../../../environments/environment';
import { Logger } from '../../shared/logger';
import { AuthService } from '../../shared/services/auth.service';
import { SortEvent } from '../../shared/components/sortable/sortable.component';
import { UserFile, UserFileService } from '../services/user-file.service';

@Component({
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy {
  fileList: UserFile[];
  isTrash: boolean;

  sortState: SortEvent | undefined;
  private fileListOrg: UserFile[];

  private tokenParam: string | undefined;
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
          this.fileList = this.fileListOrg = orderBy(data.files, 'id');
          this.sortState = this.fileList && this.fileList.length ? {} : undefined;
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
    if (typeof this.tokenParam !== 'string') {
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

  sortFileList(event: SortEvent): void {
    Logger.debug('sortFileList', event);

    const fields = Object.keys(event);
    const orders = fields.map(column => event[column]);

    this.fileList = fields.length ? orderBy(this.fileListOrg, fields, orders) : this.fileListOrg;
  }
}
