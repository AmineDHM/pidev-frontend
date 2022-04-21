import { ModalOverlaysModule } from "./../modal-overlays/modal-overlays.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbActionsModule,
  NbButtonModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTimepickerModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { ThemeModule } from "./../../@theme/theme.module";
import {
  NbCardModule,
  NbCheckboxModule,
  NbRadioModule,
  NbInputModule,
} from "@nebular/theme";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EventManagementRoutingModule } from "./event-management-routing.module";
import { EventManagementComponent } from "./event-management.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NewEventComponent } from './new-event/new-event.component';
import { ShowEventsComponent } from './show-events/show-events.component';
import { YesNoComponent } from './yes-no/yes-no.component';

@NgModule({
  declarations: [
    NewEventComponent,
    ShowEventsComponent,
    EventManagementComponent,
    YesNoComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EventManagementRoutingModule,
    ThemeModule,
    NbSpinnerModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbSelectModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    Ng2SmartTableModule,
    ModalOverlaysModule,
    NbDialogModule.forChild()
  ],
})
export class EventManagementModule {}
