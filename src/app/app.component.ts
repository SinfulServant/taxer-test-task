import { Component, OnInit } from '@angular/core';
import { ParseCertificatesService } from './services/parse-certificates.service';
import { AddCertificateService } from './services/add-certificate.service';
import * as ASN1 from '@lapo/asn1js';
import { ICertificateSimple } from './interfaces/certificate-simple';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public neededCertfData!: ICertificateSimple[];
  public selectedCertificate: number = 0;

  constructor(
    private parseCertfService: ParseCertificatesService,
    private addCertificateService: AddCertificateService
  ) {}

  ngOnInit() {
    this.initDataCertificates();
    this.subscibeOnChangesInLocalStorage();
  }

  private initDataCertificates(): void {
    this.neededCertfData = this.parseCertfService.getDataForView();
    console.log(this.neededCertfData);
  }

  private subscibeOnChangesInLocalStorage(): void {
    this.parseCertfService.addNewCertificate$.subscribe(() => {
      this.neededCertfData = this.parseCertfService.getDataForView();
      this.selectedCertificate = this.neededCertfData.length - 1;
      console.log(this.neededCertfData);
    });
  }

  public selectCertificate(i: number) {
    this.selectedCertificate = i;
  }

  public giveClassForSelecedName(i: number) {
    return i === this.selectedCertificate ? 'selected-name' : '';
  }

  public handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  public handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.upload(file);
  }

  public handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.upload(file);
    }
  }

  public upload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const certBytes = new Uint8Array(reader.result as ArrayBuffer);
      try {
        const decoded: any = ASN1.decode(certBytes);
        this.addCertificateService.saveToLocalStorage(certBytes);
      } catch (error) {
        throw new Error('The certificate is wrong');
      }
    };
    reader.readAsArrayBuffer(file);
  }
}
