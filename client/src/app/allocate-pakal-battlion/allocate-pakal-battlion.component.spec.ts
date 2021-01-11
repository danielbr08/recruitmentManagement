import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatePakalBattlionComponent } from './allocate-pakal-battlion.component';

describe('AllocatePakalBattlionComponent', () => {
  let component: AllocatePakalBattlionComponent;
  let fixture: ComponentFixture<AllocatePakalBattlionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocatePakalBattlionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatePakalBattlionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
