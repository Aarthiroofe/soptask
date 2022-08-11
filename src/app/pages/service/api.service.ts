import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpHeader={
    headers:new HttpHeaders({
      'Authorization':'Token 0aeb15de83ef6fb02695f2ce0d99374046f32eb9'
    })
  }

 
  constructor(private http : HttpClient) { }
  
 getdata(data:any):Observable<any>{
  
    return this.http.post<any>(environment.apirootURL+'report-list/',data,this.httpHeader);
 }

}