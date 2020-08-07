import {Component} from '@angular/core';

import * as JSZip from 'jszip';
import * as JSZipUtils from '../assets/script/jszip-utils.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public urls = [
    'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
    'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_500_kB.pdf',
    'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf'
  ];

  downloadAsZip(): void {
    let count = 0;
    const zip = new JSZip();

    this.urls.forEach((url) => {
      const filename = url.split('/')[url.split('/').length - 1];

      JSZipUtils.getBinaryContent(url, (err, data) => {
        if (err) {
          throw err;
        }

        zip.file(filename, data, {binary: true});
        count++;

        if (count === this.urls.length) {
          zip.generateAsync({type: 'blob'}).then((content) => {
            const objectUrl: string = URL.createObjectURL(content);
            const link: any = document.createElement('a');

            link.download = 'sample-pdf-files.zip';
            link.href = objectUrl;
            link.click();
          });
        }
      });
    });
  }

}
