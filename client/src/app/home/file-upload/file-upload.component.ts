import { Component, EventEmitter, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HomeService } from '../home.service';
import { Image } from '../image.interface';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  fileName = '';

  @Output() fileUploaded = new EventEmitter<Image>();

  constructor(private homeSvc: HomeService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.homeSvc
        .uploadImage(file)
        .pipe(tap((result) => this.fileUploaded.emit(result as Image)))
        .subscribe();
    }
  }
}
