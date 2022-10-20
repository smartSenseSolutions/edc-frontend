import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap } from 'rxjs';
import { API } from 'src/app/constant/api.constant';
import { AssetList } from 'src/app/models/assetList.model';

@Injectable({
  providedIn: 'root',
})
export class EdcService {
  private apiKey = 'RS377diCTWtjVHuzYz7RcGDFV8wbePh';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    }),
  };

  constructor(private http: HttpClient) {}

  /** GET Assets from the server */
  getAsset(id: number): Observable<AssetList[]> {
    const param = {
      limit: 20,
      offset: 0,
    };

    const header = {
      ...this.httpOptions,
      params: param,
    };

    return this.http
      .get<AssetList[]>(API[`EDC${id}`].CREATE_ASSET, header)
      .pipe(
        tap((_) => this.log('fetched Assets')),
        catchError(this.handleError<any>('fetch assets failed', []))
      );
  }

  /** POST: add a new Asset to the server */
  addAsset(asset: any, id: number): Observable<any> {
    return this.http
      .post<any>(API[`EDC${id}`].CREATE_ASSET, asset, this.httpOptions)
      .pipe(
        tap((newHero: any) => this.log(`added asset w/ id=${newHero}`)),
        catchError(this.handleError<any>('addAsset failed'))
      );
  }

  /** GET offers from the server */
  getOffers(providerId: number, consumerId: number): Observable<any[]> {
    const httpOptions = {
      ...this.httpOptions,
      params: {
        providerUrl: API[`EDC${providerId}`].IDS_URL,
      },
    };

    return this.http
      .get<any[]>(API[`EDC${consumerId}`].GET_CATALOG, httpOptions)
      .pipe(
        tap((_) => this.log('fetched offers')),
        catchError(this.handleError<any[]>('fetch offers failed', []))
      );
  }

  /** POST: start negotiation */
  startContractNegotiaion(
    offer: any,
    providerId: number,
    consumerId: number
  ): Observable<any> {
    //Request Body
    const contractBody = {
      offer: offer,
      connectorId: 'provider',
      protocol: 'ids-multipart',
      connectorAddress: API[`EDC${providerId}`].IDS_URL,
    };

    contractBody.offer.offerId = offer.id;

    contractBody.offer.assetId = offer['asset']['properties']['asset:prop:id'];

    return this.http
      .post<any>(
        API[`EDC${consumerId}`].START_NEGOTIATION,
        contractBody,
        this.httpOptions
      )
      .pipe(
        tap((newHero: any) =>
          this.log(`Negotiation started for asset = ${offer.offerId}`)
        ),
        catchError(this.handleError<any>('start contract negotiaion'))
      );
  }

  /** POST: start negotiation */
  getNegotiationState(
    negotiationID: string,
    consumerId: number
  ): Observable<any> {
    return this.http
      .get<any>(
        API[`EDC${consumerId}`].CONTRACT_NEGOTIATION.replace(
          ':id',
          negotiationID
        ),
        this.httpOptions
      )
      .pipe(
        tap((negotiationID: string) =>
          this.log(`Checking status for negotiationID = ${negotiationID}`)
        ),
        catchError(this.handleError<any>('get negotioin state'))
      );
  }

  /** POST: start negotiation */
  startDataExchange(
    assetId: number,
    contarctAgreementId: string,
    providerId: number,
    consumerId: number
  ): Observable<any> {
    //Defining Request Body
    let contractInfo = {
      protocol: 'ids-multipart',
      edctype: 'dataspaceconnector:datarequest',
      assetId: assetId,
      contractId: contarctAgreementId,
      dataDestination: {
        properties: {
          // endpoint:
          //   'http://ec2-15-207-171-26.ap-south-1.compute.amazonaws.com/api/consumer/data',
          // method: 'POST',
          // mediaType: 'application/json',
          type: 'HttpProxy',
        },
      },
      transferType: {
        contentType: 'text/plain',
        isFinite: true,
      },
      managedResources: false,
      connectorAddress: API[`EDC${providerId}`].IDS_URL,
      connectorId: 'consumer',
    };

    return this.http
      .post<any>(
        API[`EDC${consumerId}`].TRANSFER_PROCESS,
        contractInfo,
        this.httpOptions
      )
      .pipe(
        tap((newHero: any) =>
          this.log(
            `Start data exchange for asset =  ${assetId} & contarctAgreementId = ${contarctAgreementId}`
          )
        ),
        catchError(this.handleError<any>('start data exchange'))
      );
  }

  /** POST: start negotiation */
  getAssetData(assetId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    return this.http.get<any>(``, httpOptions).pipe(
      tap((negotiationID: string) =>
        this.log(`Getting asset data for asssetId = ${assetId}`)
      ),
      catchError(this.handleError<any>('get asset data'))
    );
  }

  /** policy defination */
  createAssetPolicy(requestBody, id: number): Observable<any> {
    return this.http
      .post<any>(API[`EDC${id}`].POLICY_DEF, requestBody, this.httpOptions)
      .pipe(
        tap((_) => this.log(`create policy for asset id = ${id}`)),
        catchError(this.handleError<any>('policy def error'))
      );
  }

  /** contract defination */
  createContractDef(requestBody, id: number): Observable<any> {
    return this.http
      .post<any>(API[`EDC${id}`].CONTRACT_DEF, requestBody, this.httpOptions)
      .pipe(
        tap((_) => this.log(`create contract definition for asset id = ${id}`)),
        catchError(this.handleError<any>('contract def error'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a EDCService message with the MessageService */
  private log(message: string) {
    console.log(`EDCService: ${message}`);
  }
}
