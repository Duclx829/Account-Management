import {Component, OnInit} from '@angular/core';
import {LOGIN_STATUS} from "../../core/constant/authen.constant";
import {IAccount} from "../../core/model/account.model";
import {DatePipe} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit {

  accountInfo: IAccount;
  natural;

  constructor(
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.natural = new Intl.Collator('en').compare;
    const jsonAccount = JSON.parse(localStorage.getItem(LOGIN_STATUS));
    this.accountInfo = jsonAccount as IAccount;
    this.translate.stream(this.accountInfo.gender).subscribe((value: string) => {
      this.accountInfo.gender = value;
    })
    this.accountInfo.birthDate = this.datePipe.transform(this.accountInfo.birthDate, 'dd-MM-yyyy')
  }

}
