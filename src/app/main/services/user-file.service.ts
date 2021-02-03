import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

export interface UserFile {
  id: number;
  name: string;
  size: number;
  media_type?: string;
  extra: Record<string, any>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SearchResult {
  files: UserFile[];
  dirs: string[];
}

@Injectable()
export class UserFileService {
  constructor(private http: HttpClient) {}

  search(trash: boolean = false): Observable<SearchResult> {
    return this.http.get<any>(`${environment.apiBaseUrl}file/search${trash ? '?deleted' : ''}`).pipe(
      map(res => {
        if (!res || !res.files) {
          throw res;
        }

        return res as SearchResult;
      })
    );
  }

  delete(fileId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}file/${fileId}`);
  }

  undelete(fileId: number): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}file/${fileId}/undelete`);
  }
}
