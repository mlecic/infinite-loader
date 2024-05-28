import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPhotos, markAsFavorite } from '../state/photos.actions';
import { PhotosState } from '../state/photos.reducer';
import { selectPhotos, selectPhotosLoading } from '../state/photos.selectors';
import { FavoritesState } from '../state/favorites.reducer';
import { addFavorite } from '../state/favorites.actions';
import { Observable } from 'rxjs';
import { Photo } from '../photos.model';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  photos$: Observable<Photo[]>;
  loading$: Observable<boolean>;

  constructor(private router: Router, private store: Store<{ photos: PhotosState, favorites: FavoritesState }>, private photosService: PhotosService) {
    this.photos$ = this.store.select(selectPhotos);
    this.loading$ = this.store.select(selectPhotosLoading);
  }

  ngOnInit(): void {
    if(!this.photosService.loadingStarted && !this.photosService.loadingCompleted) {
      this.store.dispatch(getPhotos());
    }
  }

  /**
   * Load more photos when scrolled to the bottom and if nextUrl is not null
   */
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (
        this.photosService.loadingStarted && 
        !this.photosService.loadingCompleted && 
        Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight
      ) {
      this.store.dispatch(getPhotos());
    }
  }

  goBack() {
    this.router.navigateByUrl("/");
  }

  addFavoriteToStore(favorite: Photo) {
    this.store.dispatch(addFavorite({ favorite }));
    this.store.dispatch(markAsFavorite({ favorite, value: true }));
  }

}
