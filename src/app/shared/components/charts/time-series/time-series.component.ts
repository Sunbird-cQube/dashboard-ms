import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
    selector: 'app-time-series-chart',
    templateUrl: './time-series.component.html',
    styleUrls: ['./time-series.component.scss']
})
export class TimeSeriesComponent implements OnInit, OnChanges {
    chart!: Highcharts.Chart;
    @Input() height: number | string = 'auto';
    @Input() title!: string;
    @Input() options: Highcharts.Options | undefined;
    @Input() marginTop: any = 90;

    @ViewChild('container') container: any;

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {

        const elFontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');

        const localFontSize = localStorage.getItem('fontSize');
        const currentFontSize = localFontSize ? localFontSize : elFontSize;
        this.chart.update(
            {
                xAxis: {
                    labels: {
                        step: 1,
                        style: {
                            fontSize: currentFontSize
                        }
                    }
                },
                yAxis: {
                    labels: {
                        style: {
                            fontSize: currentFontSize
                        }
                    }
                },
                tooltip: {
                    style: {
                        fontSize: currentFontSize
                    }
                },
                legend: {
                    itemStyle: {
                        fontSize: currentFontSize
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            style: {
                                fontSize: currentFontSize
                            }
                        }
                    }
                },
            }
        )
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.options !== undefined) {
            setTimeout(() => {
                this.createMultiBarChart(this.options);
            }, 100);
        }
    }

    createMultiBarChart(options: Highcharts.Options | undefined): void {
        let defaultOptions: Highcharts.Options = {
            chart: {
                // zoomType: 'x'
            },
            title: {
                text: '',
                align: 'left'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: []
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            }
        };
        this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(defaultOptions, options), function (this: any) {
        });
    }
}
