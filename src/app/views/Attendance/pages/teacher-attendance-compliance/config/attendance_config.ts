export const config = {
    average_attendance_compliance: {
      "label":"Average Attendance Compliance",
      "queries": {
        "table": "select min(date) as min_date, max(date) as max_date, state_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id ,state_name",
        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_state",
        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_state where date between startDate and endDate"
      },
      "timeSeriesQueries": {
        "table": "select min(date) as min_date, max(date) as max_date, state_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id where date between startDate and endDate group by t.state_id ,state_name",
        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_state  where date between startDate and endDate",
        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_state where date between startDate and endDate"
      },
      "defaultLevel": "block",
      "filters": [
        {
          "name": "State",
          "labelProp": "state_name",
          "valueProp": "state_id",
          "hierarchyLevel": "2",
          "timeSeriesQueries": {
            "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where date between startDate and endDate group by t.district_id ,district_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_district where date between startDate and endDate",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_district where date between startDate and endDate"
          },
          "query": "select t.state_id, state_name from ingestion.sac_students_attendance_compliance_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id,state_name",
          "actions": {
            "queries": {
              "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id group by t.district_id ,district_name",
              "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_district",
              "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_district where (date between startDate and endDate) and "
            },
            "level": "cluster"
          }
        },
        {
          "name": "District",
          "labelProp": "district_name",
          "valueProp": "district_id",
          "hierarchyLevel": "3",
          "timeSeriesQueries": {
            "table": "select block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id} group by t.block_id,block_name,district_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
          },
          "query": "select t.district_id, district_name from ingestion.sac_students_attendance_compliance_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join ingestion.dimension_master as m on m.district_id = t.district_id where m.state_id={state_id} group by t.district_id,district_name",
          "actions": {
            "queries": {
              "table": "select block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
              "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id}",
              "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
            },
            "level": "cluster"
          }
        },
        {
          "name": "Block",
          "labelProp": "block_name",
          "valueProp": "block_id",
          "hierarchyLevel": "3",
          "timeSeriesQueries": {
            "table": "select cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
          },
          "query": "select t.block_id, block_name from ingestion.sac_students_attendance_compliance_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join dimension_master as m on m.block_id = t.block_id where m.district_id = {district_id} group by t.block_id,block_name",
          "actions": {
            "queries": {
              "table": "select cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
              "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id}",
              "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
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
            "table": "select school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
          },
          "query": "select t.cluster_id, cluster_name from ingestion.sac_students_attendance_compliance_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
          "actions": {
            "queries": {
              "table": "select school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
              "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where m.cluster_id={cluster_id}",
              "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_students_attendance_compliance_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
            },
            "level": "school"
          }
        }
      ],
      "options": {
        "table": {
          "columns": [
            {
              name: "State",
              property: "state_name",
              sticky: true,
              class: "text-center"
            },
            {
              name: "District",
              property: "district_name",
              sticky: true,
              class: "text-center"
            },
            {
              name: "Block",
              property: "block_name",
              sticky: true,
              class: "text-center"
            },
            {
              name: "Cluster",
              property: "cluster_name",
              sticky: true,
              class: "text-center"
            },
            {
              name: "School",
              property: "school_name",
              sticky: true,
              class: "text-center"
            },
            {
              name: "Grade",
              property: "grade",
              sticky: true,
              class: "text-center"
            },
            {
              name: "Teacher Attendance Complaince",
              property: "percentage",
              sticky: true,
              class: "text-center",
              isHeatMapRequired: true,
              color: {
                type: "percentage",
                values: [
                  {
                    color: "#00FF00",
                    breakPoint: 75
                  },
                  {
                    color: "#FFFF00",
                    breakPoint: 50
                  },
                  {
                    color: "#FF0000",
                    breakPoint: 0
                  }
                ]
              },
            }
          ],
          "sortByProperty": "state_name",
          "sortDirection": "desc"
        },
        "bigNumber": {
          "valueSuffix": '%'
        }
      }
    }
  }