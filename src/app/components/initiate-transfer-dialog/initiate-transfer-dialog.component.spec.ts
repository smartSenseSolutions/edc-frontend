import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateTransferDialogComponent } from './initiate-transfer-dialog.component';

describe('InitiateTransferDialogComponent', () => {
  let component: InitiateTransferDialogComponent;
  let fixture: ComponentFixture<InitiateTransferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateTransferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateTransferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
