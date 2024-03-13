import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CertificateViewComponent } from './components/certificate-view/certificate-view.component';

@NgModule({
  declarations: [AppComponent, CertificateViewComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
