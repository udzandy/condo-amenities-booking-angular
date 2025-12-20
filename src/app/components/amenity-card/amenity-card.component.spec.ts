import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityCardComponent } from './amenity-card.component';

describe('AmenityCardComponent', () => {
  let component: AmenityCardComponent;
  let fixture: ComponentFixture<AmenityCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmenityCardComponent]
    });
    fixture = TestBed.createComponent(AmenityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
