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
      to: phno
    }
    console.log(obj);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>("https://education4all.herokuapp.com/sendSMS", obj)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  verifyOTP(otp: String): Observable<any> {
    const obj = {
      userCode: otp
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>("https://education4all.herokuapp.com/otpVerify", obj)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  };
  postForm(form: Register){
    const obj = {
        "userName": form.username,
        "password": form.password,
        "level": "1",
        "phone": form.phno,
        "class": form.grade,
        "board": form.board
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
    // console.log(obj);
    this.http.post<any>("https://localhost:3000/register", obj, httpOptions)
    .subscribe(data => 
      console.log(data)
    );
  };
}
