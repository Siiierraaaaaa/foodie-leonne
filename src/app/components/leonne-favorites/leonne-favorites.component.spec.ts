import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeonneFavoritesComponent } from './leonne-favorites.component';

describe('LeonneFavoritesComponent', () => {
  let component: LeonneFavoritesComponent;
  let fixture: ComponentFixture<LeonneFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeonneFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeonneFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
