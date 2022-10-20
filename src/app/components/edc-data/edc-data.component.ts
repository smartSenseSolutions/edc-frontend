import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  CreateDataDialogComponent,
  InitiateTransferDialogComponent,
} from 'src/app/components';
import { EdcDataService } from 'src/app/services';
import {
  EDC_DATA_TYPE,
  PAGE_SIZE_OPTIONS,
} from 'src/app/constant/base.constant';
import { COLUMN_FOR_TABLE } from './edc-data.constants';

@Component({
  selector: 'app-edc-data',
  templateUrl: './edc-data.component.html',
  styleUrls: ['./edc-data.component.scss'],
})
export class EdcDataComponent implements OnInit, AfterViewInit {
  @Input() activeTab: number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  PageSizeOptions = PAGE_SIZE_OPTIONS;
  recordsPerPage = PAGE_SIZE_OPTIONS[0];
  edcDataType = EDC_DATA_TYPE;

  edcDataList: any[] = [];
  dataSource: MatTableDataSource<any>;
  totalResult: number = 0;
  pageIndex = 0;
  pages: any;
  displayedColumns: string[];

  type: string = this.edcDataType.SENT;
  isActionButton: boolean = false;

  constructor(
    public dialog: MatDialog,
    private edcDataService: EdcDataService
  ) {}

  ngOnInit(): void {
    this.isActionButton = this.activeTab < 3 ? true : false;
    this.getDisplayColumns();
    this.getEdcData();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  //Event
  onTypeClick(type: string): void {
    this.type = type;
    this.getEdcData();
  }

  onPaginationChange(event?: PageEvent): void {
    if (event) {
      this.pageIndex =
        event.pageSize === this.recordsPerPage ? event.pageIndex : 0;
      this.recordsPerPage = event.pageSize;
      this.getEdcData();
    }
  }

  onSortChange(event?: Sort): void {
    const params = {
      type: this.type,
      page: this.pageIndex,
      size: this.recordsPerPage,
      sort: event.direction,
    };

    const queryParams = params.sort != '' ? params : undefined;
    this.getEdcData(queryParams);
  }

  //Dialog Open Calls
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDataDialogComponent, {
      width: '600px',
      data: { id: this.activeTab },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getEdcData();
    });
  }

  openInitiateTransferDialog(description: string, id: string): void {
    const dialogRef = this.dialog.open(InitiateTransferDialogComponent, {
      width: '600px',
      height: '400px',
      data: { id: this.activeTab, description: description, dataId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getEdcData();
    });
  }

  //API calls
  getEdcData(queryParams?: any): void {
    const params = queryParams || {
      type: this.type,
      page: this.pageIndex,
      size: this.recordsPerPage,
    };

    this.edcDataService
      .getEDCData(params, this.activeTab)
      .subscribe((data: any) => {
        if (data) {
          if (this.activeTab < 3) {
            this.edcDataList = data.data;
            this.totalResult = this.edcDataList.length;
            this.dataSource = new MatTableDataSource(this.edcDataList);
          } else {
            this.pages = data.pageCount;
            this.totalResult = data.totalItems;
            this.edcDataList = data.content;
            this.dataSource = new MatTableDataSource(this.edcDataList);
          }
        }
      });
  }

  //Helper function
  getDisplayColumns(): void {
    if (this.activeTab < 3) {
      this.displayedColumns = COLUMN_FOR_TABLE.ACTION_BUTTON;
    } else {
      this.displayedColumns = COLUMN_FOR_TABLE.NORMAL;
    }
  }
}
