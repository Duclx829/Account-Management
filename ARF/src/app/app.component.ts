import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DEFAULT_LANGUAGE, LANGUAGE} from "./core/constant/language.constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ARF';
  constructor(private translate: TranslateService) {
    translate.addLangs(Object.keys(LANGUAGE));
    translate.setDefaultLang(DEFAULT_LANGUAGE);
  }
}
