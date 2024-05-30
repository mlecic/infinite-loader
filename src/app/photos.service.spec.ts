import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PhotosService } from './photos.service';
import { Photo } from './photos.model';
import { photo1, photo2 } from './state/photos.mock';
import { of } from 'rxjs';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let photosService: PhotosService;

describe('PhotosService', () => {

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    photosService = new PhotosService(httpClientSpy);
  });

  it('should return expected photos', (done: DoneFn) => {
    const expectedPhotos: Photo[] = [
      photo1,
      photo2
    ]

    httpClientSpy.get.and.returnValue(of({ body: expectedPhotos } as HttpResponse<Photo[]>));

    photosService.getPhotos().subscribe(response => {
      expect(response.body).withContext('expected photos').toEqual(expectedPhotos);
      done();
    })
  });
});
