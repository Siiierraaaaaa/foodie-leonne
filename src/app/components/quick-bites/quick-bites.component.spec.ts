import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickBitesComponent } from './quick-bites.component';

describe('QuickBitesComponent', () => {
  let component: QuickBitesComponent;
  let fixture: ComponentFixture<QuickBitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickBitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickBitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
