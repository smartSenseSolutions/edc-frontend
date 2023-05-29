import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateDataDialogComponent } from 'src/app/components';
import {
  EdcDataService,
  EdcService,
  NotificationService,
} from 'src/app/services';
import { AssetList } from 'src/app/models/assetList.model';
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
  assets: AssetList[] = [];

  constructor(
    private fb: FormBuilder,
    private edcDataService: EdcDataService,
    private edcService: EdcService,
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
      edcAsset: ['', Validators.required],
      isUseCatalogCache: [false],
    });
    if (this.data.id == 1) {
      this.edcDropdownList = ['Sunrise'];
      this.getAssetList(2);
    } else if (this.data.id == 2) {
      this.edcDropdownList = ['Hella'];
      this.getAssetList(1);
    }
  }

  //Event handler
  onSubmit(): void {
    const edcName = this.transferDataForm.get('edc').value;
    if (this.transferDataForm.valid) {
      const providerEDC = EDCLIST.find((edc) => edc.value === edcName);
      const asset = this.transferDataForm.get('edcAsset').value;

      const requestBody = {
        useCache: this.transferDataForm.get('isUseCatalogCache').value,
        data: this.data.description,
        providerIdsUrl: API[`EDC${providerEDC.id}`].IDS_URL,
        dataId: this.data.dataId,
        assetId: asset['id'],
      };
      -this.spinnerService.show();
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
      if (!edcName) {
        this.notificationService.showError('Please select EDC', 'Error');
      } else {
        this.notificationService.showError('Please select Asset', 'Error');
      }
    }
  }

  //Api calls
  getAssetList(edcId: number) {
    this.spinnerService.show();
    this.edcService.getAsset(edcId).subscribe((data) => {
      if (data) {
        this.spinnerService.hide();
        this.assets = data;
      }
    });
  }
}
