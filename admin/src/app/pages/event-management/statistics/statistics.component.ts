import { Component, OnInit } from "@angular/core";
import { EventService } from "../../../services/event-services/event.service";

@Component({
  selector: "ngx-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"],
})
export class StatisticsComponent implements OnInit {
  constructor(private eventService: EventService) {}

  statistics: any = null;

  async ngOnInit() {
    await this.getStatistics();
  }

  async getStatistics(): Promise<any> {
    const data = await this.eventService.getStatistics().toPromise();
    this.statistics = data;
  }
}
