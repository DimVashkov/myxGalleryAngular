import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Images } from './resource.interface';
import { Image } from './image.interface';
import { environment } from 'src/environments/environment';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { CLOUDINARY_TOKEN } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(CLOUDINARY_TOKEN) private cld: Cloudinary) { }

  getImages(cursor = ''): Observable<Images> {
    const params = new HttpParams().set("next_cursor", cursor)
    return this.http.get<Images>(`${environment.API_URL}/`, { params: params });
  }

  uploadImage(file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", environment.UPLOAD_PRESET);
    formData.append("context", "starred=false");

    return this.http.post(`${environment.UPLOAD_URL}/${environment.CLOUD_NAME}/upload`, formData);
  }

  starImage(public_id: string, starred: string): Observable<Object> {
    const params = new HttpParams().set("id", public_id).set("starred", starred);
    return this.http.patch(`${environment.API_URL}/star`, {}, { params: params });
  }

  deleteImage(public_id: string): Observable<Object> {
    const params = new HttpParams().set("id", public_id);
    return this.http.delete(`${environment.API_URL}/`, { params: params });
  }

  transformImages(images: Image[]): Image[] {
    return images.map((image) => ({
      ...image, url: this.cld
        .image(image.public_id)
        .resize(thumbnail().width(400).height(400))
        .toURL()
    }))
  }
}
