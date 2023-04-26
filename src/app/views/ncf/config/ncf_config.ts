export const config = {
    filters: [
        {
            "label": "Progress Status",
            "name": "Progress",
            "tableAlias": "t",
            "id": "category_id",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "query": "SELECT category_name,category_id FROM dimensions.categoryncf ORDER BY id ASC "
        },
    ],
 
    progress_status: {
        "label": "Progress Status",
        "filters":
        [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions":
                {
                    "queries":
                    {
                        "map":"select t.state_id,state_name,t.quiz_name, sum(sum) as participation from datasets.ncert_totalenrollments_state0quizncert as t join dimensions.state as t2 on t.state_id=t2.state_id group by t.state_id,t.quiz_name,state_name"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            },
            
        ],
    "options":
    {
        "map":
        {
            "indicator": "participation",
            "indicatorType": "percent",
            "legend": {
                "title": "Progress Status"
            },
            "tooltipMetrics":
                [
                    {
                        "valuePrefix": "State UT/Name : ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "quiz_name",
                        "valueSuffix": "\n"
                    },
                    
                ]
        }
    }
    },

    disanc_survey_map: {
        "label": "DiSanc Survey",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select t.state_id ,state_name,sum(sum) as participants from datasets.ncf_number_of_participants_state as t join dimensions.state as t1 on t1.state_id = t.state_id group by t.state_id,state_name "
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "map": {
                "metricFilterNeeded": false,
                "indicator": "participants",
                "legend": {
                    "title": "DiSanc Survey"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name :",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Number of Participants :",
                        "value": "participants",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    
    disanc_survey_bar: {
        "label": "DiSanc Survey",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "actions": {
                    "queries": {
                        "barChart": "select language_name as language, sum(sum) as participants from datasets.ncf_number_of_participants_languagencf group by language",
                    },
                    "level": "state"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "yAxis": {
                    "title": "Number of Participanatnce"
                },
                "xAxis": {
                    "title": " Number of participants",
                    "label": "language",
                    "value": "language",
                    "metrics": [
                        {
                            "label": "Number of participants",
                            "value": "participants"
                        },
                        
                    ]
                }
            }
        }
    },

    ncf_metrics: {
        "label": "Progress Status",
        "filters": [
            {
                "name": "National",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        
                        "bigNumber1": "",
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Districts',],
                "property": ['total_districts']
            }
        }
    }
}