import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsiteKitComponent } from './insite-kit.component';

describe('InsiteKitComponent', () => {
  let component: InsiteKitComponent;
  let fixture: ComponentFixture<InsiteKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsiteKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsiteKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
