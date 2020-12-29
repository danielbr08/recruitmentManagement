import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUnitsManagementComponent } from './sub-units-management.component';

describe('SubUnitsManagementComponent', () => {
  let component: SubUnitsManagementComponent;
  let fixture: ComponentFixture<SubUnitsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubUnitsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUnitsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
