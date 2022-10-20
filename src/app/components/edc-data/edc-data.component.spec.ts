import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdcDataComponent } from './edc-data.component';

describe('EdcDataComponent', () => {
  let component: EdcDataComponent;
  let fixture: ComponentFixture<EdcDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdcDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdcDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
