import { TestBed } from '@angular/core/testing';

import { BancoalimentosService } from './bancoalimentos.service';

describe('BancoalimentosService', () => {
  let service: BancoalimentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoalimentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
