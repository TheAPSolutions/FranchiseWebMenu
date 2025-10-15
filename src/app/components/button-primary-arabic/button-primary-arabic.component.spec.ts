import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPrimaryArabicComponent } from './button-primary-arabic.component';

describe('ButtonPrimaryArabicComponent', () => {
  let component: ButtonPrimaryArabicComponent;
  let fixture: ComponentFixture<ButtonPrimaryArabicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPrimaryArabicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPrimaryArabicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
