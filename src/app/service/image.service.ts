import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImage(image: any): Observable<any> {
    return this.http.post(AppConstants.baseServer + "/image/upload", image, { responseType: 'text', observe: 'response' });
  }

  uploadImageForEmployee(image: any, id: number): Observable<any> {
    return this.http.put(AppConstants.baseServer + "/employee/upload/" + id, image);
  }

  downloadImage(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/image/download/");
  }

  deleteImage(): Observable<any> {
    return this.http.delete(AppConstants.baseServer + "/image/delete", {responseType: 'text'})
  }
}
