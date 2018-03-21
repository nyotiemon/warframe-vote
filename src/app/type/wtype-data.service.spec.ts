import { TestBed, inject } from '@angular/core/testing';

import { WTypeDataService } from './wtype-data.service';

describe('WTypeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WTypeDataService]
    });
  });

  it('should be created', inject([WTypeDataService], (service: WTypeDataService) => {
    expect(service).toBeTruthy();
  }));
});
