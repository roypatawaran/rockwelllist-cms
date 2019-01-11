import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgcListComponent } from './egc-list.component';

describe('EgcListComponent', () => {
  let component: EgcListComponent;
  let fixture: ComponentFixture<EgcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
