import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Register } from '../shared/register';

@Injectable({
  providedIn: 'root'
})
export class FormpostService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  sendPhoneNo(phno: String) {
    
    const obj = {
      "to": phno
    }
    console.log(obj);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>("https://education4all.herokuapp.com/sendSMS", obj, httpOptions);
  }
  verifyOTP(obj = {}): Observable<any> {
    console.log(obj, "hdsgh");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>("https://education4all.herokuapp.com/otpVerify", obj, httpOptions);
  };
  postForm(data: Register):Observable<any> {   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const obj = {
      "userName": data.username,
      "password": data.password,
      "level": "1",
      "phone": data.phno,
      "class": data.grade,
      "board": data.board
    }
    console.log(obj);
    return this.http.post<any>("https://education4all.herokuapp.com/register", obj, httpOptions);
  };
  login(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const obj = {
      "userName": data.username,
      "password": data.password,
      "level": "1"
    };
    return this.http.post<any>("https://education4all.herokuapp.com/login", obj, httpOptions);
  };
  
  show(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': 'Bearer ' + localStorage.token
      })
    };

    return this.http.get<any>("https://education4all.herokuapp.com/showUser", httpOptions);
  };

}
