import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PakalTypesManagemententComponent } from './pakal-types-managementent.component';

describe('PakalTypesManagemententComponent', () => {
  let component: PakalTypesManagemententComponent;
  let fixture: ComponentFixture<PakalTypesManagemententComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PakalTypesManagemententComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PakalTypesManagemententComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
