import { TestBed, inject } from '@angular/core/testing';

import { WClassDataService } from './wclass-data.service';

describe('WclassDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WClassDataService]
    });
  });

  it('should be created', inject([WClassDataService], (service: WClassDataService) => {
    expect(service).toBeTruthy();
  }));
});
