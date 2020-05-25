import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { FormpostService } from "../services/formpost.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

// import 'rxjs/add/operator/map';
import { map, catchError } from "rxjs/operators";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isLogged: Boolean = localStorage.token != "0";
  selectedFile: ImageSnippet;
  img: File;
  constructor(
    public dialog: MatDialog,
    public formpostService: FormpostService,
    public http: HttpClient
  ) {}

  ngOnInit() {}
  openLoginForm() {
    this.dialog.open(LoginComponent, { width: "500px", height: "450px" });
  }
  openRegisterForm() {
    this.dialog.open(RegisterComponent, { width: "500px", height: "450px" });
  }
  logOutUser() {
    localStorage.token = 0;
    this.isLogged = false;
    location.reload();
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
