import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SzamlaDTO } from 'models';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SzamlaService {

  constructor(
    private toastrService: ToastrService,
    private http: HttpClient) { }

  getOne(id: number) {
    return this.http.get<SzamlaDTO>(`/api/szamla/${id}`);
  }

  letoltes(id: number) {
    this.getOne(id).subscribe({
      next: (szamla) => {
        const szamlaFile = this.b64toFile(szamla.pdf, `${szamla.szamlaId}.pdf`, 'application/pdf');
        saveAs(szamlaFile, szamlaFile.name);
      },
      error: (err) => {
        this.toastrService.error(err.error.message, 'Hiba');
      }
    });
  }

  private b64toFile(b64Data: string, filename: string, contentType: string) {
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);

      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var file = new File(byteArrays, filename, { type: contentType });
    return file;
  }
}
