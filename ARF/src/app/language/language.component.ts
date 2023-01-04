import {Component, OnInit} from '@angular/core';
import {DEFAULT_LANGUAGE, LANGUAGE} from "../core/constant/language.constant";
import {TranslateService} from "@ngx-translate/core";
import {LOCALE} from "../core/constant/authen.constant";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  language = LANGUAGE;
  isDropdownExpanded = false;
  currentLanguage;

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.currentLanguage = this.language[this.translate.currentLang];
  }


  changeLang(key: string) {
    this.translate.use(key);
    this.currentLanguage = this.language[key];
  }
}
