import { TestBed } from '@angular/core/testing';

import { LineaproductoService } from './lineaproducto.service';

describe('LineaproductoService', () => {
  let service: LineaproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
