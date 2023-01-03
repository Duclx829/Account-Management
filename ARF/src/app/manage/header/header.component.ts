import { Component, OnInit } from '@angular/core';
import {LOGIN_STATUS} from "../../core/constant/authen.constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  signOut(){
    localStorage.removeItem(LOGIN_STATUS);
    this.router.navigate(['/register']);
  }

}
