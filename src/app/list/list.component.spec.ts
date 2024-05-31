import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListComponent } from './list.component';
import { photo1, photo2 } from '../state/photos.mock';
import { PhotosService } from '../photos.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore;

  const initialState = {
    photos: {
      photos: [
        photo1,
        photo2,
      ],
      loading: false,
      errorMessage: '',
    },
    favorites: {
      favorites: [
        photo1,
        photo2,
      ]
    }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListComponent],
      providers: [
        provideMockStore({ initialState }),
        PhotosService
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

