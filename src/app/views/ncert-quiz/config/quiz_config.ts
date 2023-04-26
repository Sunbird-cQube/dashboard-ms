export const config = {
    filters: [
        {
            "label": "Participation Status",
            "name": "Participation",
            "tableAlias": "t",
            "id": "",
            "labelProp": "quiz_name",
            "valueProp": "quiz_name",
            "query": "SELECT quiz_name FROM dimensions.quizncert ORDER BY id ASC "
        },

    ],
    implementation_status: {
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.ncert_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "map": {
                "metricFilterNeeded": false,
                "indicator": "status",
                "legend": {
                    "title": "NCERT Quizes Started"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name :",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "NCERT Quizes Started :",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    participation_status:
    {
        "label": "Participation Status",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map":"select t3.district_id, district_name,latitude,longitude, lo_name , round(cast(sum(t.sum) as numeric ),2) as performance from datasets.nas_performance_district0lo0subject0grade as t join dimensions.lo as t2 on t.lo_code = t2.lo_code join dimensions.district as t3 on t.district_id = t3.district_id group by district_name,lo_name,t3.district_id,latitude,longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                },
                {
                    "name": "State",
                    "hierarchyLevel": "1",
                    "actions":
                    {
                        "queries": {
                            "map": "select lo_name, round(cast(avg(sum) as numeric),2) as performance, t.district_id, district_name from datasets.nas_performance_district0lo0subject0grade as t join dimensions.district as d on t.district_id = d.district_id join dimensions.lo as l on t.lo_code = l.lo_code group by t.district_id, district_name, lo_name"
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "map":
            {
                "indicator": "performance",
                "indicatorType": "percent",
                "legend": {
                    "title": "Participation Status"
                },
                "tooltipMetrics":
                    [
                        {
                            "valuePrefix": "State UT/Name : ",
                            "value": "district_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Quiz Name: ",
                            "value": "lo_name",
                            "valueSuffix": "\n"
                        },
                        
                    ]
            }
        }
    },
    quiz_wise_status: {
        "label": "Quiz wise Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "table":"select t1.quiz_name, sum(t1.sum) as total_enrolments, sum(t2.sum) as certificate_issued,sum(t3.sum) as completion from datasets.ncert_total_enrollments_quizncert as t1 join datasets.ncert_certificate_issued_100_perc_completion_quizncert as t2 on t1.quiz_name = t2.quiz_name join datasets.ncert_completion_perc_quizncert as t3 on t2.quiz_name=t3.quiz_name group by t1.quiz_name",
                        },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Quiz Name",
                        property: "quiz_name",
                        class: "text-center"
                    },
                    {
                        name: "Total Enrolments",
                        property: "total_enrolments",
                        class: "text-center"
                    },
                    {
                        name: "Certificate Issued (100% completion)",
                        property: "certificate_issued",
                        class: "text-center"
                    },
                    {
                        name: "Completion %",
                        property: "completion",
                        class: "text-center"
                    },
                    {
                        name: "Medium",
                        property: "",
                        class: "text-center"
                    }
                ],
            }
        }
    },
}