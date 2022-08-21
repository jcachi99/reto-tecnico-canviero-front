import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {Clients} from "../models/Clients";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private API_TESTING="api/client/v1";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any>{
    return this.http.get<any>(this.API_TESTING);
  }

  public sendFile(body: FormData): Observable<any>{
    return this.http.post(this.API_TESTING+"/upload", body)
  }

}
