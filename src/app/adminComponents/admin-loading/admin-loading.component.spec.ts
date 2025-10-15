import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoadingComponent } from './admin-loading.component';

describe('AdminLoadingComponent', () => {
  let component: AdminLoadingComponent;
  let fixture: ComponentFixture<AdminLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
