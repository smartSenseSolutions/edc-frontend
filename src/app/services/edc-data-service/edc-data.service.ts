import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { API } from 'src/app/constant/api.constant';
import { EDC_DATA_TYPE } from 'src/app/constant/base.constant';

@Injectable({
  providedIn: 'root',
})
export class EdcDataService {
  constructor(private http: HttpClient) {}

  /** get EDC data list */
  getEDCData(params: any, id: number): Observable<any[]> {
    const header =
      id >= 3
        ? {
            params: params,
          }
        : {};

    const apiUrl =
      id < 3
        ? params.type === EDC_DATA_TYPE.SENT
          ? API[`EDC${id}`].GET_SENT_DATA
          : API[`EDC${id}`].GET_RECEIVED_DATA
        : API[`EDC${id}`].GET_DATA;

    return this.http
      .get<any[]>(
        // `https://trace-${id}.dev.demo.ftcpro.co/api/investigations`,
        apiUrl,
        header
      )
      .pipe(
        tap((_) => this.log('fetched EDC data')),
        catchError(this.handleError<any>('fetch data', []))
      );
  }

  /** create */
  addEDCData(body, id: number): Observable<any> {
    return this.http
      .post<any>(
        // `https://trace-${id}.dev.demo.ftcpro.co/api/test/investigation`,
        API[`EDC${id}`].CREATE_DATA,
        body
      )
      .pipe(
        tap((_) => this.log('Create EDC data')),
        catchError(this.handleError<any>('create data data', []))
      );
  }

  /** Transfer Data */
  transferData(requestBody, id): Observable<any[]> {
    return this.http.post<any>(API[`EDC${id}`].TRANSFER_DATA, requestBody).pipe(
      tap((_) => this.log('transfer data')),
      catchError(this.handleError<any>('transfer data', []))
    );
  }

  /** get partsId */
  getPartsId(id: number): Observable<any[]> {
    return this.http
      .get<any>(
        // `https://trace-${id}.dev.demo.ftcpro.co/api/test/assets`
        API[`EDC${id}`].GET_PARTS
      )
      .pipe(
        tap((_) => this.log('fetched PartsId data')),
        catchError(this.handleError<any>('fetch partIds', []))
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
    console.log(`EDC data Service: ${message}`);
  }
}
