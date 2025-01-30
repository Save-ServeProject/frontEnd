import { TestBed } from '@angular/core/testing';

import { TipotransporteService } from './tipotransporte.service';

describe('TipotransporteService', () => {
  let service: TipotransporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipotransporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
