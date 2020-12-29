import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatePakalSquadComponent } from './allocate-pakal-squad.component';

describe('AllocatePakalSquadComponent', () => {
  let component: AllocatePakalSquadComponent;
  let fixture: ComponentFixture<AllocatePakalSquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocatePakalSquadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatePakalSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
