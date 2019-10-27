import { TestBed } from '@angular/core/testing';

import { CurrentconditionService } from './currentcondition.service';

describe('CurrentconditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentconditionService = TestBed.get(CurrentconditionService);
    expect(service).toBeTruthy();
  });
});
