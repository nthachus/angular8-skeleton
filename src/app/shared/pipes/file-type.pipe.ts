import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileType' })
export class FileTypePipe implements PipeTransform {
  private static EXT_MAP: Record<string, RegExp> = {
    image: /^ico|gif|jpe?g|png|tiff?|ai|psd$/,
    pdf: /^pdf$/,
    word: /^docx?$/,
    powerpoint: /^pptx?$/,
    excel: /^xlsx?$/,
    audio: /^aac|mp3|ogg|wma|wav|flac$/,
    video: /^3gp|avi|flv|mkv|mov|mp4|wmv|webm$/,
    archive: /^tar|[gx]z|tgz|zip|rar|7z|bz2?|cab$/,
    code: /^css|html?|[cjt]s|[rv]b|p[ly]|php|s[ac]ss|pas|c|h|cpp|java$/,
    text: /^txt|csv$/
  };

  transform(filename: any, prepend: string = ''): string | null {
    let ext: string | null = null;
    if (filename) {
      const i = (filename = `${filename}`).lastIndexOf('.');
      if (i >= 0) {
        ext = filename.substr(i + 1);
      }
    }

    if (ext) {
      ext = ext.toLowerCase();

      for (const [type, pattern] of Object.entries(FileTypePipe.EXT_MAP)) {
        if (pattern.test(ext)) {
          return prepend + type;
        }
      }
    }

    return !prepend ? null : '';
  }
}
