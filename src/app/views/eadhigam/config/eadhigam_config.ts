export const config = {
    filters: [
        {
            "label": "District Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categorypm"
        },
    ],
    implementation_status:{
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select d.latitude, d.longitude, t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.pm_poshan_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "downloadConfig": {
                "fileName": "Implementation Status",
                "excludeColumns": ['indicator', 'tooltip', 'Latitude', 'Longitude']
            },
            "map": {
                "metricFilterNeeded": false,
                "indicator": "status",
                "legend": {
                    "title": "States Onboarded on PM Poshan"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Onboarded on PM Poshan: ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
  
    state_wise_progress_status: {
        "label": "State Wise Progress Status",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions": {
                        "queries":
                        {
                            "map": "select latitude, longitude, category_name as category_name, t2.state_name, t1.state_id, cast(sum(t1.sum) as numeric) as total_count FROM datasets.pm_poshan_category_daily_state0categorypm as t1 join dimensions.state as t2 on t1.state_id = t2.state_id group by t1.state_id,t2.state_name, category_name, latitude, longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                }
            ],
        "options":
        {
            "downloadConfig": {
                "fileName": "State Wise Progress Status",
                "excludeColumns": ['indicator', 'total_count', 'category_name', 'tooltip', 'Latitude', 'Longitude']
            },
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "total_count",
                "groupByColumn": "state_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District Wise Progress Status" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {   
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
   

    teacher_status:{
        "label": "Teacher Status",
        "filters":
            [
                // {
                //     "name": "National",
                //     "hierarchyLevel": "0",
                //     "actions": {
                //         "queries":
                //         {
                //             "map": "select latitude, longitude, category_name as category_name,t2.district_name,t1.district_id, cast(sum(t1.sum) as numeric) as total_count FROM datasets.pm_poshan_category_daily_district0categorypm as t1 join dimensions.district as t2 on t1.district_id = t2.district_id group by t1.district_id,t2.district_name, category_name, latitude, longitude"
                       
                //         },
                //         "level": "state",
                //         "nextLevel": "district"
                //     }
                // },
                {
                    "name": "State",
                    "hierarchyLevel": "1",
                    "actions": {
                        "queries":
                        {
                            "map": "select latitude, longitude, category_name as category_name,t2.district_name,t1.district_id, cast(sum(t1.sum) as numeric) as total_count FROM datasets.pm_poshan_category_district0categorypm as t1 join dimensions.district as t2 on t1.district_id = t2.district_id group by t1.district_id,t2.district_name, category_name, latitude, longitude",
                            "table": "select week, year, district_name ,(sum(sum)*100)/sum(count) from datasets.pal_adhigamstatusstudent_weekly_district group by week, year, district_name",
                            "table1": "select week, year, district_name ,(sum(sum)*100)/sum(count) from datasets.pal_adhigamstatusstudent_weekly_district group by week, year, district_name",
                            "table2": "select week, year, district_name ,(sum(sum)*100)/sum(count) from datasets.pal_adhigamstatusstudent_weekly_district group by week, year, district_name",

                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "downloadConfig": {
                "fileName": "Teacher Status",
                "excludeColumns": ['indicator', 'total_count', 'category_name', 'tooltip', 'Latitude', 'Longitude']
            },
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "fillEmptyCell": "N/A",
                "columns": [

                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "subject",
                "sortDirection": "asc"
            },
            "table1": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "fillEmptyCell": "N/A",
                "columns": [

                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "subject",
                "sortDirection": "asc"
            },
            "table2": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "fillEmptyCell": "N/A",
                "columns": [

                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "subject",
                "sortDirection": "asc"
            },
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "total_count",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "Teacher Status" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {   
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    student_status:{
        "label": "Student Status",
        "filters":
            [
                {
                    "name": "State",
                    "hierarchyLevel": "1",
                    "actions": {
                        "queries":
                        {
                            "map": "select week, year, district_id, pal_aswk.district_name, (sum(sum)*100)/sum(count) as eadhigam_perct  from datasets.pal_adhigamstatusstudent_weekly_district as pal_aswk left join dimensions.district d on d.district_name = pal_aswk.district_name group by week, year, district_id, pal_aswk.district_name",
                            "table": "select week, year, district_name ,(sum(sum)*100)/sum(count) from datasets.pal_adhigamstatusstudent_weekly_district group by week, year, district_name",
                            "table1": "select week, year, district_name ,(sum(sum)*100)/sum(count) from datasets.pal_adhigamstatusstudent_weekly_district group by week, year, district_name",
                            "table2": "select week, year, district_name ,(sum(sum)*100)/sum(count) from datasets.pal_adhigamstatusstudent_weekly_district group by week, year, district_name",
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "downloadConfig": {
                "fileName": "Student Status",
                "excludeColumns": ['indicator', 'total_count', 'category_name', 'tooltip', 'Latitude', 'Longitude']
            },
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "fillEmptyCell": "N/A",
                "columns": [

                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "subject",
                "sortDirection": "asc"
            },
            "table1": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "fillEmptyCell": "N/A",
                "columns": [

                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "subject",
                "sortDirection": "asc"
            },
            "table2": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "fillEmptyCell": "N/A",
                "columns": [

                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "subject",
                "sortDirection": "asc"
            },
            "map": {
                "metricLabelProp": "eadhigam_perct",
                "metricValueProp": "eadhigam_perct",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "Student Status" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {   
                        "valuePrefix": "",
                        "value": "eadhigam_perct",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    teacher_metrics:{
        "label": "Teacher Status",
        "filters": [
                 {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "SELECT count(*) FROM dimensions.teacher",
                        "bigNumber2": "select week, year, round(cast((sum(sum)*100)/sum(count) as numeric),2) as count from datasets.pal_adhigamstatus_weekly_district group by week, year", 
                        "bigNumber3": "select year, week, round(cast(sum(sum)/sum(count) as numeric),2) as count from datasets.pal_app_usage_weekly_district group by year, week",
                        "bigNumber4": "select week, year, round(cast(sum(sum)/sum(count) as numeric),2) as count from datasets.pal_assignments_weekly_teacher where sum != 'NaN' group by week, year",
                        "bigNumber5": "Select 0 as count",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Teachers','e-Adhigam Teachers','Teachers - Average Weekly Usage (in mins)','Number of Homework Assigned Per Teacher','Average Time Spent on Student Monitoring - ( in mins)'],
                "valueSuffix": ['','%','','',''],
                "property": ['count','count','count','count','count']
            }
        }
    },
    student_metrics: {
        "label": "Student Status",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select week, year, sum(count) as count from datasets.pal_student_count_weekly_district pscwd group by week, year",
                        "bigNumber2": "select week, year, round(cast((sum(sum)*100)/sum(count) as numeric),2) as count from datasets.pal_adhigamstatusstudent_weekly_district group by week, year",
                        "bigNumber3": "select week, year, round(cast(sum(sum)/sum(count) as numeric),2) as count from datasets.pal_total_usage_weekly_district group by week, year",
                        "bigNumber4": "select remedial_weekly.year, remedial_weekly.week, round(cast(sum(remedial_weekly.sum)/sum(student_weekly.count) as numeric),2) as count from datasets.pal_remedial_weekly_district as remedial_weekly inner join datasets.pal_student_count_weekly_district as student_weekly on remedial_weekly.week = student_weekly.week and remedial_weekly.year = student_weekly.year and remedial_weekly.district_name = student_weekly.district_name group by remedial_weekly.year, remedial_weekly.week",
                        "bigNumber5": "select test_weekly.year, test_weekly.week, round(cast(sum(test_weekly.sum)/sum(student_weekly.count) as numeric),2) as count from datasets.pal_assignments_weekly_district as test_weekly inner join datasets.pal_student_count_weekly_district as student_weekly on test_weekly.week = student_weekly.week and test_weekly.year = student_weekly.year and test_weekly.district_name = student_weekly.district_name group by test_weekly.year, test_weekly.week",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Students','e-Adhigam Students','Students - Average Weekly Usage (in mins)','Number of Remedial Tests Taken Per Student','Number of Homework Attempted per Student'],
                "valueSuffix": ['','%','','',''],
                "property": ['count','count','count','count','count']
            }
        }
    }
}
