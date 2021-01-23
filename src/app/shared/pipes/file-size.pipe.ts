import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  private static UNITS = [
    ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  ];

  transform(bytes: any, space: string = ' ', precision: number = 2, kind: number = 0, divisor: number = 1024): string | null {
    if (!bytes) {
      return null;
    }

    const size: number = +bytes;
    if (isNaN(size)) {
      return null;
    }

    const units = FileSizePipe.UNITS[kind];
    const exponent = Math.min(Math.floor(Math.log(size) / Math.log(divisor)), units.length - 1);

    return (size / Math.pow(divisor, exponent)).toFixed(precision) + space + units[exponent];
  }
}
