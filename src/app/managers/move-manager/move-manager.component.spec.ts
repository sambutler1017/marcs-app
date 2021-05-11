import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveManagerComponent } from './move-manager.component';

describe('MoveManagerComponent', () => {
  let component: MoveManagerComponent;
  let fixture: ComponentFixture<MoveManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
