import { TestBed, inject } from '@angular/core/testing';

import { GrabDataService } from './grab-data.service';

describe('WTypeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrabDataService]
    });
  });

  it('should be created', inject([GrabDataService], (service: GrabDataService) => {
    expect(service).toBeTruthy();
  }));
});
