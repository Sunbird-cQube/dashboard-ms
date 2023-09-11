export const config = {
    filters: [
        // {
        //     "label": "telemetry",
        //     "name": "Metric",
        //     "labelProp": "category_name",
        //     "valueProp": "category_name",
        //     "id": "metric",
        //     "query": ""
        // },
    ],
    telemetry_metrics: {
        "label": "Telemetry",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1":"select count(userid) as daily_user_count from datasets.telemetry_usercount_daily_users where date = current_date",
                        "bigNumber2":"select count(userid) as weekly_user_count from datasets.telemetry_usercount_daily_users where date between current_date - interval '7 days' and current_date "
                    },
                    "level": "state"
                }
            },
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1":"select count(userid) as daily_user_count from datasets.telemetry_usercount_daily_users where date = current_date",
                        "bigNumber2":"select count(userid) as weekly_user_count from datasets.telemetry_usercount_daily_users where date between current_date - interval '7 days' and current_date "                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Daily Active User', 'Weekly Active User', '% Schools With Toilets', '% Schools Having Electricity', '% Schools Having Drinking Water'],
                "valueSuffix": ['', '', '%', '%', '%'],
                "property": ['daily_user_count', 'weekly_user_count', 'schs_with_toilet', 'schs_having_electricity', 'schs_having_water']
            }
        }
    },
    browserTypeWiseBarChart: {
        "label": "Telemetry",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "barChart": "select count(userid) as user_count, browsername from datasets.telemetry_browserscount_zgr6vhegehrjbhb__cx0s where date between startDate and endDate group by browsername",
                    },
                    "level": "district"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select count(userid) as user_count, browsername from datasets.telemetry_browserscount_zgr6vhegehrjbhb__cx0s where date between startDate and endDate group by browsername",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "",
                "yAxis": {
                    "title": "User Count"
                },
                "xAxis": {
                    "title": "Browsers",
                    "label": "browsername",
                    "value": "browsername",
                    "metrics": [
                        {
                            "label": "User Count",
                            "value": "user_count"
                        },
                    ]
                }
            },
        }
    },
    deviceTypeWiseBarChart: {
        "label": "Telemetry",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "barChart": "select count(userid) as user_count, devicename from datasets.telemetry_devicescount_ynndeshvzvtuxwh6dzyw where date between startDate and endDate group by devicename",
                    },
                    "level": "district"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select count(userid) as user_count, devicename from datasets.telemetry_devicescount_ynndeshvzvtuxwh6dzyw where date between startDate and endDate group by devicename",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "",
                "yAxis": {
                    "title": "User Conunt"
                },
                "xAxis": {
                    "title": "Device Name",
                    "label": "devicename",
                    "value": "devicename",
                    "metrics": [
                        {
                            "label": "User Count",
                            "value": "user_count"
                        },
                    
                    ]
                }
            },
        }
    },
    popularLandingPagesBarChart: {
        "label": "% against Potential Base",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select t1.program_name, round(cast(avg(t1.sum) as numeric),2) as target_achieved, round(cast(avg(t1.sum) as numeric) + (cast(avg(t2.sum) as numeric)),2) as total_target from datasets.nishtha_perc_target_achieved_enrolment_programnishtha as t1 join datasets.nishtha_perc_target_remaining_enrolment_programnishtha as t2 on t1.program_name = t2.program_name group by t1.program_name",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": ""
                },
                "xAxis": {
                    "title": " Programs",
                    "label": "program_name",
                    "value": "program_name",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Enrolment",
                            "value": "target_achieved"
                        },
                        {
                            "label": "% Total Target-Enrolment",
                            "value": "total_target"
                        }
                    ]
                }
            },
            "stackedBarChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": "States",
                    "label": "state_name",
                    "value": "state_name",
                },
                "xAxis": {
                    "title": "",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Enrolment",
                            "value": "achieved_enrollments_per"
                        },
                        {
                            "label": "% Total Target-Enrolment",
                            "value": "expected_enrollments_per"
                        }
                    ]
                }
            }
        }
    },
    timeSpentPerPageBarChart: {
        "label": "% against Potential Base",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select t1.program_name, round(cast(avg(t1.sum) as numeric),2) as target_achieved, round(cast(avg(t1.sum) as numeric) + (cast(avg(t2.sum) as numeric)),2) as total_target from datasets.nishtha_perc_target_achieved_enrolment_programnishtha as t1 join datasets.nishtha_perc_target_remaining_enrolment_programnishtha as t2 on t1.program_name = t2.program_name group by t1.program_name",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": ""
                },
                "xAxis": {
                    "title": " Programs",
                    "label": "program_name",
                    "value": "program_name",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Enrolment",
                            "value": "target_achieved"
                        },
                        {
                            "label": "% Total Target-Enrolment",
                            "value": "total_target"
                        }
                    ]
                }
            },
            "stackedBarChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": "States",
                    "label": "state_name",
                    "value": "state_name",
                },
                "xAxis": {
                    "title": "",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Enrolment",
                            "value": "achieved_enrollments_per"
                        },
                        {
                            "label": "% Total Target-Enrolment",
                            "value": "expected_enrollments_per"
                        }
                    ]
                }
            }
        }
    },

}