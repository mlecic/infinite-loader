import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FavoritesState } from '../state/favorites.reducer';
import { removeFavorite } from '../state/favorites.actions';
import { markAsFavorite } from '../state/photos.actions';
import { Photo } from '../photos.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  favorites$: Observable<Photo[]>;
  favorites: Photo[] = [];

  constructor(private router: Router, private store: Store<{ favorites: FavoritesState }>) {
    this.favorites$ = this.store.select(state => state.favorites.favorites);
  }

  ngOnInit(): void {
    this.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  goToList() {
    this.router.navigateByUrl('/list');
  }

  removeFavoriteFromStore(favorite: Photo) {
    this.store.dispatch(removeFavorite({ favorite }));
    this.store.dispatch(markAsFavorite({ favorite, value: false }));
  }
}
