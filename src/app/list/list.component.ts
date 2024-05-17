import { Component, OnInit } from '@angular/core';
import { PhotosService, Photo } from '../photos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.photosService.getPhotos(1, 10).subscribe(response => {
      this.photos = response.body as Photo[];
    });
  }

}
