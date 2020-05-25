import { Component, OnInit } from "@angular/core";
import { FormpostService } from "../services/formpost.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user = {};
  constructor(public formpostService: FormpostService) {}

  ngOnInit() {
    this.formpostService.show().subscribe((data) => {
      this.user = data;
      console.log(data);
    });
    // this.formpostService.getImage().subscribe(
    //   data => {
    //     console.log(data);
    //   }
    // )
  }
}
