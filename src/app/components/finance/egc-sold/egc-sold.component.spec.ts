import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgcSoldComponent } from './egc-sold.component';

describe('EgcSoldComponent', () => {
  let component: EgcSoldComponent;
  let fixture: ComponentFixture<EgcSoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgcSoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgcSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
