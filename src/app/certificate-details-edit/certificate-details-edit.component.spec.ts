import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDetailsEditComponent } from './certificate-details-edit.component';

describe('CertificateDetailsEditComponent', () => {
  let component: CertificateDetailsEditComponent;
  let fixture: ComponentFixture<CertificateDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateDetailsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
