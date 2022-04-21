import { DialogNamePromptComponent } from './../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbDialogRef } from '@nebular/theme';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-yes-no",
  templateUrl: "./yes-no.component.html",
  styleUrls: ["./yes-no.component.scss"],
})
export class YesNoComponent implements OnInit {

  ngOnInit(): void {}

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {}

  no() {
    this.ref.close(false);
  }

  yes() {
    this.ref.close(true);
  }
}
