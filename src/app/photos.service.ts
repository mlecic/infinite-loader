import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { parseLinkHeader } from '@web3-storage/parse-link-header';

const PHOTOS_URL = "https://jsonplaceholder.typicode.com";
const INITIAL_LOAD_URL = `${PHOTOS_URL}/albums/1/photos?_page=1&_limit=10`;

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

  private savedPhotos: Photo[] = [];
  
  private photosSubject = new BehaviorSubject<Photo[]>([]);
  photos$ = this.photosSubject.asObservable();
  
  private nextLoadUrl = '';
  private loadingCompleted = false;

  constructor(private http: HttpClient) { }

  /**
   * Fetch photos data
   */
  getPhotos() {
    // Initial load
    if(!this.savedPhotos.length) {
      this.http.get<Photo[]>(INITIAL_LOAD_URL, { observe: 'response' }).subscribe(response => {
        this.savePhotos(response);
      });
    } else if(!this.loadingCompleted) {
      this.http.get<Photo[]>(this.nextLoadUrl, { observe: 'response' }).subscribe(response => {
        this.savePhotos(response);
      });
    }
  }

  /**
   * Private method to save photos to store, emit new photos in observable and prepare next data load
   * @param response Expects HttpResponse with photos data
   */
  private savePhotos(response: HttpResponse<Photo[]>) {
    // Save photos
    const photos = response.body as Photo[];
    this.savedPhotos = [...this.savedPhotos, ...photos];
    this.photosSubject.next(this.savedPhotos);
    // Prepare next load
    const headersLink = response.headers.get('link');
    const parsedLink = parseLinkHeader(headersLink);
    const nextLoadUrl = parsedLink?.['next']?.url;
    if(!!nextLoadUrl) {
      this.nextLoadUrl = nextLoadUrl;
    } else {
      this.loadingCompleted = true;
    }
  }
}
