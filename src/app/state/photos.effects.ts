import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { parseLinkHeader } from '@web3-storage/parse-link-header';
import { PhotosService } from '../photos.service';
import { getPhotos, getPhotosSuccess } from './photos.actions';
import { Photo } from '../photos.model';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class PhotosEffects {
  getPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPhotos),
      mergeMap(() => this.photosService.getPhotos().pipe(
        map(response => {
          const nextUrl = this.parseLinkHeader(response.headers.get('Link'));
          this.photosService.loadingCompleted = !nextUrl;
          this.photosService.url = nextUrl;
          return getPhotosSuccess({ photos: response.body as Photo[] })
        }),
        // catchError(error => of(loadPhotosFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private photosService: PhotosService
  ) {}

  private parseLinkHeader(header: string | null): string | null {
    if (!header) return null;
    
    const parsedLink = parseLinkHeader(header);
    const nextLink = parsedLink?.['next']?.url;
    return nextLink ? nextLink : null;
  }
}
