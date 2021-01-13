import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamesListSoldiersManagementComponent } from './names-list-soldiers-management.component';

describe('NamesListSoldiersManagementComponent', () => {
  let component: NamesListSoldiersManagementComponent;
  let fixture: ComponentFixture<NamesListSoldiersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamesListSoldiersManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesListSoldiersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
