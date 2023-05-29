import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EDCLIST } from './constant/base.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  edcList = EDCLIST;

  title = 'EDC Demo';

  activeEdcId: number;

  edcName = new FormControl(null, Validators.required);

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    const path = this.location.path();
    this.activeEdcId = Number(path.charAt(path.length - 1)) || 1;
    const edcName = this.edcList.find((edc) => edc.id === this.activeEdcId);
    this.edcName.setValue(edcName);
  }

  onSelectEdc(event): void {
    this.router.navigate([`data-provider/${event.id}`]).then(() => {
      window.location.reload();
    });
  }

  onClickViewDID(): void {
    const edcName = this.edcList.find((edc) => edc.id === this.activeEdcId);
    window.open(edcName.link);
  }
}
