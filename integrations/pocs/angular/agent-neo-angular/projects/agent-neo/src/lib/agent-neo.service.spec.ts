import { TestBed } from '@angular/core/testing';

import { AgentNeoService } from './agent-neo.service';

describe('AgentNeoService', () => {
  let service: AgentNeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentNeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
