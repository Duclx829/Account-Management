import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./manage/home/home.component";
import {NotFoundComponent} from "./404/not-found/not-found.component";
import {AccountInformationComponent} from "./manage/account-information/account-information.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'signout', redirectTo: 'register'},
  {path: 'account', component: AccountInformationComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
