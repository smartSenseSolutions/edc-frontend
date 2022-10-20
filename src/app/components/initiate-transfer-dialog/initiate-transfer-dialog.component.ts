import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateDataDialogComponent } from 'src/app/components';
import { EdcDataService, NotificationService } from 'src/app/services';
import { API } from 'src/app/constant/api.constant';
import { EDCLIST } from 'src/app/constant/base.constant';

@Component({
  selector: 'app-initiate-transfer-dialog',
  templateUrl: './initiate-transfer-dialog.component.html',
  styleUrls: ['./initiate-transfer-dialog.component.scss'],
})
export class InitiateTransferDialogComponent implements OnInit {
  //Form variable
  transferDataForm!: FormGroup;
  edcDropdownList!: string[];

  constructor(
    private fb: FormBuilder,
    private edcDataService: EdcDataService,
    private notificationService: NotificationService,
    private spinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<CreateDataDialogComponent>,
    public activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; description: string; dataId: string }
  ) {}

  ngOnInit(): void {
    this.transferDataForm = this.fb.group({
      edc: ['', Validators.required],
      isUseCatalogCache: [false],
    });
    if (this.data.id == 1) {
      this.edcDropdownList = ['BASF'];
    } else if (this.data.id == 2) {
      this.edcDropdownList = ['smartSense'];
    }
  }

  onSubmit(): void {
    if (this.transferDataForm.valid) {
      const edcName = this.transferDataForm.get('edc').value;
      const providerEDC = EDCLIST.find((edc) => edc.value === edcName);

      const requestBody = {
        useCache: this.transferDataForm.get('isUseCatalogCache').value,
        data: this.data.description,
        providerIdsUrl: API[`EDC${providerEDC.id}`].IDS_URL,
        dataId: this.data.dataId,
        assetId: 'transfer',
      };

      this.spinnerService.show();
      this.edcDataService.transferData(requestBody, this.data.id).subscribe({
        next: (res) => {
          this.spinnerService.hide();
          this.notificationService.showSuccess(
            'Data Transfer Successfully',
            'Success'
          );
          this.dialogRef.close();
        },
        error: (err) => {
          this.spinnerService.hide();
          this.notificationService.showError(
            'Data is not transferred',
            'Error'
          );
          this.dialogRef.close();
        },
      });
    } else {
      this.notificationService.showError('Please select EDC', 'Error');
    }
  }
}
