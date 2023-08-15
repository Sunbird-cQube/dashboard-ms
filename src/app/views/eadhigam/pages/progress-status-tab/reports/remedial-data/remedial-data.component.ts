import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { remedialTestData } from 'src/app/views/eadhigam/config/student_records';
@Component({
  selector: 'app-remedial-data',
  templateUrl: './remedial-data.component.html',
  styleUrls: ['./remedial-data.component.scss']
})

export class RemedialDataComponent implements OnInit {

  displayedColumnsHeads: string[] = [ "student_srn", "student_name","grade","school","block","district","remedial"]
  displayedColumns: any[] = [
    { title: 'Block', column: 'block' },
    { title: 'School', column: 'school' },
    { title: 'Grade', column: 'grade' },
    { title: 'Name', column: 'student_name' },
    { title: 'Srn No.', column: 'student_srn' },
    { title: 'District', column: 'district' },
    { title: 'Avg_Remedial', column: 'remedial' },
 
  ];

  

  dataSource = new MatTableDataSource<any>([]); // Initialize with empty array
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(remedialTestData);
  }


}
