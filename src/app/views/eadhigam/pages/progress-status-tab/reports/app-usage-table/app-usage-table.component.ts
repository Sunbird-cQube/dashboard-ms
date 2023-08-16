import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { appUsageData } from 'src/app/views/eadhigam/config/student_records';
@Component({
  selector: 'app-app-usage-table',
  templateUrl: './app-usage-table.component.html',
  styleUrls: ['./app-usage-table.component.scss']
})


export class AppUsageTableComponent implements OnInit {

  displayedColumnsHeads: string[] = [ "student_srn", "student_name","grade","school","block","district","total_usage"]
  displayedColumns: any[] = [
    { title: 'Block', column: 'block' },
    { title: 'School', column: 'school' },
    { title: 'Grade', column: 'grade' },
    { title: 'Name', column: 'student_name' },
    { title: 'Srn No.', column: 'student_srn' },
    { title: 'District', column: 'district' },
    { title: 'Total Usage', column: 'total_usage' }
  ];

  

  dataSource = new MatTableDataSource<any>([]); // Initialize with empty array
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(appUsageData);
  }

}
