import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameListManagementComponent } from './name-list-management.component';

describe('NameListManagementComponent', () => {
  let component: NameListManagementComponent;
  let fixture: ComponentFixture<NameListManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameListManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameListManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
