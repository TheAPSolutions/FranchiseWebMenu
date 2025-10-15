import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryHeaderArabicComponent } from './primary-header-arabic.component';

describe('PrimaryHeaderArabicComponent', () => {
  let component: PrimaryHeaderArabicComponent;
  let fixture: ComponentFixture<PrimaryHeaderArabicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryHeaderArabicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryHeaderArabicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
