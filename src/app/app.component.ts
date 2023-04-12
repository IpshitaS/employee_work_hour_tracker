import { AfterViewInit, Component, OnInit, VERSION } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HighchartsChartModule, HttpClientModule, CommonModule],
})
export class AppComponent implements OnInit {
  employeeData: any = [];
  newRecord: any = [];
  newRecordValue: any = [];
  pieChartData: any = [];
  totalTimeWorkedByEmployee: number = 0;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get<any>(
        'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
      )
      .subscribe((data) => {
        if (data) {
          this.employeeData = data;
          this.formattedTableData();
        }
      });
  }
  formattedTableData() {
    this.employeeData.forEach((element: any) => {
      if (this.newRecord.includes(element.EmployeeName)) {
        var index = this.newRecord.indexOf(element.EmployeeName);
        this.newRecordValue[index] += this.getTotalTime(
          element.StarTimeUtc,
          element.EndTimeUtc
        );
      } else {
        this.newRecord.push(element.EmployeeName);
        this.newRecordValue.push(
          this.getTotalTime(element.StarTimeUtc, element.EndTimeUtc)
        );
      }
    });
    for (let i = 0; i < this.newRecord.length; i++) {
      this.totalTimeWorkedByEmployee += this.newRecordValue[i];
      let name = this.newRecord[i];
      let hoursWorked =
        (this.newRecordValue[i] / this.totalTimeWorkedByEmployee) * 100;

      this.pieChartData.push({ name: name ? name : 'unknown', y: hoursWorked });
    }
    console.log(
      'formatted data',
      this.newRecord,
      this.newRecordValue,
      this.pieChartData,
      this.totalTimeWorkedByEmployee
    );
  }

  getTotalTime(startTime: any, endTime: any) {
    return Math.floor(
      (new Date(endTime).getTime() - new Date(startTime).getTime()) / 3600000
    );
  }

  Highcharts = Highcharts;

  pieChart: any = {
    series: [
      {
        data: this.pieChartData,
      },
    ],
    chart: {
      type: 'pie',
    },
    title: {
      text: null,
    },
    legend: {
      layout: 'horizontal',
      itemStyle: {
        fontWeight: 'normal',
        textOverflow: 'ellipsis',
        fontSize: '12px',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
        dataLables: {
          enabled: false,
        },
      },
    },
  };
  lineChart: any = {
    title: {
      text: null,
    },

    subtitle: {
      text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
      align: 'left',
    },

    yAxis: {
      title: {
        text: 'Number of Employees',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2020',
      },
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: [
      {
        name: 'Installation & Developers',
        data: [
          43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
          161454, 154610,
        ],
      },
      {
        name: 'Manufacturing',
        data: [
          24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243,
          31050,
        ],
      },
      {
        name: 'Sales & Distribution',
        data: [
          11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213,
          25663,
        ],
      },
      {
        name: 'Operations & Maintenance',
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          11164,
          11218,
          10077,
        ],
      },
      {
        name: 'Other',
        data: [
          21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906,
          10073,
        ],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
    credits: {
      enabled: false,
    },
  };
}
