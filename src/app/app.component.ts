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
  formatteddataforMultiLineChart: Array<any> = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get<any>(
        'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
      )
      .subscribe((data) => {
        if (data) {
          console.log('data', data);
          this.employeeData = data;
          this.formattedTableData();
          this.formattedMultilineChartData();
        }
      });
  }
  formattedTableData() {
    this.employeeData.forEach((element: any) => {
      if (this.newRecord.includes(element.EmployeeName)) {
        var index = this.newRecord.indexOf(element.EmployeeName);
        let worklog = [];
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
    //calculating total percentage
    this.newRecordValue.forEach((element: number) => {
      this.totalTimeWorkedByEmployee += element;
    });
    //Loopimg through the array to push the name and percentage to pieChartData variable to be used by pie chart
    for (let i = 0; i < this.newRecord.length; i++) {
      let name = this.newRecord[i];
      let hoursWorkedinPercentage =
        (this.newRecordValue[i] / this.totalTimeWorkedByEmployee) * 100;
      this.pieChartData.push({
        name: name ? name : 'unknown',
        y: hoursWorkedinPercentage,
      });
    }
  }

  getTotalTime(startTime: any, endTime: any) {
    return Math.floor(
      (new Date(endTime).getTime() - new Date(startTime).getTime()) / 3600000
    );
  }
  series: [
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    },
    {
      name: string;
      data: any[any];
    }
  ] = [
    {
      name: 'Abhay Singh',
      data: [],
    },
    {
      name: 'Tamoy Smith',
      data: [],
    },
    {
      name: 'Mary Poppins',
      data: [],
    },
    {
      name: 'Patrick Huthinson',
      data: [],
    },
    {
      name: 'Kavvay Verma',
      data: [],
    },
    {
      name: 'John Black',
      data: [],
    },
    {
      name: 'Tim Perkinson',
      data: [],
    },
    {
      name: 'Rita Alley',
      data: [],
    },
    {
      name: 'Raju Sunuwar',
      data: [],
    },
    {
      name: 'Stewart Malachi',
      data: [],
    },
    {
      name: 'Unknown',
      data: [],
    },
  ];
  formattedMultilineChartData() {
    this.employeeData.forEach((point: any) => {
      this.series.forEach((seriesItem) => {
        if (seriesItem.name === point.EmployeeName) {
          seriesItem.data?.push(
            // x: point.StarTimeUtc.slice(0,9),
            // y: this.getTotalTime(point.StarTimeUtc, point.EndTimeUtc)
            this.getTotalTime(point.StarTimeUtc, point.EndTimeUtc)
          );
        }
      });
    });
    console.log('this.series', this.series);
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

    yAxis: {
      title: {
        text: 'Number of Employees',
      },
    },

    xAxis: {
      title: {
        text: 'Dates',
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
    series: this.series,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 1600,
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
