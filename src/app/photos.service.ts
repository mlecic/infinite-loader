import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const PHOTOS_URL = "https://jsonplaceholder.typicode.com";

export interface Photo {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  getPhotos(page: number, limit: number): Observable<HttpResponse<Photo[]>> {
    return this.http.get<Photo[]>(`${PHOTOS_URL}/albums/1/photos?_page=${page}&_limit=${limit}`, { observe: 'response' });
  }
}
