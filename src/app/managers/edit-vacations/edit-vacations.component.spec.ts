import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVacationsComponent } from './edit-vacations.component';

describe('EditVacationsComponent', () => {
  let component: EditVacationsComponent;
  let fixture: ComponentFixture<EditVacationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVacationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
