import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DEFAULT_LANGUAGE, LANGUAGE} from "./core/constant/language.constant";
import {LOCALE} from "./core/constant/authen.constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ARF';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(Object.keys(LANGUAGE));
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
  }

  ngOnInit(): void {
    if (localStorage.getItem(LOCALE)) {
      this.translate.use(localStorage.getItem(LOCALE));
    }
  }
}
