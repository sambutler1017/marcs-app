import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDatesComponent } from './block-dates.component';

describe('BlockDatesComponent', () => {
  let component: BlockDatesComponent;
  let fixture: ComponentFixture<BlockDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
