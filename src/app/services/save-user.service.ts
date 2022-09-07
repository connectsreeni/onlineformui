import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Common } from "../constants";
import { User } from "../user-model";

@Injectable({
  providedIn: "root",
})
export class SaveUserService {
  constructor(private httpClient: HttpClient) {}

  public saveUser(userDetail: User): Observable<any> {
    return this.httpClient.post<User>(
      `${Common.baseUrl}/${Common.endpointUser}`,
      userDetail
    );
  }
}
