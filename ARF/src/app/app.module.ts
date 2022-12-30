import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LanguageComponent } from './language/language.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './manage/home/home.component';
import { NotFoundComponent } from './404/not-found/not-found.component';
import { IonicModule } from '@ionic/angular';
import { AccountInformationComponent } from './manage/account-information/account-information.component';
import { HeaderComponent } from './manage/header/header.component';
import { AlertBoxComponent } from './manage/alert-box/alert-box.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LanguageComponent,
    HomeComponent,
    NotFoundComponent,
    AccountInformationComponent,
    HeaderComponent,
    AlertBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTraslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot()
  ],
  exports: [TranslateModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}

export function httpTraslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http,
    './assets/locale/',
    '.json');
}

