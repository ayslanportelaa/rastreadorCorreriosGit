import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  cToDate(str: string) {
    const data = new Date(str);
    return data;
}

  date2DMYTime(d: Date) {
    if (typeof d === 'string') {
        d = this.cToDate(d);
    }

    if (d.getFullYear() == 1900) return '';

    const retorno =
        ('00' + d.getDate()).slice(-2) + '/' +
        ('00' + (d.getMonth() + 1)).slice(-2) + '/' +
        d.getFullYear() + ' ' +
        ('00' + d.getHours()).slice(-2) + ':' +
        ('00' + d.getMinutes()).slice(-2) + ':' +
        ('00' + d.getSeconds()).slice(-2);
    return retorno;
}
}
