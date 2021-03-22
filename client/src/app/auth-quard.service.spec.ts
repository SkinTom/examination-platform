import { TestBed } from '@angular/core/testing';

import { AuthQuardService } from './auth-quard.service';

describe('AuthQuardService', () => {
  let service: AuthQuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthQuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
