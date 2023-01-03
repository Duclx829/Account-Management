import {Component, Input, OnInit} from '@angular/core';
import {INotification} from "../../core/model/notify.model";

@Component({
  selector: 'app-alert-box',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  private notification:INotification;
  @Input() set setNotify(value: INotification) {
    this.notification = value;
  }

  get getNotify() {
    return this.notification;
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
