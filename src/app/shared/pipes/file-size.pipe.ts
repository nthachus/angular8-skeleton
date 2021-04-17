import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  private static UNITS: Array<string[]> = [
    [' B', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'],
    ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    [' Bytes', ' kB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'],
    ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  ];

  transform(sizeInBytes: any, locales?: string, precision: number = 2, formatType: number = 0): string | null {
    if (!sizeInBytes) {
      return null;
    }

    const size: number = +sizeInBytes;
    if (isNaN(size)) {
      return null;
    }

    const units = FileSizePipe.UNITS[formatType];
    const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);

    return Number((size / Math.pow(1024, exponent)).toFixed(precision)).toLocaleString(locales) + units[exponent];
  }
}
