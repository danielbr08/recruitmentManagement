import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyWarehouseUnitInventoryComponent } from './emergency-warehouse-unit-inventory.component';

describe('EmergencyWarehouseUnitInventoryComponent', () => {
  let component: EmergencyWarehouseUnitInventoryComponent;
  let fixture: ComponentFixture<EmergencyWarehouseUnitInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyWarehouseUnitInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyWarehouseUnitInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
