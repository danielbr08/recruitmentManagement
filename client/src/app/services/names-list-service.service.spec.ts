import { TestBed } from '@angular/core/testing';

import { NamesListServiceService } from './names-list-service.service';

describe('NamesListServiceService', () => {
  let service: NamesListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NamesListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
