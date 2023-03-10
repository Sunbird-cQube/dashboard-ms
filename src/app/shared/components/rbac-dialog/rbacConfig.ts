export const rbacConfig = {
  "baseHierarchy": 2,
  "filters": [
    {
      "query": "select district_id, district_name from dimensions.district order by district_name",
      "hierarchyLevel": 2,
      "name": "District",
      "labelProp": "district_name",
      "valueProp": "district_id"
    },
    {
      "query": "select block_id, block_name from dimensions.block where district_id = {master_id} order by block_name",
      "hierarchyLevel": 3,
      "name": "Block",
      "labelProp": "block_name",
      "valueProp": "block_id"
    },
    {
      "query": "select cluster_id, cluster_name from dimensions.cluster where block_id = {master_id} order by cluster_name",
      "hierarchyLevel": 4,
      "name": "Cluster",
      "labelProp": "cluster_name",
      "valueProp": "cluster_id"
    },
    {
      "query": "select school_id, school_name from dimensions.school where cluster_id = {master_id} order by school_name",
      "hierarchyLevel": 5,
      "name": "School",
      "labelProp": "school_name",
      "valueProp": "school_id"
    },
    {
      "query": "select grade_id, grade_number from dimensions.grade order by grade_number",
      "hierarchyLevel": 6,
      "name": "Grade",
      "labelProp": "grade_id",
      "valueProp": "grade_number"
    }
  ],
  "roles": [
    {
      name: "State Officer",
      value: 1,
      imageUrl: 'state.png',
      roleImageUrl: 'principle_role.png'
    },
    {
      name: "District Officer",
      value: 2,
      imageUrl: 'district.png',
      roleImageUrl: 'principle_role.png'
    },
    {
      name: "Block Officer",
      value: 3,
      imageUrl: 'block.png',
      roleImageUrl: 'principle_role.png'
    },
    {
      name: "Cluster Officer",
      value: 4,
      imageUrl: 'cluster.png',
      roleImageUrl: 'principle_role.png'
    },
    {
      name: "School Principal",
      value: 5,
      imageUrl: 'principle.png',
      roleImageUrl: 'principle_role.png'
    },
    {
      name: "Class Teacher",
      value: 6,
      imageUrl: 'class.png',
      roleImageUrl: 'principle_role.png'
    }
  ]
}