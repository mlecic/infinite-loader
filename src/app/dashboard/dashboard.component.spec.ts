import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { DashboardComponent } from './dashboard.component';
import { photo1, photo2 } from '../state/photos.mock';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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
      declarations: [DashboardComponent],
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove photo from favorites', () => {
    spyOn(component, 'removeFavoriteFromStore'); 

    const removeButtons = fixture.debugElement.queryAll(By.css('.removeButton'));

    const element1: HTMLElement = removeButtons[0].nativeElement;

    element1.click();
    store.refreshState();

    expect(component.removeFavoriteFromStore).toHaveBeenCalledOnceWith(photo1);
  })
});

