import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustTrysComponent } from './must-trys.component';

describe('MustTrysComponent', () => {
  let component: MustTrysComponent;
  let fixture: ComponentFixture<MustTrysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MustTrysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MustTrysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
