import {
  Component,
  OnInit
} from '@angular/core';
import {
  PAGE_NOT_FOUND_MSG,
  PAGE_NOT_FOUND_TITLE
} from "../../core/constant/authen.constant";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  notFoundMsg = PAGE_NOT_FOUND_MSG;
  notFoundTitle = PAGE_NOT_FOUND_TITLE;
  errorCode = 404;

  constructor() { }

  ngOnInit(): void {
  }

}
