import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PhotosService, Photo } from '../photos.service';
import { FavoritesState } from '../state/favorites.reducer';
import { addFavorite } from '../state/favorites.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private router: Router, private store: Store<{ favorites: FavoritesState }>, private photosService: PhotosService) {}

  ngOnInit(): void {
    // Get initial photos on page load
    this.photosService.getPhotos();

    // Subscribe to new photos data
    this.photosService.photos$.subscribe(photos => {
      this.photos = photos;
    })
  }

  /**
   * Load more photos when scrolled to the bottom
   */
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.photosService.getPhotos();
    }
  }

  goBack() {
    this.router.navigateByUrl("/");
  }

  addFavoriteToStore(favorite: Photo) {
    this.store.dispatch(addFavorite({ favorite: favorite }));
  }

}
