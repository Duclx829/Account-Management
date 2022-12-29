import {Component, OnInit} from '@angular/core';
import {DEFAULT_LANGUAGE, LANGUAGE} from "../core/constant/language.constant";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  language = LANGUAGE;
  currentLanguage = this.language[DEFAULT_LANGUAGE];

  dropDownExpanded: boolean = false;

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {

  }

  changeLang(key: string) {
    this.currentLanguage = this.language[key];
    this.translate.use(key);
  }
}
