import {Component, Input, OnInit} from '@angular/core';
import {IAlert} from "../../core/model/alert.model";

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {
  private alertObj:IAlert;
  @Input() set setAlert(value: IAlert) {
    this.alertObj = value;
  }

  get getAlert() {
    return this.alertObj;
  }


  constructor() {
  }

  ngOnInit(): void {
  }
}
