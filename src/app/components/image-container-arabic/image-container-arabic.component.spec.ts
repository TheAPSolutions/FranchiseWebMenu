import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageContainerArabicComponent } from './image-container-arabic.component';

describe('ImageContainerArabicComponent', () => {
  let component: ImageContainerArabicComponent;
  let fixture: ComponentFixture<ImageContainerArabicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageContainerArabicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageContainerArabicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
