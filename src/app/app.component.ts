import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SaveUserService } from "./services/save-user.service";
import { User } from "./user-model";
import * as alertify from "alertifyjs";
import { Common } from "./constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [SaveUserService],
})
export class AppComponent {
  public title = "makonis-assignment-ui";
  public isSaveProcessing: boolean = false;

  constructor(private saveUserService: SaveUserService) {}

  public onSaveForm(userForm: NgForm): void {
    if (userForm.valid) {
      this.isSaveProcessing = true;
      const firstName = userForm.controls["firstName"].value;
      const lastName = userForm.controls["lastName"].value;
      let userDetail: User = {
        firstName: firstName,
        lastName: lastName,
      };

      this.saveUserService.saveUser(userDetail).subscribe({
        next: (v) => console.log(v),
        error: (e) => (this.isSaveProcessing = false),
        complete: () => {
          this.isSaveProcessing = false;
          alertify.notify(Common.commonSuccessMessage, "success");
        },
      });
    }
  }
}
