import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EdcService, NotificationService } from 'src/app/services';
import { JsonViewComponent } from 'src/app/components';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit, OnChanges {
  @Input() providerId: number;

  offersList: any[] = [];
  selectedOffer: any;
  typeSelected: string = 'ball-fussion';
  consumerId: number;

  constructor(
    private edcService: EdcService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private spinnerService: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  //  Life cycle methods
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.consumerId = Number(this.route.snapshot.paramMap.get('id'));
    this.getOfferList();
  }

  onOfferNameClick = (offer: any) => {};

  onStartNegotiation = (offer: any) => {
    this.spinnerService.show();
    // console.log(offer['asset']['properties']["asset:prop:id"])
    this.edcService
      .startContractNegotiaion(offer, this.providerId, this.consumerId)
      .subscribe((response) => {
        offer.inProgress = true;
        const negotiationID = response;
        offer.negotiationID = negotiationID;
        let negotiationResult;
        let interval = setInterval(() => {
          this.edcService
            .getNegotiationState(negotiationID.id, this.consumerId)
            .subscribe((response) => {
              negotiationResult = response;
              if (negotiationResult.state == 'CONFIRMED') {
                this.spinnerService.hide();
                offer.contractAgreementId =
                  negotiationResult['contractAgreementId'];
                clearInterval(interval);
                this.notificationService.showSuccess(
                  'Contract Negotiation Completed',
                  'Success'
                );

                this.notificationService.showInfo(
                  `Aggrement ID : ${negotiationResult['contractAgreementId']}`,
                  'Info'
                );
              }
              if (negotiationResult.state == 'ERROR') {
                this.notificationService.showError('Error occurred', 'Error');
                this.spinnerService.hide();
              }
            });
        }, 5000);
      });
  };

  onStartDataTransfer = (offer: any) => {
    this.spinnerService.show();
    this.edcService
      .startDataExchange(
        offer['asset']['properties']['asset:prop:id'],
        offer.contractAgreementId,
        this.providerId,
        this.consumerId
      )
      .subscribe((response1) => {
        let interval = setInterval(() => {
          // this.edcService
          //   .getAssetData(offer['asset']['properties']['asset:prop:id'])
          //   .subscribe((response) => {
          // if (response && Object.keys(response).length > 0) {
          // console.log(response, 'response');
          this.spinnerService.hide();
          // offer.assetData = response;
          offer.assetData1 = response1.id;
          offer.inProgress = false;
          clearInterval(interval);
          this.notificationService.showSuccess(
            'Data Transfer Completed',
            'Success'
          );
          this.notificationService.showInfo(
            'Data Transfer Request Id',
            response1.id
          );
          // }
          // });
        }, 5000);
      });
  };

  //Api Calls
  getOfferList = () => {
    this.spinnerService.show();
    this.edcService
      .getOffers(this.providerId, this.consumerId)
      .subscribe((response) => {
        this.spinnerService.hide();
        this.offersList = response['contractOffers'];
      });
  };

  //To view as Json data
  jsonView(data) {
    const dialogRef = this.dialog.open(JsonViewComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
