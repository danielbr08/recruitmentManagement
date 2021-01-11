import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCurrentTaskComponent } from './manage-current-task.component';

describe('ManageCurrentTaskComponent', () => {
  let component: ManageCurrentTaskComponent;
  let fixture: ComponentFixture<ManageCurrentTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCurrentTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCurrentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
