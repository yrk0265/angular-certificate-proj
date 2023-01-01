import { TestBed } from '@angular/core/testing';
import { CertificateDetailsService } from './certificate-details.service';

describe('GetCertificateDetailsService', () => {
  let service: CertificateDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
