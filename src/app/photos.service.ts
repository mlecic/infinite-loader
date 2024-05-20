import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from './photos.model';

const BASE_URL = "https://jsonplaceholder.typicode.com/albums/1/photos";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  url: string | null = null;
  loadingStarted = false;
  loadingCompleted = false;

  constructor(private http: HttpClient) { }

  /**
   * Get photos data
   */
  getPhotos() {
    return this.http.get<Photo[]>(this.url || `${BASE_URL}?_page=1&_limit=10`, { observe: 'response' });
  }
}
