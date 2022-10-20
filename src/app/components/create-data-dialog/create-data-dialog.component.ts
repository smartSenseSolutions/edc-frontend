import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { EdcDataService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-create-data-dialog',
  templateUrl: './create-data-dialog.component.html',
  styleUrls: ['./create-data-dialog.component.scss'],
})
export class CreateDataDialogComponent implements OnInit {
  //Form variable
  edcForm!: FormGroup;

  partsList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private edcDataService: EdcDataService,
    private notificationService: NotificationService,
    private spinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<CreateDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.edcForm = this.fb.group({
      parts: [''],
      description: ['', Validators.required],
    });

    if (this.data.id >= 3) {
      this.getPartsId();
    }
  }

  //Api calls and Event
  onSubmit(): void {
    if (this.edcForm.valid) {
      const data =
        this.data.id < 3
          ? { description: this.edcForm.get('description').value }
          : {
              partIds: this.edcForm.get('parts').value,
              description: this.edcForm.get('description').value,
            };

      this.spinnerService.show();
      this.edcDataService.addEDCData(data, this.data.id).subscribe({
        next: (res) => {
          this.spinnerService.hide();
          this.notificationService.showSuccess(
            'Data Created Successfully',
            'Success'
          );
          this.dialogRef.close();
        },
        error: (err) => {
          this.spinnerService.hide();
          this.notificationService.showError('Data not created', 'Error');
          this.dialogRef.close();
        },
      });
    } else {
      this.notificationService.showError('Please enter data', 'Error');
    }
  }

  getPartsId(): void {
    this.edcDataService.getPartsId(this.data.id).subscribe((res: any) => {
      const data: string[] = res.content.map((result) => result.id);
      this.partsList = data;
    });
  }

  get description(): FormControl {
    return this.edcForm.get('description') as FormControl;
  }
}
