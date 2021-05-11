import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIconCardComponent } from './app-icon-card.component';

describe('AppIconCardComponent', () => {
  let component: AppIconCardComponent;
  let fixture: ComponentFixture<AppIconCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppIconCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppIconCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
