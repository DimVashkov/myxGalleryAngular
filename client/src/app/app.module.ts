import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImageComponent } from './home/image/image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CloudinaryModule } from '@cloudinary/ng';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CLOUDINARY_TOKEN } from './tokens';
import { Cloudinary } from '@cloudinary/url-gen';
import { environment } from 'src/environments/environment';
import { FileUploadComponent } from './home/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CloudinaryModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [{
    provide: CLOUDINARY_TOKEN,
    useValue: new Cloudinary({
      cloud: {
        cloudName: environment.CLOUD_NAME
      }
    })
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
