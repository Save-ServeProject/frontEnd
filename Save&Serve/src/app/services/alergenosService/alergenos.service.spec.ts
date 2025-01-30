import { TestBed } from '@angular/core/testing';

import { AlergenosService } from './alergenos.service';

describe('AlergenosService', () => {
  let service: AlergenosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlergenosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
