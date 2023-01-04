import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {IUser} from "../../core/model/account.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: IUser[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getAlL().subscribe((res: any) => {
      this.users = res.data;
    })
  }

}
