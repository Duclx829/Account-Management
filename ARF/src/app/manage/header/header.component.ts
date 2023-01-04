import {Component, OnInit} from '@angular/core';
import {LOGIN_STATUS} from "../../core/constant/authen.constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  clickTimes = 0;
  isSignOut = true;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.clickTimes = 0;
    this.clickTimes = Math.floor(Math.random() * 5) + 1
    this.isSignOut = !localStorage.getItem(LOGIN_STATUS)
  }

  signOut() {
    localStorage.removeItem(LOGIN_STATUS);
    this.router.navigate(['/register']);
  }

  viewInfoSubmit(event: MouseEvent) {
    const ele = event.target as HTMLElement;
    if (this.clickTimes === 0) {
      ele.style.marginRight = '0px';
      return;
    }

    const prevSibling = ele.parentElement.previousElementSibling as HTMLElement;
    const navBar = ele.parentElement.parentElement;
    const freeSpace = prevSibling.offsetLeft - navBar.offsetLeft;
    const randomMarginRight = Math.floor(Math.random() * freeSpace * 0.95);
    ele.style.marginRight = `${randomMarginRight}px`;
    this.clickTimes--;
  }

}
