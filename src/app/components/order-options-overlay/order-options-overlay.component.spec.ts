import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOptionsOverlayComponent } from './order-options-overlay.component';

describe('OrderOptionsOverlayComponent', () => {
  let component: OrderOptionsOverlayComponent;
  let fixture: ComponentFixture<OrderOptionsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderOptionsOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderOptionsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
