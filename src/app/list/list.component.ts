import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotosService, Photo } from '../photos.service';

const MARGINS_OFFSET = 50;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private router: Router, private photosService: PhotosService) {}

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
    if ((window.innerHeight + window.scrollY - MARGINS_OFFSET) >= document.body.offsetHeight) {
      this.photosService.getPhotos();
    }
  }

  goBack() {
    this.router.navigateByUrl("/");
  }

}
