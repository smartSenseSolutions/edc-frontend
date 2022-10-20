import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, concatMap, EMPTY } from 'rxjs';
import { EdcService, NotificationService } from 'src/app/services';
import { AddAssetData } from 'src/app/models/assetList.model';

@Component({
  selector: 'app-provider-add',
  templateUrl: './provider-add.component.html',
  styleUrls: ['./provider-add.component.scss'],
})
export class ProviderAddComponent implements OnInit {
  assetForm: FormGroup;
  activeTab: number;

  constructor(
    private fb: FormBuilder,
    private edcService: EdcService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private spinnerService: NgxSpinnerService
  ) {
    this.assetForm = this.fb.group({
      assetId: ['', Validators.required],
      metaData: this.fb.array([]),
      dataAddress: this.fb.group({
        type: '',
        baseUrl: '',
        method: '',
        mediaType: '',
      }),
      policyId: '',
      contractDefinitionId: '',
    });
  }

  //Life cycle method
  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.activeTab = Number(this.route.snapshot.paramMap.get('id'));
    this.addMetaData();
  }

  newMetaData(): FormGroup {
    return this.fb.group({
      key: '',
      value: '',
    });
  }

  //Event
  addMetaData() {
    this.metaData.push(this.newMetaData());
  }

  removeMetaData(i: number) {
    this.metaData.removeAt(i);
  }

  onSubmit() {
    if (this.assetForm.valid) {
      const assetInfo = JSON.parse(JSON.stringify(this.assetForm.value));
      this.spinnerService.show();
      let data: AddAssetData = {
        asset: {
          id: assetInfo.assetId,
          properties: {
            'asset:prop:id': assetInfo.assetId,
          },
        },
        dataAddress: {
          properties: {
            type: assetInfo.dataAddress.type,
            baseUrl: assetInfo.dataAddress.baseUrl,
            method: assetInfo.dataAddress.method,
            proxyBody: true,
            proxyMethod: true,
            // name:,
            mediaType: assetInfo.dataAddress.mediaType,
          },
        },
      };

      for (let i = 0; i < assetInfo.metaData.length; i++) {
        data.asset.properties[assetInfo.metaData[i].key] =
          assetInfo.metaData[i].value;
      }

      const requestBody = JSON.stringify(data);
      const policyRequest = {
        id: assetInfo.policyId,
        policy: {
          permissions: [
            {
              target: assetInfo.assetId,
              action: {
                type: 'USE',
              },
              edctype: 'dataspaceconnector:permission',
            },
          ],
          '@type': {
            '@policytype': 'set',
          },
        },
      };

      const contractRequest = {
        id: assetInfo.assetId,
        accessPolicyId: assetInfo.policyId,
        contractPolicyId: assetInfo.policyId,
        criteria: [],
      };

      this.edcService
        .addAsset(requestBody, this.activeTab)
        .pipe(
          catchError((err) => {
            this.spinnerService.hide();
            this.notificationService.showError(
              'Asset not created, Create Again!!',
              'Error'
            );
            return EMPTY;
          }),
          concatMap((res) => {
            this.notificationService.showSuccess(
              'Asset Created Successfuly',
              'Success'
            );
            return this.edcService.createAssetPolicy(
              policyRequest,
              this.activeTab
            );
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.notificationService.showError('Policy not created!!', 'Error');
            this.router.navigate([`/data-provider/${this.activeTab}`]);
            return EMPTY;
          }),
          concatMap((res) => {
            this.notificationService.showSuccess(
              'Policy Created Successfuly',
              'Success'
            );
            return this.edcService.createContractDef(
              contractRequest,
              this.activeTab
            );
          }),
          catchError((err) => {
            this.spinnerService.hide();
            this.notificationService.showError(
              'Contract Definition not created!!',
              'Error'
            );
            this.router.navigate([`/data-provider/${this.activeTab}`]);
            return EMPTY;
          })
        )
        .subscribe((res) => {
          this.notificationService.showSuccess(
            'Contract Definition created successfuly',
            'Success'
          );
          this.router.navigate([`/data-provider/${this.activeTab}`]);
        });
    } else {
      this.notificationService.showWarning(
        'Enter all required fields',
        'Warning'
      );
    }
  }

  get metaData(): FormArray {
    return this.assetForm.get('metaData') as FormArray;
  }

  get assetId(): FormControl {
    return this.assetForm.get('assetId') as FormControl;
  }
}
