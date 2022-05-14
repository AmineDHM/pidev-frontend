import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { EventService } from "../../../services/event-services/event.service";

@Component({
  selector: "ngx-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  statistics: any = null;

  constructor(
    private theme: NbThemeService,
    private eventService: EventService
  ) {}

  async ngAfterViewInit() {
    await this.getStatistics();
    console.log(this.statistics);
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [
          colors.warningLight,
          colors.infoLight,
          colors.dangerLight,
          colors.successLight,
          colors.primaryLight,
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["Invited", "Accepted"],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: "Decions",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [
              { value: this.statistics?.invited || 1, name: "Invited" },
              { value: this.statistics?.accepted || 2, name: "Accepted" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  async getStatistics(): Promise<any> {
    const data = await this.eventService.getStatistics().toPromise();
    this.statistics = data
  }
}
