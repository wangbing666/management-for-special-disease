import { Injectable } from '@angular/core';

import { AOA } from '../_store/static';

@Injectable()
export class CommonService {
  constructor() {
  }

  s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  toArray(list: Array<Object>): AOA {
    let exportTitle = [];
    let exportList = [];
    list.forEach(obj => {
      exportTitle = Object.keys(obj);
      let values = [];
      for (let pro in obj) {
        values.push(obj[pro])
      }
      exportList.push(values);
    });
    exportList.unshift(exportTitle);
    return exportList;
  }
}
