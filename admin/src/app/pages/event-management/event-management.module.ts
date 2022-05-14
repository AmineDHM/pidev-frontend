import { ModalOverlaysModule } from "./../modal-overlays/modal-overlays.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbTimepickerModule,
  NbTreeGridModule,
  NbUserModule,
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
import { NewEventComponent } from "./new-event/new-event.component";
import { ShowEventsComponent } from "./show-events/show-events.component";
import { YesNoComponent } from "./yes-no/yes-no.component";
import { MapComponent } from "./map/map.component";
import { NgxMapboxGLModule } from "ngx-mapbox-gl";
import { environment } from "../../../environments/environment";
import { InviteUsersComponent } from "./invite-users/invite-users.component";
import { DragDropFileUploadDirective } from "../../directives/drag-drop-file-upload.directive";
import { EventItemComponent } from './event-item/event-item.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgxEchartsModule } from "ngx-echarts";
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    NewEventComponent,
    ShowEventsComponent,
    EventManagementComponent,
    YesNoComponent,
    MapComponent,
    InviteUsersComponent,
    DragDropFileUploadDirective,
    EventItemComponent,
    StatisticsComponent,
    PieChartComponent,
  ],
  imports: [
    FormsModule,
    NbFormFieldModule,
    NbAlertModule,
    ReactiveFormsModule,
    CommonModule,
    NbUserModule,
    NbLayoutModule,
    NbStepperModule,
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
    NbListModule,
    NbTabsetModule,
    NbDialogModule.forChild(),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken,
      geocoderAccessToken: environment.mapbox.accessToken,
    }),
    NgxEchartsModule
  ],
})
export class EventManagementModule {}
