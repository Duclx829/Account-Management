import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../model/account.model";
import {Injectable} from "@angular/core";

// export const API_SAMPLE = 'https://reqres.in/api/users?page=2'
export const API_SAMPLE = 'https://reqres.in/api/users'


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
}

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  getAlL(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(API_SAMPLE).pipe();
  }
}
