import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUnitComponent } from './active-unit.component';

describe('ActiveUnitComponent', () => {
  let component: ActiveUnitComponent;
  let fixture: ComponentFixture<ActiveUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
