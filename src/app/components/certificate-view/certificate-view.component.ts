import { Component, Input } from '@angular/core';
import { ICertificateSimple } from 'src/app/interfaces/certificate-simple';

@Component({
  selector: 'app-certificate-view',
  templateUrl: './certificate-view.component.html',
  styleUrls: ['./certificate-view.component.css']
})
export class CertificateViewComponent {
  @Input() certificate!: ICertificateSimple
}
