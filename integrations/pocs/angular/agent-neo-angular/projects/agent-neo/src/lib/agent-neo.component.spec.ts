import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNeoComponent } from './agent-neo.component';

describe('AgentNeoComponent', () => {
  let component: AgentNeoComponent;
  let fixture: ComponentFixture<AgentNeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentNeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentNeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
