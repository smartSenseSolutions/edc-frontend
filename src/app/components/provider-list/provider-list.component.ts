import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssetList } from 'src/app/models/assetList.model';
import { EDCLIST } from 'src/app/constant/base.constant';
import { EdcService } from 'src/app/services';
import { JsonViewComponent } from 'src/app/components';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss'],
})
export class ProviderListComponent implements OnInit {
  edcList = EDCLIST;

  providerName = '';
  assets: AssetList[] = [];
  activeTab: number;
  list: any;
  catalogList: any[];
  edcRole: number = 1;
  providerId: number = 0;

  showCatalog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private edcService: EdcService,
    private spinnerService: NgxSpinnerService
  ) {}

  //Life cycle method
  ngOnInit(): void {
    this.activeTab = Number(this.route.snapshot.paramMap.get('id'));
    this.list = this.edcList.filter((edc) => edc.id != this.activeTab);
    this.getAssetList();
  }

  //Event
  addAsset() {
    this.showCatalog = false;
    this.router.navigate([`create-asset/${this.activeTab}`]);
  }

  getOffer() {
    if (this.providerName != '') {
      this.providerId = this.edcList.find(
        (edc) => edc.value == this.providerName
      ).id;
      this.showCatalog = this.providerId ? true : false;
    } else {
      alert('Select consumer');
    }
  }

  onRoleClick(id: number) {
    this.edcRole = id;
    this.showCatalog = false;
  }

  //Api calls
  getAssetList() {
    this.spinnerService.show();
    this.edcService.getAsset(this.activeTab).subscribe((data) => {
      if (data) {
        this.spinnerService.hide();
        this.assets = data;
      }
    });
  }

  //Helper
  getName(assets) {
    return (
      (assets['properties'] && assets['properties']['asset:prop:id']) || ''
    );
  }

  jsonView(data) {
    const dialogRef = this.dialog.open(JsonViewComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
