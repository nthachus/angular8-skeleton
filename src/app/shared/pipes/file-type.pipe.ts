import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileType' })
export class FileTypePipe implements PipeTransform {
  private static EXT_MAP: Array<[string, RegExp]> = [
    ['image', /^bmp|gif|ico|jpe?g|png|tiff?|svg|ai|psd|webp$/],
    ['pdf', /^pdf$/],
    ['word', /^docx?|odt|rtf|wpd$/],
    ['powerpoint', /^pptx?|pps|odp$/],
    ['excel', /^xls[xm]?|ods$/],
    ['audio', /^ac[3m]|aif|a[af]c|ape|cda|m4a|midi?|mp[3a]|og[ag]|wave?|weba|wma|mka|flac$/],
    ['video', /^3g[2p]|avi|flv|h264|m4v|mkv|mov|mp4|mpe?g|ogv|rm|vob|wmv|ts|webm$/],
    ['archive', /^tar|[gx]z|tgz|zip|rar|7z|arj|lzma|bz2?|jar|cab|deb|cpio|rpm$/],
    ['code', /^css|html?|xml|asm|[cfjt]s|[rv]b|p[ly]|php|s[ac]ss|less|[pb]as|cc?|s?h|[ch]pp|java$/],
    ['text', /^te?xt|csv|log|tex|md$/]
  ];

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

      for (const [type, pattern] of FileTypePipe.EXT_MAP) {
        if (pattern.test(ext)) {
          return prepend + type;
        }
      }
    }

    return !prepend ? null : '';
  }
}
