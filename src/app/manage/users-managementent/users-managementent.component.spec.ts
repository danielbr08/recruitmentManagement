import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagemententComponent } from './users-managementent.component';

describe('UsersManagemententComponent', () => {
  let component: UsersManagemententComponent;
  let fixture: ComponentFixture<UsersManagemententComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersManagemententComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagemententComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
