import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mediaType' })
export class MediaTypePipe implements PipeTransform {
  private static MIME_MAP: Array<[string, RegExp]> = [
    ['image', /^image\//],
    ['pdf', /^application\/pdf\b/],
    [
      'word',
      /^application\/((vnd\.)?ms-?word|vnd\.(openxmlformats-officedocument\.wordprocessingml|oasis\.opendocument\.text|wordperfect)|rtf)\b/
    ],
    [
      'powerpoint',
      /^application\/((vnd\.)?ms-?powerpoint|vnd\.(openxmlformats-officedocument\.presentationml|oasis\.opendocument\.presentation))\b/
    ],
    ['excel', /^application\/((vnd\.)?ms-?excel|vnd\.(openxmlformats-officedocument\.spreadsheetml|oasis\.opendocument\.spreadsheet))\b/],
    ['audio', /^audio\//],
    ['video', /^video\//],
    [
      'archive',
      /^application\/(g?zip|java-archive|vnd\.ms-?cab|x-([7x]z|arj|[rtx]ar|cpio|gtar|lzip|lzma|bzip2|archive|iso9660|compress))\b/
    ],
    ['code', /^(text\/(javascript|css|html)|application\/(javascript|xhtml\+xml|x-(c?sh|httpd-php)))\b/],
    ['text', /^text\//]
  ];

  transform(mimeType: any, prepend: string = ''): string | null {
    if (mimeType) {
      mimeType = `${mimeType}`.toLowerCase();

      for (const [type, pattern] of MediaTypePipe.MIME_MAP) {
        if (pattern.test(mimeType)) {
          return prepend + type;
        }
      }
    }

    return !prepend ? null : '';
  }
}
