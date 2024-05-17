import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.photosService.getPhotos(1, 10);
  }

}
