import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { parseLinkHeader } from '@web3-storage/parse-link-header';
import { PhotosService } from '../photos.service';
import { getPhotos, getPhotosSuccess, getPhotosFailure } from './photos.actions';
import { Photo } from '../photos.model';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PhotosEffects {
  getPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPhotos),
      mergeMap(() => this.photosService.getPhotos().pipe(
        map(response => {
          const nextUrl = this.parseLinkHeader(response.headers.get('Link'));
          this.manageDataLoading(nextUrl);
          return getPhotosSuccess({ photos: response.body as Photo[] })
        }),
        catchError(error => of(getPhotosFailure({ message: error.message })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private photosService: PhotosService
  ) {}

  /**
   * This method converts Link header into usable next link
   * @param header Expects header string for parsing
   * @returns 
   */
  private parseLinkHeader(header: string | null): string | null {
    if (!header) return null;
    
    const parsedLink = parseLinkHeader(header);
    const nextLink = parsedLink?.['next']?.url;
    return nextLink ? nextLink : null;
  }

  /**
   * This method manages data loading process
   * @param nextUrl Expects nextUrl string which will be saved for next data load
   */
  private manageDataLoading(nextUrl: string | null): void {
    this.photosService.loadingStarted = true;
    this.photosService.loadingCompleted = !nextUrl;
    this.photosService.url = nextUrl;
  }
}
