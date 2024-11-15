import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayDishesComponent } from './holiday-dishes.component';

describe('HolidayDishesComponent', () => {
  let component: HolidayDishesComponent;
  let fixture: ComponentFixture<HolidayDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayDishesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
