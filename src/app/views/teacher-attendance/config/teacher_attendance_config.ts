export const config = {


    tas_average_attendance_map:{
        "label": "Average Teachers Present",
        "filters":
            [
                {
                    "name": "State",
                    "hierarchyLevel": "1",
                    "timeSeriesQueries": {
                        "map": "select a.district_id, district_wise_table.district_name,sum(a.total_teachers) as total_teachers,sum(a.teachers_present) as teachers_present,count(s.school_id) as total_schools, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.district_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_district as present_table join datasets.sch_att_total_teachers_daily_district as total_teachers on present_table.date = total_teachers.date and present_table.district_id = total_teachers.district_id) as a join dimensions.district as district_wise_table on district_wise_table.district_id = a.district_id join dimensions.school as s on a.district_id = s.district_id where a.att_date between startDate and endDate group by a.district_id, district_wise_table.district_name order by stt_avg asc",
                    },
                    "actions": {
                        "queries": {
                            "map": "select a.district_id, district_name,sum(a.total_teachers) as total_teachers,sum(a.teachers_present) as teachers_present,count(s.school_id) as total_schools, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.district_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_district as present_table join datasets.sch_att_total_teachers_daily_district as total_teachers on present_table.date = total_teachers.date and present_table.district_id = total_teachers.district_id) as a join dimensions.district as district_wise_table on district_wise_table.district_id = a.district_id where a.att_date between startDate and endDate group by a.district_id, district_name order by stt_avg asc",
                        },
                        "level": "district"
                    }
                },
                {
                    "name": "District",
                    "hierarchyLevel": "2",
                    "timeSeriesQueries": {
                        "map": "select avg(cast (s.latitude as numeric)) as latitude, avg(cast (s.longitude as numeric)) as longitude, a.block_id, block_wise_table.block_name, sum(a.total_teachers) as total_teachers,sum(a.teachers_present) as teachers_present,count(s.school_id) as total_schools, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from (select present_table.block_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_block as present_table join datasets.sch_att_total_teachers_daily_block as total_teachers on present_table.date = total_teachers.date and present_table.block_id = total_teachers.block_id) as a full join dimensions.block as block_wise_table on block_wise_table.block_id = a.block_id full join dimensions.school as s on s.block_id = block_wise_table.block_id where block_wise_table.district_id = {district_id} and a.att_date between startDate and endDate group by a.block_id, block_wise_table.block_name order by stt_avg asc",
                    },
                    "actions": {
                        "queries": {
                            "map": "",
                        },
                        "level": "block"
                    }
                },
                {
                    "name": "Block",
                    "hierarchyLevel": "3",
                    "timeSeriesQueries": {
                        "map": "select avg(cast (s.latitude as numeric)) as latitude, avg(cast (s.longitude as numeric)) as longitude, a.cluster_id, cluster_wise_table.cluster_name, sum(a.total_teachers) as total_teachers,sum(a.teachers_present) as teachers_present,count(s.school_id) as total_schools, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.cluster_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_cluster as present_table join datasets.sch_att_total_teachers_daily_cluster as total_teachers on present_table.date = total_teachers.date and present_table.cluster_id = total_teachers.cluster_id) as a join dimensions.cluster as cluster_wise_table on cluster_wise_table.cluster_id = a.cluster_id full join dimensions.school as s on cluster_wise_table.cluster_id = s.cluster_id where cluster_wise_table.block_id = {block_id} and a.att_date between startDate and endDate group by a.cluster_id, cluster_wise_table.cluster_name order by stt_avg asc",
                    },
                    "actions": {
                        "queries": {
                            "map": "",
                        },
                        "level": "cluster"
                    }
                },
                {
                    "name": "Cluster",
                    "hierarchyLevel": "4",
                    "timeSeriesQueries": {
                        "map": "select latitude, longitude, a.school_id, school_name, sum(a.total_teachers) as total_teachers ,sum(a.teachers_present) as teachers_present, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_school as present_table join datasets.sch_att_total_teachers_daily_school as total_teachers on present_table.date = total_teachers.date and present_table.school_id = total_teachers.school_id) as a join dimensions.school as school_wise_table on school_wise_table.school_id = a.school_id where cluster_id = {cluster_id} and a.att_date between startDate and endDate group by a.school_id, school_name, latitude, longitude order by stt_avg asc",
                    },
                    "actions": {
                        "queries": {
                            "map": "",
                        },
                        "level": "school"
                    }
                }
            ],
        "options":
        {
            "map": {
                "indicatorType": "percent",
                "indicator": "stt_avg",
                "legend": { "title": "Average Teachers Present" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Id: ",
                        "value": "district_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Block Id: ",
                        "value": "block_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Block Name: ",
                        "value": "block_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Cluster Id: ",
                        "value": "cluster_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Cluster Name: ",
                        "value": "cluster_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "School Id: ",
                        "value": "school_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "School Name: ",
                        "value": "school_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total Schools: ",
                        "value": "total_schools",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total Teachers: ",
                        "value": "total_teachers",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total Teachers Present: ",
                        "value": "teachers_present",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Average Teachers Present: ",
                        "value": "stt_avg",
                        "valueSuffix": "%\n"
                    }
                ]
            }
        }
    },

    // tac_average_attendance_compliance: {
    //     "label": "Average Teachers Reporting Attendance",
    //     "defaultLevel": "state",
    //     "filters": [
    //         {
    //             "name": "State",
    //             "labelProp": "state_name",
    //             "valueProp": "state_id",
    //             "hierarchyLevel": "1",
    //             "timeSeriesQueries": {
    //                 "table": "SELECT Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / Cast( Count(t2.school_id) AS NUMERIC)) * 100) AS compliance_percentage, t2.district_id, t2.district_name FROM (SELECT c.percentage, c.school_id AS school_id FROM (SELECT a.school_id, ( Sum(a.sum) / Sum(b.sum) ) * 100 AS percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date WHERE a.date BETWEEN startDate AND endDate GROUP BY a.school_id) AS c WHERE c.percentage > 50) AS t1 FULL JOIN (SELECT d.school_id, e.district_id, e.district_name FROM datasets.sch_att_teachers_marked_daily_school AS d JOIN dimensions.school AS e ON d.school_id = e.school_id GROUP BY d.school_id, e.district_id, e.district_name) AS t2 ON t1.school_id = t2.school_id GROUP BY t2.district_id, t2.district_name order by Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / Cast ( Count(t2.school_id) AS NUMERIC) ) * 100) desc",
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
    //                 },
    //                 "level": "district"
    //             }
    //         },
    //         {
    //             "name": "District",
    //             "labelProp": "district_name",
    //             "valueProp": "district_id",
    //             "hierarchyLevel": "2",
    //             "timeSeriesQueries": {
    //                 "table": "SELECT Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / NULLIF(Cast(Count(t2.school_id) AS NUMERIC), 0)) * 100) AS compliance_percentage, t2.block_id, t2.block_name FROM(SELECT c.percentage, c.school_id AS school_id FROM (SELECT a.school_id, ( Sum(a.sum) / Sum(b.sum) ) * 100 AS percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date WHERE a.date BETWEEN startDate AND endDate GROUP BY a.school_id) AS c WHERE c.percentage > 50) AS t1 FULL JOIN (SELECT d.school_id, e.block_id, e.block_name FROM datasets.sch_att_teachers_marked_daily_school AS d JOIN dimensions.school AS e ON d.school_id = e.school_id WHERE e.district_id = {district_id} GROUP BY d.school_id, e.block_id, e.block_name) AS t2 ON t1.school_id = t2.school_id where t2.block_id is not null GROUP BY t2.block_id, t2.block_name order by Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / NULLIF(Cast(Count(t2.school_id) AS NUMERIC), 0) ) * 100) desc;"
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "table": "select min(date) as min_date, max(date) as max_date, block_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
    //                 },
    //                 "level": "block"
    //             }
    //         },
    //         {
    //             "name": "Block",
    //             "labelProp": "block_name",
    //             "valueProp": "block_id",
    //             "hierarchyLevel": "3",
    //             "timeSeriesQueries": {
    //                 "table": "SELECT Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / NULLIF(Cast( Count(t2.school_id) AS NUMERIC),0)) * 100) AS compliance_percentage, t2.cluster_id, t2.cluster_name FROM (SELECT c.percentage, c.school_id AS school_id FROM (SELECT a.school_id, ( Sum(a.sum) / Sum(b.sum) ) * 100 AS percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date WHERE a.date BETWEEN startDate and endDate GROUP BY a.school_id) AS c WHERE c.percentage > 50) AS t1 FULL JOIN (SELECT d.school_id, e.cluster_id, e.cluster_name FROM datasets.sch_att_teachers_marked_daily_school AS d JOIN dimensions.school AS e ON d.school_id = e.school_id WHERE e.block_id = {block_id} GROUP BY d.school_id, e.cluster_id, e.cluster_name) AS t2 ON t1.school_id = t2.school_id where cluster_id is not null GROUP BY t2.cluster_id, t2.cluster_name order by Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / NULLIF(Cast ( Count(t2.school_id) AS NUMERIC),0) ) * 100) desc"
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "table": "select min(date) as min_date, max(date) as max_date, cluster_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
    //                 },
    //                 "level": "cluster"
    //             }
    //         },
    //         {
    //             "name": "Cluster",
    //             "labelProp": "cluster_name",
    //             "valueProp": "cluster_id",
    //             "hierarchyLevel": "4",
    //             "timeSeriesQueries": {
    //                 "table": "SELECT e.school_name, Ceil(Round(Sum(a.sum) / Sum(b.sum) * 100)) AS compliance_percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date JOIN dimensions.school AS e ON a.school_id = e.school_id WHERE a.date BETWEEN startDate AND endDate AND e.cluster_id = {cluster_id} GROUP BY a.school_id, e.school_name order by Ceil(Round(Sum(a.sum) / Sum(b.sum) * 100)) desc"
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "table": "select min(date) as min_date, max(date) as max_date, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
    //                 },
    //                 "level": "school"
    //             }
    //         },
    //         // {
    //         //     "name": "School",
    //         //     "labelProp": "school_name",
    //         //     "valueProp": "school_id",
    //         //     "hierarchyLevel": "5",
    //         //     "timeSeriesQueries": {
    //         //         // "table":"select  e.school_name ,ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate group by a.school_id,e.school_name"
    //         //         "table": "" //in grade there is no school_id
    //         //     },
    //         //     "actions": {
    //         //         "queries": {
    //         //             "table": "select min(date) as min_date, max(date) as max_date, grade, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.school_id={school_id} group by grade,school_name,cluster_name,block_name,district_name",
    //         //         },
    //         //         "level": "school"
    //         //     }
    //         // }
    //     ],
    //     "options": {
    //         "table": {
    //             "columns": [
    //                 {
    //                     name: "State",
    //                     property: "state_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "District",
    //                     property: "district_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "Block",
    //                     property: "block_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "Cluster",
    //                     property: "cluster_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "School",
    //                     property: "school_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "Grade",
    //                     property: "grade",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "% Teachers Reporting Attendance",
    //                     property: "compliance_percentage",
    //                     class: "text-center",
    //                     valueSuffix: "%",
    //                     isHeatMapRequired: true,
    //                     color: {
    //                         type: "percentage",
    //                         values: [
    //                             {
    //                                 color: "#d8ead3",
    //                                 breakPoint: 70
    //                             },
    //                             {
    //                                 color: "#fff2cc",
    //                                 breakPoint: 40
    //                             },
    //                             {
    //                                 color: "#f4cccc",
    //                                 breakPoint: 0
    //                             }
    //                         ]
    //                     },
    //                 }
    //             ],
    //             "sortByProperty": "state_name",
    //             "sortDirection": "desc"
    //         },
    //         "bigNumber": {
    //             "valueSuffix": '%'
    //         }
    //     }
    // },
    // tac_average_attendance_compliance_bignumber: {
    //     "label": "Average Teachers Reporting Attendance",
    //     "filters": [
    //         {
    //             "name": "State",
    //             "labelProp": "state_name",
    //             "valueProp": "state_id",
    //             "hierarchyLevel": "1",
    //             "timeSeriesQueries": {
    //                 "bigNumber": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage from (select c.percentage, c.school_id as school_id from  (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDate group by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.district_id, e.district_name from datasets.sch_att_teachers_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id group by d.school_id, e.district_id, e.district_name) as t2 on t1.school_id = t2.school_id "
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "bigNumber": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage from (select c.percentage, c.school_id as school_id from  (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date group by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.district_id, e.district_name from datasets.sch_att_teachers_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id group by d.school_id, e.district_id, e.district_name) as t2 on t1.school_id = t2.school_id"
    //                 },
    //                 "level": "district"
    //             }
    //         },
    //         {
    //             "name": "District",
    //             "labelProp": "district_name",
    //             "valueProp": "district_id",
    //             "hierarchyLevel": "2",
    //             "timeSeriesQueries": {
    //                 "bigNumber": "SELECT Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / Cast( Count(t2.school_id) AS NUMERIC)) * 100) AS compliance_percentage FROM (SELECT c.percentage, c.school_id AS school_id FROM (SELECT a.school_id, ( Sum(a.sum) / Sum(b.sum) ) * 100 AS percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date WHERE a.date BETWEEN startDate AND endDate GROUP BY a.school_id) AS c WHERE c.percentage > 50) AS t1 FULL JOIN (SELECT d.school_id, e.district_id, e.district_name FROM datasets.sch_att_teachers_marked_daily_school AS d JOIN dimensions.school AS e ON d.school_id = e.school_id GROUP BY d.school_id, e.district_id, e.district_name) AS t2 ON t1.school_id = t2.school_id where district_id = {district_id} GROUP BY t2.district_id, t2.district_name "
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "bigNumber": "SELECT Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / Cast( Count(t2.school_id) AS NUMERIC)) * 100) AS compliance_percentage FROM (SELECT c.percentage, c.school_id AS school_id FROM (SELECT a.school_id, ( Sum(a.sum) / Sum(b.sum) ) * 100 AS percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date  GROUP BY a.school_id) AS c WHERE c.percentage > 50) AS t1 FULL JOIN (SELECT d.school_id, e.district_id, e.district_name FROM datasets.sch_att_teachers_marked_daily_school AS d JOIN dimensions.school AS e ON d.school_id = e.school_id GROUP BY d.school_id, e.district_id, e.district_name) AS t2 ON t1.school_id = t2.school_id where district_id = {district_id} GROUP BY t2.district_id, t2.district_name "
    //                 },
    //                 "level": "block"
    //             }
    //         },
    //         {
    //             "name": "Block",
    //             "labelProp": "block_name",
    //             "valueProp": "block_id",
    //             "hierarchyLevel": "3",
    //             "timeSeriesQueries": {
    //                 "bigNumber": "SELECT Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / Cast( Count(t2.school_id) AS NUMERIC)) * 100) AS compliance_percentage FROM (SELECT c.percentage, c.school_id AS school_id FROM (SELECT a.school_id, ( Sum(a.sum) / Sum(b.sum) ) * 100 AS percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date WHERE a.date BETWEEN startDate AND endDate GROUP BY a.school_id) AS c WHERE c.percentage > 50) AS t1 FULL JOIN (SELECT d.school_id, e.district_id, e.district_name, e.block_id, e.block_name FROM datasets.sch_att_teachers_marked_daily_school AS d JOIN dimensions.school AS e ON d.school_id = e.school_id GROUP BY d.school_id, e.district_id, e.district_name, e.block_id, e.block_name) AS t2 ON t1.school_id = t2.school_id where district_id = {district_id} and block_id = {block_id} GROUP BY t2.block_id, t2.block_name "
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "bigNumber": "SELECT Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / Cast( Count(t2.school_id) AS NUMERIC)) * 100) AS compliance_percentage FROM (SELECT c.percentage, c.school_id AS school_id FROM (SELECT a.school_id, ( Sum(a.sum) / Sum(b.sum) ) * 100 AS percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date  GROUP BY a.school_id) AS c WHERE c.percentage > 50) AS t1 FULL JOIN (SELECT d.school_id, e.district_id, e.district_name FROM datasets.sch_att_teachers_marked_daily_school AS d JOIN dimensions.school AS e ON d.school_id = e.school_id GROUP BY d.school_id, e.district_id, e.district_name) AS t2 ON t1.school_id = t2.school_id where district_id = {district_id} GROUP BY t2.district_id, t2.district_name "
    //                 },
    //                 "level": "cluster"
    //             }
    //         },
    //         {
    //             "name": "Cluster",
    //             "labelProp": "cluster_name",
    //             "valueProp": "cluster_id",
    //             "hierarchyLevel": "4",
    //             "timeSeriesQueries": {
    //                 "bigNumber": "select ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate and e.cluster_id={cluster_id}"
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "bigNumber": "select ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where e.cluster_id={cluster_id}"
    //                 },
    //                 "level": "school"
    //             }
    //         },
    //         {
    //             "name": "School",
    //             "labelProp": "school_name",
    //             "valueProp": "school_id",
    //             "hierarchyLevel": "5",
    //             "timeSeriesQueries": {
    //                 "bigNumber": "select ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate and a.school_id={school_id}"
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "bigNumber": "select ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.school_id={school_id}"
    //                 },
    //                 "level": "school"
    //             }
    //         },
    //         // {
    //         //     "name": "Grade",
    //         //     "labelProp": "grade",
    //         //     "valueProp": "grade",
    //         //     "hierarchyLevel": "6",
    //         //     "timeSeriesQueries": {
    //         //         "bigNumber": "select ceil(round(CAST(avg(a.teachers_present/a.teachers_marked)*100 as numeric),2)) as stt_avg from  (select present_table.grade_state, present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teacherspresent_daily_gender0school0grade as present_table join datasets.sch_att_teachersmarked_daily_gender0school0grade as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id and present_table.grade_state = marked_table.grade_state ) as a where school_id = {school_id} and grade_id = {grade_id} and a.att_date between startDate and endDate",
    //         //     },
    //         //     "actions": {
    //         //         "queries": {
    //         //             "bigNumber": "select ceil(round(CAST(avg(a.teachers_present/a.teachers_marked)*100 as numeric),2)) as stt_avg from  (select present_table.grade_state, present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teacherspresent_daily_gender0school0grade as present_table join datasets.sch_att_teachersmarked_daily_gender0school0grade as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id and present_table.grade_state = marked_table.grade_state ) as a where school_id = {school_id} and grade_id = {grade_id}",
    //         //         },
    //         //         "level": "school"
    //         //     }
    //         // }
    //     ],
    //     "options": {
    //         "bigNumber": {
    //             "title": "Average Teachers Reporting Attendance",
    //             "valueSuffix": '%',
    //             "property": 'compliance_percentage'
    //         }
    //     }
    // },
    // tac_attendance_compliance_rank: {
    //     "label": "Average Teachers Reporting Attendance",
    //     "defaultLevel": "district",
    //     "filters": [
    //         {
    //             "name": "District",
    //             "labelProp": "district_name",
    //             "valueProp": "district_id",
    //             "hierarchyLevel": "2",
    //             "timeSeriesQueries": {
    //                 "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, dense_rank() over(order by ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) desc) as rank, t2.district_id, t2.district_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDate group by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.district_id, e.district_name from datasets.sch_att_teachers_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id group by d.school_id, e.district_id, e.district_name) as t2 on t1.school_id = t2.school_id group by t2.district_id, t2.district_name "
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "table": "select district_name, dense_rank() over(order by avg(percentage) desc) as rank ,round(percentage ,0) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join (select distinct(district_id), state_id from ingestion.dimension_master) as m on m.district_id = t.district_id where state_id = {state_id} group by t.district_id, district_name,t.percentage",
    //                 },
    //                 "level": "block"
    //             }
    //         },
    //         {
    //             "name": "Block",
    //             "labelProp": "block_name",
    //             "valueProp": "block_id",
    //             "hierarchyLevel": "3",
    //             "timeSeriesQueries": {
    //                 "table": "SELECT Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / Cast( Count(t2.school_id) AS NUMERIC)) * 100) AS compliance_percentage, Dense_rank() OVER( ORDER BY Ceil((Cast( Count(t1.school_id) AS NUMERIC)/Cast (Count(t2.school_id) AS NUMERIC))*100) DESC) AS rank, t2.block_id, t2.block_name FROM (SELECT c.percentage, c.school_id AS school_id FROM (SELECT a.school_id, ( Sum(a.sum) / Sum(b.sum) ) * 100 AS percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date WHERE a.date BETWEEN startDate AND endDate GROUP BY a.school_id) AS c WHERE c.percentage > 50) AS t1 FULL JOIN (SELECT d.school_id, e.district_id, e.district_name, e.block_id, e.block_name FROM datasets.sch_att_teachers_marked_daily_school AS d JOIN dimensions.school AS e ON d.school_id = e.school_id GROUP BY d.school_id, e.district_id, e.district_name, e.block_id, e.block_name) AS t2 ON t1.school_id = t2.school_id where district_id = {district_id} GROUP BY t2.block_id, t2.block_name "
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "table": "select block_name, dense_rank() over(order by avg(percentage) desc) as rank ,round(percentage ,0) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join (select distinct(block_id), district_id from ingestion.dimension_master) as m on m.block_id = t.block_id where district_id = {district_id} group by t.block_id, block_name,t.percentage",
    //                 },
    //                 "level": "cluster"
    //             }
    //         },
    //         {
    //             "name": "Cluster",
    //             "labelProp": "cluster_name",
    //             "valueProp": "cluster_id",
    //             "hierarchyLevel": "4",
    //             "timeSeriesQueries": {
    //                 "table": "SELECT Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / Cast( Count(t2.school_id) AS NUMERIC)) * 100) AS compliance_percentage, Dense_rank() OVER( ORDER BY (Ceil(( Cast(Count(t1.school_id) AS NUMERIC) / Cast ( Count(t2.school_id) AS NUMERIC) ) * 100)) DESC) AS rank, t2.cluster_id, t2.cluster_name FROM (SELECT c.percentage, c.school_id AS school_id FROM (SELECT a.school_id, ( Sum(a.sum) / Sum(b.sum) ) * 100 AS percentage, Sum(b.sum) AS total_teachers, Sum(a.sum) AS attendace_marked FROM datasets.sch_att_total_teachers_daily_school AS b JOIN datasets.sch_att_teachers_marked_daily_school AS a ON a.school_id = b.school_id AND a.date = b.date WHERE a.date BETWEEN '2023-04-12' AND '2023-04-30' GROUP BY a.school_id) AS c WHERE c.percentage > 50) AS t1 FULL JOIN (SELECT d.school_id, e.cluster_id, e.cluster_name FROM datasets.sch_att_teachers_marked_daily_school AS d JOIN dimensions.school AS e ON d.school_id = e.school_id GROUP BY d.school_id, e.cluster_id, e.cluster_name) AS t2 ON t1.school_id = t2.school_id GROUP BY t2.cluster_id, t2.cluster_name"
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "table": "select cluster_name, dense_rank() over(order by avg(percentage) desc) as rank,round(percentage ,0) as percentage  from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join (select distinct(cluster_id), block_id from ingestion.dimension_master) as m on m.cluster_id = t.cluster_id where block_id = {block_id} group by t.cluster_id, cluster_name,t.percentage",
    //                 },
    //                 "level": "school"
    //             }
    //         },
    //         {
    //             "name": "School",
    //             "labelProp": "school_name",
    //             "valueProp": "school_id",
    //             "hierarchyLevel": "5",
    //             "timeSeriesQueries": {
    //                 "table": "select  e.school_name ,ceil(round(sum(a.sum)/sum(b.sum)*100)) as compliance_percentage,dense_rank() over(order by ceil(round(sum(a.sum)/sum(b.sum)*100)) desc) as rank, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate group by a.school_id,e.school_name"
    //             },
    //             "actions": {
    //                 "queries": {
    //                     "table": "select school_name, dense_rank() over(order by avg(percentage) desc) as rank ,round(percentage ,0) as percentage  from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_school as s on t.school_id = s.school_id left join (select distinct(school_id), cluster_id from ingestion.dimension_master) as m on m.school_id = t.school_id where cluster_id = {cluster_id} group by t.school_id, school_name,t.percentage",
    //                 },
    //                 "level": "class"
    //             }
    //         },
    //         // {
    //         //     "name": "Grade",
    //         //     "labelProp": "grade",
    //         //     "valueProp": "grade",
    //         //     "hierarchyLevel": "6",
    //         //     "timeSeriesQueries": {
    //         //         "table": "select grade_number, ceil(round(CAST(avg(a.teachers_present/a.teachers_marked)*100 as numeric),2)) as stt_avg, dense_rank() over(order by ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.teachers_marked, 0))*100) as numeric),2)) desc) as rank from (select present_table.grade_state, present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teacherspresent_daily_gender0school0grade as present_table join datasets.sch_att_teachersmarked_daily_gender0school0grade as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id and present_table.grade_state = marked_table.grade_state ) as a join dimensions.grade as grade_wise_table on grade_wise_table.grade_id = a.grade_state where school_id = {school_id} and a.att_date between startDate and endDate group by a.grade_state, grade_number",
    //         //     },
    //         //     "actions": {
    //         //         "queries": {
    //         //             "table": "select t.grade, dense_rank() over(order by avg(percentage) desc) as rank ,round(percentage ,0) as percentage  from ingestion.sac_stds_avg_atd_by_grade as t where school_id = {school_id} group by t.grade,t.percentage",
    //         //         },
    //         //         "level": "class"
    //         //     }
    //         // }
    //     ],
    //     "options": {
    //         "table": {
    //             "columns": [
    //                 {
    //                     name: "State",
    //                     property: "state_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "District",
    //                     property: "district_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "Block",
    //                     property: "block_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "Cluster",
    //                     property: "cluster_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "School",
    //                     property: "school_name",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "Grade",
    //                     property: "grade_number",
    //                     class: "text-center"
    //                 },
    //                 {
    //                     name: "% Teachers Reporting Attendance",
    //                     property: "compliance_percentage",
    //                     valueSuffix: '%',
    //                     class: "text-center",
    //                     isHeatMapRequired: true,
    //                     color: {
    //                         type: "percentage",
    //                         values: [
    //                             {
    //                                 color: "#d8ead3",
    //                                 breakPoint: 70
    //                             },
    //                             {
    //                                 color: "#fff2cc",
    //                                 breakPoint: 40
    //                             },
    //                             {
    //                                 color: "#f4cccc",
    //                                 breakPoint: 0
    //                             }
    //                         ]
    //                     },
    //                 },
    //                 {
    //                     name: "Rank in % Teachers Reporting Attendance",
    //                     property: "rank",
    //                     class: "text-center",
    //                     isHeatMapRequired: true,
    //                     color: '#fff'
    //                 },

    //             ],
    //         }
    //     }
    // },


    tas_average_attendance: {
        "label": "Average Teachers Present",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "timeSeriesQueries": {
                    "table": "select a.district_id, district_name, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.district_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_district as present_table join datasets.sch_att_total_teachers_daily_district as total_teachers on present_table.date = total_teachers.date and present_table.district_id = total_teachers.district_id) as a join dimensions.district as district_wise_table on district_wise_table.district_id = a.district_id where a.att_date between startDate and endDate group by a.district_id, district_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "table": "select a.block_id, block_name, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from (select present_table.block_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_block as present_table join datasets.sch_att_total_teachers_daily_block as total_teachers on present_table.date = total_teachers.date and present_table.block_id = total_teachers.block_id) as a join dimensions.block as block_wise_table on block_wise_table.block_id = a.block_id where district_id = {district_id} and a.att_date between startDate and endDate group by a.block_id, block_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "table": "select a.cluster_id, cluster_name, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.cluster_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_cluster as present_table join datasets.sch_att_total_teachers_daily_cluster as total_teachers on present_table.date = total_teachers.date and present_table.cluster_id = total_teachers.cluster_id) as a join dimensions.cluster as cluster_wise_table on cluster_wise_table.cluster_id = a.cluster_id where block_id = {block_id} and a.att_date between startDate and endDate group by a.cluster_id, cluster_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "table": "select school_name, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_school as present_table join datasets.sch_att_total_teachers_daily_school as total_teachers on present_table.date = total_teachers.date and present_table.school_id = total_teachers.school_id) as a join dimensions.school as school_wise_table on school_wise_table.school_id = a.school_id where cluster_id = {cluster_id} and a.att_date between startDate and endDate group by a.school_id, school_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                    },
                    "level": "school"
                }
            },
            // {
            //     "name": "School",
            //     "labelProp": "school_name",
            //     "valueProp": "school_id",
            //     "hierarchyLevel": "5",
            //     "timeSeriesQueries": {
            //         "table": "select grade_number, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.teachers_marked, 0))*100) as numeric),2)) as stt_avg from  (select present_table.grade_state, present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teacherspresent_daily_gender0school0grade as present_table join datasets.sch_att_teachersmarked_daily_gender0school0grade as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id and present_table.grade_state = marked_table.grade_state) as a join dimensions.grade as grade_wise_table on grade_wise_table.grade_id = a.grade_state where school_id = {school_id} and a.att_date between startDate and endDate group by a.grade_state, grade_number order by stt_avg asc",
            //     },
            //     "actions": {
            //         "queries": {
            //             "table": "select min(date) as min_date, max(date) as max_date, t.grade, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_avg_atd_by_grade as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where t.school_id={school_id} group by t.grade, school_name,cluster_name,block_name,district_name",
            //         },
            //         "level": "school"
            //     }
            // }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "State",
                        property: "state_name",
                        class: "text-center",
                        action: {
                            dataProps: [{
                                "prop": "state_id",
                                "alias": "id"
                            }, {
                                "prop": "state_name"
                            }],
                            extraInfo: {
                                hierarchyLevel: 1,
                                linkedReports: ["tas_average_attendance_barchart", "tas_average_attendance_bignumber", "tas_attendance_time_series"]
                            },
                            allowedLevels: [1]
                        }
                    },
                    {
                        name: "District",
                        property: "district_name",
                        class: "text-center",
                        action: {
                            dataProps: [{
                                "prop": "district_id",
                                "alias": "id"
                            }, {
                                "prop": "district_name"
                            }],
                            extraInfo: {
                                hierarchyLevel: 2,
                                linkedReports: ["tas_average_attendance_barchart", "tas_average_attendance_bignumber", "tas_attendance_time_series"]
                            },
                            allowedLevels: [1]
                        }
                    },
                    {
                        name: "Block",
                        property: "block_name",
                        class: "text-center",
                        action: {
                            dataProps: [{
                                "prop": "block_id",
                                "alias": "id"
                            }, {
                                "prop": "block_name"
                            }],
                            extraInfo: {
                                hierarchyLevel: 3,
                                linkedReports: ["tas_average_attendance_barchart", "tas_average_attendance_bignumber", "tas_attendance_time_series"]
                            },
                            allowedLevels: [1]
                        }
                    },
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        class: "text-center",
                        action: {
                            dataProps: [{
                                "prop": "cluster_id",
                                "alias": "id"
                            }, {
                                "prop": "cluster_name"
                            }],
                            extraInfo: {
                                hierarchyLevel: 4,
                                linkedReports: ["tas_average_attendance_barchart", "tas_average_attendance_bignumber", "tas_attendance_time_series"]
                            },
                            allowedLevels: [1]

                        }
                    },
                    {
                        name: "School",
                        property: "school_name",
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade_number",
                        class: "text-center"
                    },
                    {
                        name: "% Teachers Present",
                        property: "stt_avg",
                        class: "text-center",
                        valueSuffix: '%',
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
            },
            "bigNumber": {
                "valueSuffix": '%',
                "property": 'stt_avg'
            }
        }
    },

    tas_average_attendance_bignumber: {
        "label": "Average Teachers Present",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "timeSeriesQueries": {
                    "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from (select present_table.district_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_district as present_table join datasets.sch_att_total_teachers_daily_district as total_teachers on present_table.date = total_teachers.date and present_table.district_id = total_teachers.district_id) as a where a.att_date between startDate and endDate",
                    // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id}"
                },
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.district_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_district as present_table join datasets.sch_att_total_teachers_daily_district as total_teachers on present_table.date = total_teachers.date and present_table.district_id = total_teachers.district_id) as a",
                        // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id}"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from (select present_table.block_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_block as present_table join datasets.sch_att_total_teachers_daily_block as total_teachers on present_table.date = total_teachers.date and present_table.block_id = total_teachers.block_id) as a join dimensions.block as block_wise_table on block_wise_table.block_id = a.block_id where district_id = {district_id} and a.att_date between startDate and endDate",
                    // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                },
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from (select present_table.block_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_block as present_table join datasets.sch_att_total_teachers_daily_block as total_teachers on present_table.date = total_teachers.date and present_table.block_id = total_teachers.block_id) as a join dimensions.block as block_wise_table on block_wise_table.block_id = a.block_id where district_id = {district_id}",
                        // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.cluster_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_cluster as present_table join datasets.sch_att_total_teachers_daily_cluster as total_teachers on present_table.date = total_teachers.date and present_table.cluster_id = total_teachers.cluster_id) as a join dimensions.cluster as cluster_wise_table on cluster_wise_table.cluster_id = a.cluster_id where block_id = {block_id} and a.att_date between startDate and endDate",
                    // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                },
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.cluster_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_cluster as present_table join datasets.sch_att_total_teachers_daily_cluster as total_teachers on present_table.date = total_teachers.date and present_table.cluster_id = total_teachers.cluster_id) as a join dimensions.cluster as cluster_wise_table on cluster_wise_table.cluster_id = a.cluster_id where block_id = {block_id}",
                        // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_school as present_table join datasets.sch_att_total_teachers_daily_school as total_teachers on present_table.date = total_teachers.date and present_table.school_id = total_teachers.school_id) as a join dimensions.school as school_wise_table on school_wise_table.school_id = a.school_id where cluster_id = {cluster_id} and a.att_date between startDate and endDate",
                    // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                },
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_school as present_table join datasets.sch_att_total_teachers_daily_school as total_teachers on present_table.date = total_teachers.date and present_table.school_id = total_teachers.school_id) as a join dimensions.school as school_wise_table on school_wise_table.school_id = a.school_id where cluster_id = {cluster_id}",
                        // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                    },
                    "level": "school"
                }
            }
            // {
            //     "name": "School",
            //     "labelProp": "school_name",
            //     "valueProp": "school_id",
            //     "hierarchyLevel": "5",
            //     "timeSeriesQueries": {
            //         "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.teachers_marked, 0))*100) as numeric),2)) as stt_avg from  (select present_table.grade_state, present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teacherspresent_daily_gender0school0grade as present_table join datasets.sch_att_teachersmarked_daily_gender0school0grade as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id and present_table.grade_state = marked_table.grade_state) as a where school_id = {school_id} and a.att_date between startDate and endDate",
            //         // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t where (date between startDate and endDate) and t.school_id={school_id}",
            //     },
            //     "actions": {
            //         "queries": {
            //             "bigNumber": "select ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.teachers_marked, 0))*100) as numeric),2)) as stt_avg from  (select present_table.grade_state, present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teacherspresent_daily_gender0school0grade as present_table join datasets.sch_att_teachersmarked_daily_gender0school0grade as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id and present_table.grade_state = marked_table.grade_state) as a where school_id = {school_id}",
            //             // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t where (date between startDate and endDate) and t.school_id={school_id}",
            //         },
            //         "level": "school"
            //     }
            // },
            // {
            //     "name": "Grade",
            //     "labelProp": "grade",
            //     "valueProp": "grade",
            //     "hierarchyLevel": "6",
            //     "timeSeriesQueries": {
            //         "bigNumber": "select ceil(round(CAST(avg(a.teachers_present/a.teachers_marked)*100 as numeric),2)) as stt_avg from  (select present_table.grade_state, present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teacherspresent_daily_gender0school0grade as present_table join datasets.sch_att_teachersmarked_daily_gender0school0grade as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id and present_table.grade_state = marked_table.grade_state ) as a where school_id = {school_id} and grade_id = {grade_id} and a.att_date between startDate and endDate",
            //         // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_grade as t where (date between startDate and endDate) and t.grade={class_id}",
            //     },
            //     "actions": {
            //         "queries": {
            //             "bigNumber": "select ceil(round(CAST(avg(a.teachers_present/a.teachers_marked)*100 as numeric),2)) as stt_avg from  (select present_table.grade_state, present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teacherspresent_daily_gender0school0grade as present_table join datasets.sch_att_teachersmarked_daily_gender0school0grade as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id and present_table.grade_state = marked_table.grade_state ) as a where school_id = {school_id} and grade_id = {grade_id}",
            //             // "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_grade as t where (date between startDate and endDate) and t.grade={class_id}",
            //         },
            //         "level": "school"
            //     }
            // }
        ],
        "options": {
            "bigNumber": {
                "title": "Average Teachers Present",
                "valueSuffix": '%',
                "property": 'stt_avg'
            }
        }
    },

    tas_average_attendance_rank: {
        "label": "Average Teachers Present",
        "defaultLevel": "district",
        "filters": [
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "table": "select district_name, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg, dense_rank() over(order by ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) desc) as rank from  (select present_table.district_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_district as present_table join datasets.sch_att_total_teachers_daily_district as total_teachers on present_table.date = total_teachers.date and present_table.district_id = total_teachers.district_id) as a join dimensions.district as district_wise_table on district_wise_table.district_id = a.district_id where a.att_date between startDate and endDate group by a.district_id, district_name",
                },
                "actions": {
                    "queries": {
                        "table": "select district_name, dense_rank() over(order by avg(percentage) desc) as rank ,round(percentage ,0) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join (select distinct(district_id), state_id from ingestion.dimension_master) as m on m.district_id = t.district_id where state_id = {state_id} group by t.district_id, district_name,t.percentage",
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "table": "select block_name, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg, dense_rank() over(order by ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) desc) as rank from  (select present_table.block_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_block as present_table join datasets.sch_att_total_teachers_daily_block as total_teachers on present_table.date = total_teachers.date and present_table.block_id = total_teachers.block_id) as a join dimensions.block as block_wise_table on block_wise_table.block_id = a.block_id where a.att_date between startDate and endDate and district_id = {district_id} group by a.block_id, block_name",
                },
                "actions": {
                    "queries": {
                        "table": "select block_name, dense_rank() over(order by avg(percentage) desc) as rank ,round(percentage ,0) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join (select distinct(block_id), district_id from ingestion.dimension_master) as m on m.block_id = t.block_id where district_id = {district_id} group by t.block_id, block_name,t.percentage",
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "table": "select cluster_name, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg, dense_rank() over(order by ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) desc) as rank from  (select present_table.cluster_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_cluster as present_table join datasets.sch_att_total_teachers_daily_cluster as total_teachers on present_table.date = total_teachers.date and present_table.cluster_id = total_teachers.cluster_id) as a join dimensions.cluster as cluster_wise_table on cluster_wise_table.cluster_id = a.cluster_id where block_id = {block_id} and a.att_date between startDate and endDate group by a.cluster_id, cluster_name",
                },
                "actions": {
                    "queries": {
                        "table": "select cluster_name, dense_rank() over(order by avg(percentage) desc) as rank,round(percentage ,0) as percentage  from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join (select distinct(cluster_id), block_id from ingestion.dimension_master) as m on m.cluster_id = t.cluster_id where block_id = {block_id} group by t.cluster_id, cluster_name,t.percentage",
                    },
                    "level": "school"
                }
            },
            // {
            //     "name": "School",
            //     "labelProp": "school_name",
            //     "valueProp": "school_id",
            //     "hierarchyLevel": "5",
            //     "timeSeriesQueries": {
            //         "table": "select school_name, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.teachers_marked, 0))*100) as numeric),2)) as stt_avg, dense_rank() over(order by ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.teachers_marked, 0))*100) as numeric),2)) desc) as rank from  (select present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teachers_marked_present_daily_school as present_table join datasets.sch_att_teachers_marked_daily_school as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id) as a join dimensions.school as school_wise_table on school_wise_table.school_id = a.school_id where cluster_id = {cluster_id} and a.att_date between startDate and endDate group by a.school_id, school_name",
            //     },
            //     "actions": {
            //         "queries": {
            //             "table": "select school_name, dense_rank() over(order by avg(percentage) desc) as rank ,round(percentage ,0) as percentage  from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_school as s on t.school_id = s.school_id left join (select distinct(school_id), cluster_id from ingestion.dimension_master) as m on m.school_id = t.school_id where cluster_id = {cluster_id} group by t.school_id, school_name,t.percentage",
            //         },
            //         "level": "class"
            //     }
            // },
            // {
            //     "name": "Grade",
            //     "labelProp": "grade",
            //     "valueProp": "grade",
            //     "hierarchyLevel": "6",
            //     "timeSeriesQueries": {
            //         "table": "select grade_number, ceil(round(CAST(avg(a.teachers_present/a.teachers_marked)*100 as numeric),2)) as stt_avg, dense_rank() over(order by ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.teachers_marked, 0))*100) as numeric),2)) desc) as rank from (select present_table.grade_state, present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,marked_table.sum as teachers_marked from datasets.sch_att_teacherspresent_daily_gender0school0grade as present_table join datasets.sch_att_teachersmarked_daily_gender0school0grade as marked_table on present_table.date = marked_table.date and present_table.school_id = marked_table.school_id and present_table.grade_state = marked_table.grade_state ) as a join dimensions.grade as grade_wise_table on grade_wise_table.grade_id = a.grade_state where school_id = {school_id} and a.att_date between startDate and endDate group by a.grade_state, grade_number",
            //     },
            //     "actions": {
            //         "queries": {
            //             "table": "select t.grade, dense_rank() over(order by avg(percentage) desc) as rank ,round(percentage ,0) as percentage  from ingestion.sac_stds_avg_atd_by_grade as t where school_id = {school_id} group by t.grade,t.percentage",
            //         },
            //         "level": "class"
            //     }
            // }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "State",
                        property: "state_name",
                        class: "text-center"
                    },
                    {
                        name: "District",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Block",
                        property: "block_name",
                        class: "text-center"
                    },
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        class: "text-center"
                    },
                    {
                        name: "School",
                        property: "school_name",
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade_number",
                        class: "text-center"
                    },
                    {
                        name: "% Teachers Present",
                        property: "stt_avg",
                        valueSuffix: '%',
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        },
                    },
                    {
                        name: "Rank in % Teachers Present",
                        property: "rank",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: '#fff'
                    },

                ],
            }
        }
    },

    tas_average_attendance_barchart:{
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "timeSeriesQueries": {
                    "barChart": "select district_name as level, district_name, a.district_id,total_teachers, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from( select present_table.district_id,present_table.date as att_date,present_table.sum as teachers_present ,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_district as present_table join datasets.sch_att_total_teachers_daily_district as total_teachers on present_table.date = total_teachers.date and present_table.district_id = total_teachers.district_id) as a join dimensions.district as district_wise_table on district_wise_table.district_id = a.district_id where a.att_date between '01-01-2021' and '05-05-2023' group by a.district_id, district_name,a.total_teachers ,a.district_id order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "barChart":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.exam_id, subject.subject FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id) AS student_assessment GROUP BY subject;"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "barChart": "select block_name as level, block_name, a.block_id, sum(a.total_teachers) as total_teachers, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from (select present_table.block_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_block as present_table join datasets.sch_att_total_teachers_daily_block as total_teachers on present_table.date = total_teachers.date and present_table.block_id = total_teachers.block_id) as a join dimensions.block as block_wise_table on block_wise_table.block_id = a.block_id where district_id = {district_id} and a.att_date between startDate and endDate group by a.block_id, block_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "barChart":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, subject.subject, district.district_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.district AS district ON district.district_id = school.district_id) AS student_assessment WHERE district_id = {district_id} GROUP BY subject;",
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "barChart": "select cluster_name as level, cluster_name, a.cluster_id, sum(a.total_teachers) as total_teachers, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.cluster_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_cluster as present_table join datasets.sch_att_total_teachers_daily_cluster as total_teachers on present_table.date = total_teachers.date and present_table.cluster_id = total_teachers.cluster_id) as a join dimensions.cluster as cluster_wise_table on cluster_wise_table.cluster_id = a.cluster_id where block_id = {block_id} and a.att_date between startDate and endDate group by a.cluster_id, cluster_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "barChart":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, subject.subject, block.block_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.block AS block ON block.block_id = school.block_id) AS student_assessment WHERE block_id = {block_id} GROUP BY subject;"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "barChart": "select school_name as level, school_name, a.school_id, sum(a.total_teachers) as total_teachers, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_school as present_table join datasets.sch_att_total_teachers_daily_school as total_teachers on present_table.date = total_teachers.date and present_table.school_id = total_teachers.school_id) as a join dimensions.school as school_wise_table on school_wise_table.school_id = a.school_id where cluster_id = {cluster_id} and a.att_date between startDate and endDate group by a.school_id, school_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "barChart":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, subject.subject, cluster.cluster_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.cluster AS cluster ON cluster.cluster_id = school.cluster_id) AS student_assessment WHERE cluster_id = {cluster_id} GROUP BY subject;"
                    },
                    "level": "school"
                }
            },

        ],
        "options": {
            "barChart": {
                "metricLabelProp": "% Teacher Present",
                "metricValueProp": "stt_avg",
                "yAxis": {
                    "title": "Attendance %"
                },
                "xAxis": {
                    "title": " ",
                    "label": "level",
                    "value": "level",

                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Id: ",
                        "value": "district_id",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Block Id: ",
                        "value": "block_id",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Block Name: ",
                        "value": "block_name",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Cluster Id: ",
                        "value": "cluster_id",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Cluster Name: ",
                        "value": "cluster_name",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "School Id: ",
                        "value": "school_id",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "School Name: ",
                        "value": "school_name",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Total Number of Schools: ",
                        "value": "total_schools",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Total Number of Teachers: ",
                        "value": "total_teachers",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Average percentage of attendance: ",
                        "value": "stt_avg",
                        "valueSuffix": "%"
                    },
                ]
            }
        }
    },

    tas_attendance_time_series:{
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "timeSeriesQueries": {
                    "timeSeries": "select district_name as level, district_name, a.district_id,total_teachers, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from( select present_table.district_id,present_table.date as att_date,present_table.sum as teachers_present ,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_district as present_table join datasets.sch_att_total_teachers_daily_district as total_teachers on present_table.date = total_teachers.date and present_table.district_id = total_teachers.district_id) as a join dimensions.district as district_wise_table on district_wise_table.district_id = a.district_id where a.att_date between '01-01-2021' and '05-05-2023' group by a.district_id, district_name,a.total_teachers ,a.district_id order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "timeSeries":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.grade_id, obtained_marks.academicyear_id, obtained_marks.subject_id, obtained_marks.exam_id, subject.subject FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id) AS student_assessment GROUP BY subject;"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "timeSeries": "select block_name as level, block_name, a.block_id, sum(a.total_teachers) as total_teachers, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from (select present_table.block_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_block as present_table join datasets.sch_att_total_teachers_daily_block as total_teachers on present_table.date = total_teachers.date and present_table.block_id = total_teachers.block_id) as a join dimensions.block as block_wise_table on block_wise_table.block_id = a.block_id where district_id = {district_id} and a.att_date between startDate and endDate group by a.block_id, block_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "timeSeries":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, subject.subject, district.district_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.district AS district ON district.district_id = school.district_id) AS student_assessment WHERE district_id = {district_id} GROUP BY subject;",
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "timeSeries": "select cluster_name as level, cluster_name, a.cluster_id, sum(a.total_teachers) as total_teachers, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.cluster_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_cluster as present_table join datasets.sch_att_total_teachers_daily_cluster as total_teachers on present_table.date = total_teachers.date and present_table.cluster_id = total_teachers.cluster_id) as a join dimensions.cluster as cluster_wise_table on cluster_wise_table.cluster_id = a.cluster_id where block_id = {block_id} and a.att_date between startDate and endDate group by a.cluster_id, cluster_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "timeSeries":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, subject.subject, block.block_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.block AS block ON block.block_id = school.block_id) AS student_assessment WHERE block_id = {block_id} GROUP BY subject;"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "timeSeries": "select school_name as level, school_name, a.school_id, sum(a.total_teachers) as total_teachers, ceil(round(CAST(COALESCE(avg(a.teachers_present/NULLIF(a.total_teachers, 0))*100) as numeric),2)) as stt_avg from  (select present_table.school_id,present_table.date as att_date,present_table.sum as teachers_present,total_teachers.sum as total_teachers from datasets.sch_att_teachers_marked_present_daily_school as present_table join datasets.sch_att_total_teachers_daily_school as total_teachers on present_table.date = total_teachers.date and present_table.school_id = total_teachers.school_id) as a join dimensions.school as school_wise_table on school_wise_table.school_id = a.school_id where cluster_id = {cluster_id} and a.att_date between startDate and endDate group by a.school_id, school_name order by stt_avg asc",
                },
                "actions": {
                    "queries": {
                        "timeSeries":"SELECT subject,round(cast(AVG(obtained_marks/total_marks)*100 as numeric),2) AS average FROM( SELECT obtained_marks.sum AS obtained_marks, total_marks.sum AS total_marks, obtained_marks.subject_id, obtained_marks.grade_id, obtained_marks.exam_id, obtained_marks.academicyear_id, subject.subject, cluster.cluster_id FROM datasets.assessment_obtainedmarks_bWBOdTt2fndsW2k7dSkK AS obtained_marks INNER JOIN datasets.assessment_totalmarks_eTt2dmFxQlM6YwIfCgk5 AS total_marks ON total_marks.school_id = obtained_marks.school_id INNER JOIN dimensions.subject AS subject ON subject.subject_id = obtained_marks.subject_id INNER JOIN dimensions.school AS school ON school.school_id = obtained_marks.school_id INNER JOIN dimensions.exam as exam on exam.exam_id=obtained_marks.exam_id INNER JOIN dimensions.grade AS grade ON grade.grade_id = obtained_marks.grade_id INNER JOIN dimensions.cluster AS cluster ON cluster.cluster_id = school.cluster_id) AS student_assessment WHERE cluster_id = {cluster_id} GROUP BY subject;"
                    },
                    "level": "school"
                }
            },

        ],
        "options": {
            "barChart": {
                "metricLabelProp": "% Teacher Present",
                "metricValueProp": "stt_avg",
                "yAxis": {
                    "title": "Attendance %"
                },
                "xAxis": {
                    "title": " ",
                    "label": "level",
                    "value": "level",

                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Id: ",
                        "value": "district_id",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Block Id: ",
                        "value": "block_id",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Block Name: ",
                        "value": "block_name",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Cluster Id: ",
                        "value": "cluster_id",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Cluster Name: ",
                        "value": "cluster_name",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "School Id: ",
                        "value": "school_id",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "School Name: ",
                        "value": "school_name",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Total Number of Schools: ",
                        "value": "total_schools",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Total Number of Teachers: ",
                        "value": "total_teachers",
                        "valueSuffix": ""
                    },
                    {
                        "valuePrefix": "Average percentage of attendance: ",
                        "value": "stt_avg",
                        "valueSuffix": "%"
                    },
                ]
            }
        }
    }
}
