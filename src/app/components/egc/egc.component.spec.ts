import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgcComponent } from './egc.component';

describe('EgcComponent', () => {
  let component: EgcComponent;
  let fixture: ComponentFixture<EgcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
