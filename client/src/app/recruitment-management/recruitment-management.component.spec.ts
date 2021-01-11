import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentManagementComponent } from './recruitment-management.component';

describe('RecruitmentManagementComponent', () => {
  let component: RecruitmentManagementComponent;
  let fixture: ComponentFixture<RecruitmentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
