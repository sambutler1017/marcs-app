import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalsComponent } from './regionals.component';

describe('RegionalsComponent', () => {
  let component: RegionalsComponent;
  let fixture: ComponentFixture<RegionalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
