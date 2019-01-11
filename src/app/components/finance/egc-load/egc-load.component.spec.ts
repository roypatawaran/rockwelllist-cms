import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgcLoadComponent } from './egc-load.component';

describe('EgcLoadComponent', () => {
  let component: EgcLoadComponent;
  let fixture: ComponentFixture<EgcLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgcLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgcLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
