import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-json-view',
  templateUrl: './json-view.component.html',
  styleUrls: ['./json-view.component.scss'],
})
export class JsonViewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<JsonViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    var jsonViewer = new (window as any).JSONViewer();
    document.querySelector('#json').appendChild(jsonViewer.getContainer());
    jsonViewer.showJSON(this.data);
  }
  getData(data) {
    return JSON.stringify(data);
  }
}
