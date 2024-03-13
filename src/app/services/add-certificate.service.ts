import { Injectable } from '@angular/core';
import { ParseCertificatesService } from 'src/app/services/parse-certificates.service';

@Injectable({
  providedIn: 'root',
})
export class AddCertificateService {
  constructor(private parseCertfService: ParseCertificatesService) {}

  public saveToLocalStorage(certBytes: Uint8Array) {
    const formattedCertForLocalStorage = Array.from(certBytes);
    const existingCertificates = JSON.parse(
      localStorage.getItem('certificates') || '[]'
    );
    existingCertificates.push(formattedCertForLocalStorage);
    localStorage.setItem('certificates', JSON.stringify(existingCertificates));
    this.parseCertfService.addNewCertificate$.next('');
  }
}
