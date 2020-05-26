import { Component, OnInit } from '@angular/core';
import { FormpostService } from '../services/formpost.service';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  links;
  constructor(public formpostService: FormpostService, public http: HttpClient) { }

  ngOnInit() {
    this.formpostService.getAns().subscribe(
      (data) => {
        this.links = data.tup;
        console.log(data);
      }
    )
  }

  fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];

      const formData = new FormData();
      formData.append("file", file, file.name);

      // It is very important to leave the Content-Type empty
      // do not use headers.append('Content-Type', 'multipart/form-data');
      const httpOptions = {
        headers: new HttpHeaders({
          authorization: "Bearer " + localStorage.token,
        }),
      };
      this.http
        .post(
          "https://education-files.herokuapp.com/upload",
          formData,
          httpOptions
        )
        .subscribe((data) => console.log(data));
    }
  }


}
