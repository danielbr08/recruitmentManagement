import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksManagemententComponent } from './tasks-managementent.component';

describe('TasksManagemententComponent', () => {
  let component: TasksManagemententComponent;
  let fixture: ComponentFixture<TasksManagemententComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksManagemententComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksManagemententComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
