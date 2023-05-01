export const config = {
    filters:[
        {
            "name": "Academic Year",
            "id": "academicYear",
            "labelProp": "academicyear",
            "valueProp": "academicyear_id",
            "query": "select academicyear_id, academicyear from dimensions.academicyear"
        },
        {
            "name": "Month",
            "labelProp": "month_name",
            "valueProp": "month",
            "id": "month",
            "query": "select distinct(month) , case when month = 1 then 'January' when month = 2 then 'February' when month = 3 then 'March' when month = 4 then 'April' when month = 5 then 'May' when month = 6 then 'June' when month = 7 then 'July' when month = 8 then 'August' when month = 9 then 'September' when month = 10 then 'October' when month = 11 then 'November' when month = 12 then 'December' end as month_name from datasets.rev_and_monitoring_district_monthly_academicyear0district",
        }
    ],
    school_infrastructure_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries":'',
        "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
            
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block",
        },
        "levels":'',
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
                        
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.block_id, t2.block_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDategroup by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.block_id, e.block_name ,e.district_id from datasets.sch_att_students_attendance_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where e.district_id={district_id} group by d.school_id, e.block_id, e.block_name,e.district_id) as t2 on t1.school_id = t2.school_id group by t2.block_id, t2.block_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.cluster_id, t2.cluster_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDate group by a.school_id) as c where c.percentage > 50) as t1 full join (select e.block_id,d.school_id, e.cluster_id, e.cluster_name from datasets.sch_att_students_attendance_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where block_id={block_id} group by d.school_id, e.cluster_id, e.cluster_name,e.block_id) as t2 on t1.school_id = t2.school_id group by t2.cluster_id, t2.cluster_name                    "
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
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
                    "table": "select  e.school_name ,ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate and e.cluster_id={cluster_id} group by a.school_id,e.school_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "District",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "drinking_water",
                        class: "text-center"
                    },
                    {
                        name: "Have Toilet",
                        property: "have_toilet",
                        class: "text-center"
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "have_cwsn",
                        class: "text-center"
                    },
                    {
                        name: "Have Electricity",
                        property: "have_elec",
                        class: "text-center"
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "have_cctv",
                        class: "text-center"
                    },
                    {
                        name: "Have Solar Panel",
                        property: "have_solar",
                        class: "text-center"
                    },
                    {
                        name: "Have Handwash",
                        property: "have_handwash",
                        class: "text-center",
                        // valueSuffix: "%",
                        isHeatMapRequired: true,
                        
                    },
                    {
                        name: "Have Playgrounds",
                        property: "hsve_playground",
                        class: "text-center"
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },

    school_infrastructure_district_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries":'',
        "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
            
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block",
        },
        "levels":'',
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
                        
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.block_id, t2.block_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDategroup by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.block_id, e.block_name ,e.district_id from datasets.sch_att_students_attendance_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where e.district_id={district_id} group by d.school_id, e.block_id, e.block_name,e.district_id) as t2 on t1.school_id = t2.school_id group by t2.block_id, t2.block_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.cluster_id, t2.cluster_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDate group by a.school_id) as c where c.percentage > 50) as t1 full join (select e.block_id,d.school_id, e.cluster_id, e.cluster_name from datasets.sch_att_students_attendance_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where block_id={block_id} group by d.school_id, e.cluster_id, e.cluster_name,e.block_id) as t2 on t1.school_id = t2.school_id group by t2.cluster_id, t2.cluster_name                    "
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
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
                    "table": "select  e.school_name ,ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate and e.cluster_id={cluster_id} group by a.school_id,e.school_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Block",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "drinking_water",
                        class: "text-center"
                    },
                    {
                        name: "Have Toilet",
                        property: "have_toilet",
                        class: "text-center"
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "have_cwsn",
                        class: "text-center"
                    },
                    {
                        name: "Have Electricity",
                        property: "have_elec",
                        class: "text-center"
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "have_cctv",
                        class: "text-center"
                    },
                    {
                        name: "Have Solar Panel",
                        property: "have_solar",
                        class: "text-center"
                    },
                    {
                        name: "Have Handwash",
                        property: "have_handwash",
                        class: "text-center",
                        // valueSuffix: "%",
                        isHeatMapRequired: true,
                        
                    },
                    {
                        name: "Have Playgrounds",
                        property: "hsve_playground",
                        class: "text-center"
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },

    school_infrastructure_block_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries":'',
        "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
            
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block",
        },
        "levels":'',
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
                        
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.block_id, t2.block_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDategroup by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.block_id, e.block_name ,e.district_id from datasets.sch_att_students_attendance_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where e.district_id={district_id} group by d.school_id, e.block_id, e.block_name,e.district_id) as t2 on t1.school_id = t2.school_id group by t2.block_id, t2.block_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.cluster_id, t2.cluster_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDate group by a.school_id) as c where c.percentage > 50) as t1 full join (select e.block_id,d.school_id, e.cluster_id, e.cluster_name from datasets.sch_att_students_attendance_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where block_id={block_id} group by d.school_id, e.cluster_id, e.cluster_name,e.block_id) as t2 on t1.school_id = t2.school_id group by t2.cluster_id, t2.cluster_name                    "
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
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
                    "table": "select  e.school_name ,ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate and e.cluster_id={cluster_id} group by a.school_id,e.school_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Cluster",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "drinking_water",
                        class: "text-center"
                    },
                    {
                        name: "Have Toilet",
                        property: "have_toilet",
                        class: "text-center"
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "have_cwsn",
                        class: "text-center"
                    },
                    {
                        name: "Have Electricity",
                        property: "have_elec",
                        class: "text-center"
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "have_cctv",
                        class: "text-center"
                    },
                    {
                        name: "Have Solar Panel",
                        property: "have_solar",
                        class: "text-center"
                    },
                    {
                        name: "Have Handwash",
                        property: "have_handwash",
                        class: "text-center",
                        // valueSuffix: "%",
                        isHeatMapRequired: true,
                        
                    },
                    {
                        name: "Have Playgrounds",
                        property: "hsve_playground",
                        class: "text-center"
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },

    school_infrastructure_cluster_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries":'',
        "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
            
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block",
        },
        "levels":'',
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
                        
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.block_id, t2.block_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDategroup by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.block_id, e.block_name ,e.district_id from datasets.sch_att_students_attendance_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where e.district_id={district_id} group by d.school_id, e.block_id, e.block_name,e.district_id) as t2 on t1.school_id = t2.school_id group by t2.block_id, t2.block_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.cluster_id, t2.cluster_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDate group by a.school_id) as c where c.percentage > 50) as t1 full join (select e.block_id,d.school_id, e.cluster_id, e.cluster_name from datasets.sch_att_students_attendance_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where block_id={block_id} group by d.school_id, e.cluster_id, e.cluster_name,e.block_id) as t2 on t1.school_id = t2.school_id group by t2.cluster_id, t2.cluster_name                    "
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
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
                    "table": "select  e.school_name ,ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_students, sum(a.sum) as attendace_marked from datasets.sch_att_total_students_daily_school as b join datasets.sch_att_students_attendance_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate and e.cluster_id={cluster_id} group by a.school_id,e.school_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "School",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "drinking_water",
                        class: "text-center"
                    },
                    {
                        name: "Have Toilet",
                        property: "have_toilet",
                        class: "text-center"
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "have_cwsn",
                        class: "text-center"
                    },
                    {
                        name: "Have Electricity",
                        property: "have_elec",
                        class: "text-center"
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "have_cctv",
                        class: "text-center"
                    },
                    {
                        name: "Have Solar Panel",
                        property: "have_solar",
                        class: "text-center"
                    },
                    {
                        name: "Have Handwash",
                        property: "have_handwash",
                        class: "text-center",
                        // valueSuffix: "%",
                        isHeatMapRequired: true,
                        
                    },
                    {
                        name: "Have Playgrounds",
                        property: "hsve_playground",
                        class: "text-center"
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },

    school_infra_conducted_bignumber: {
        "label": "Review Meetings",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(avg(avg)*100 as numeric),2)) as percentage from datasets.rev_and_monitoring_district_monthly_academicyear0district",
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(avg(avg)*100 as numeric),2)) as percentage from dimensions.block as b join datasets.rev_and_monitoring_block_monthly_academicyear0block as t on t.block_id = b.block_id where district_id = {district_id}",
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "bigNumber": "select ceil(round(CAST(avg(avg)*100 as numeric),2)) as percentage from dimensions.cluster as c join datasets.rev_and_monitoring_cluster_monthly_academicyear0cluster as t on c.cluster_id = t.cluster_id where block_id = {block_id}",
                    },
                    "level": "cluster"
                }
            }
        ],
        "options": {
            "bigNumber": {
                "title": "Average Review Meetings Conducted",
                "valueSuffix": '%',
                "property": 'percentage'
            }
        }
    },

    school_infra_create_table_data: {
        "label": "Average Teachers Reporting Attendance",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "timeSeriesQueries": {
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.district_id, t2.district_name from (select c.percentage, c.school_id as school_id from  (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDate group by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.district_id, e.district_name from datasets.sch_att_teachers_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id group by d.school_id, e.district_id, e.district_name) as t2 on t1.school_id = t2.school_id group by t2.district_id, t2.district_name",
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.block_id, t2.block_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDate group by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.block_id, e.block_name from datasets.sch_att_teachers_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where e.district_id={district_id} group by d.school_id, e.block_id, e.block_name) as t2 on t1.school_id = t2.school_id group by t2.block_id, t2.block_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
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
                    "table": "select ceil((cast( count(t1.school_id) as numeric)/cast (count(t2.school_id) as numeric))*100) as compliance_percentage, t2.cluster_id, t2.cluster_name from (select c.percentage, c.school_id as school_id from (select a.school_id,(sum(a.sum)/sum(b.sum))*100 as percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date where a.date between startDate and endDate group by a.school_id) as c where c.percentage > 50) as t1 full join (select d.school_id, e.cluster_id, e.cluster_name from datasets.sch_att_teachers_marked_daily_school as d join dimensions.school as e on d.school_id = e.school_id where e.block_id={block_id} group by d.school_id, e.cluster_id, e.cluster_name) as t2 on t1.school_id = t2.school_id group by t2.cluster_id, t2.cluster_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
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
                    "table": "select  e.school_name ,ceil(round(sum(a.sum)/sum(b.sum)*100)) as compliance_percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate and e.cluster_id={cluster_id} group by a.school_id,e.school_name"
                },
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
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
            //         // "table":"select  e.school_name ,ceil(round(sum(a.sum)/sum(b.sum)*100))as compliance_percentage, sum(b.sum) as total_teachers, sum(a.sum) as attendace_marked from datasets.sch_att_total_teachers_daily_school as b join datasets.sch_att_teachers_marked_daily_school as a on a.school_id = b.school_id and a.date = b.date join dimensions.school as e on a.school_id = e.school_id where a.date between startDate and endDate group by a.school_id,e.school_name"
            //         "table": "" //in grade there is no school_id
            //     },
            //     "actions": {
            //         "queries": {
            //             "table": "select min(date) as min_date, max(date) as max_date, grade, school_name, round(avg(percentage),0) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.school_id={school_id} group by grade,school_name,cluster_name,block_name,district_name",
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
                        property: "grade",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "drinking_water",
                        class: "text-center"
                    },
                    {
                        name: "Have Toilet",
                        property: "have_toilet",
                        class: "text-center"
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "have_cwsn",
                        class: "text-center"
                    },
                    {
                        name: "Have Electricity",
                        property: "have_elec",
                        class: "text-center"
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "have_cctv",
                        class: "text-center"
                    },
                    {
                        name: "Have Solar Panel",
                        property: "have_solar",
                        class: "text-center"
                    },
                    {
                        name: "Have Handwash",
                        property: "have_handwash",
                        class: "text-center",
                        // valueSuffix: "%",
                        isHeatMapRequired: true,
                        
                    },
                    {
                        name: "Have Playgrounds",
                        property: "hsve_playground",
                        class: "text-center"
                    }
                    // {
                    //     name: "",
                    //     property: "compliance_percentage",
                    //     class: "text-center",
                    //     valueSuffix:"%",
                    //     isHeatMapRequired: true,
                    //     color: {
                    //         type: "percentage",
                    //         values: [
                    //             {
                    //                 color: "#1D4586",
                    //                 breakPoint: 75
                    //             },
                    //             {
                    //                 color: "#1156CC",
                    //                 breakPoint: 50
                    //             },
                    //             {
                    //                 color: "#6D9FEB",
                    //                 breakPoint: 0
                    //             }
                    //         ]
                    //     },
                    // }
                ],
                "sortByProperty": "state_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },

    district_wise_performance: {
        "label": "District Wise Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions":
                {
                    "queries":
                    {
                        "map": "select t2.district_name, t1.district_id ,latitude, longitude, t1.category_name,round(cast(sum(t1.sum) as numeric ),2) as performance from datasets.pgi_category_state0district0categorypgi as t1 join dimensions.district as t2 on t2.district_id = t1.district_id group by t1.district_id, t2.district_name,t1.category_name, latitude, longitude"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries":
                    {
                        "map": "select category_name, d.district_name,t.district_id, cast(sum(t.sum) as numeric) as performance FROM datasets.pgi_category_state0district0categorypgi as t join dimensions.district as d on t.district_id = d.district_id group by t.district_id, d.district_name, category_name"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            },
            
        ],
        "options": {
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "performance",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District-wise Performance" },
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
}

