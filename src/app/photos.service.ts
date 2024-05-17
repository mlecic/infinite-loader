import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getPhotos(page: number, limit: number) {
    this.http.get<Photo[]>(`${PHOTOS_URL}/albums/1/photos?_page=${page}&_limit=${limit}`, { params: {}, observe: 'response' }).subscribe(response => {
      console.log(response);
      console.log(response.headers.get('link'))
    })
  }
}
