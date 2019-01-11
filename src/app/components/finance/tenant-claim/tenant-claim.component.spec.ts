import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantClaimComponent } from './tenant-claim.component';

describe('TenantClaimComponent', () => {
  let component: TenantClaimComponent;
  let fixture: ComponentFixture<TenantClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
