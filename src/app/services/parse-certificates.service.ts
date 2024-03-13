import { Injectable } from '@angular/core';
import * as ASN1 from '@lapo/asn1js';
import { Subject } from 'rxjs';
import { ICertificateSimple } from '../interfaces/certificate-simple';

const keyLS = 'certificates';

@Injectable({
  providedIn: 'root',
})
export class ParseCertificatesService {
  public addNewCertificate$ = new Subject();

  constructor() {}

  public getCertificatesFromLocalStorage() {
    const lsData = localStorage.getItem('certificates');
    const validData = [];
    if (lsData) {
      const lsDataToArray = JSON.parse(lsData);
      validData.push(
        ...lsDataToArray.map(
          (certificate: number[]) => new Uint8Array(certificate)
        )
      );
    }
    return validData.map((certificate: any) => ASN1.decode(certificate));
  }

  public getDataForView(): ICertificateSimple[] {
    const certificates: any = this.getCertificatesFromLocalStorage();
    return certificates.map((certificate: any) => {
      const subjectCommonName = this.findProperty(
        certificate.sub[0].sub[5],
        'commonName'
      );
      const issuerCommonName = this.findProperty(
        certificate.sub[0].sub[3],
        'commonName'
      );
      const notBefore = certificate.sub[0].sub[4].sub[0].content();
      const notAfter = certificate.sub[0].sub[4].sub[1].content();
      return { subjectCommonName, issuerCommonName, notAfter, notBefore };
    });
  }

  private findProperty(sub: any, property: string) {
    let result = '';
    sub.sub.forEach((sub: any) => {
      if (sub.sub[0].sub[0].content().includes(property)) {
        result = sub.sub[0].sub[1].content();
      }
    });
    return result;
  }
}
