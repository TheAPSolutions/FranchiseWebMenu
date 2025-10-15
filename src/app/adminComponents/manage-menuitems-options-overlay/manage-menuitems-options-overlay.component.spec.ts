import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMenuitemsOptionsOverlayComponent } from './manage-menuitems-options-overlay.component';

describe('ManageMenuitemsOptionsOverlayComponent', () => {
  let component: ManageMenuitemsOptionsOverlayComponent;
  let fixture: ComponentFixture<ManageMenuitemsOptionsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMenuitemsOptionsOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMenuitemsOptionsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
