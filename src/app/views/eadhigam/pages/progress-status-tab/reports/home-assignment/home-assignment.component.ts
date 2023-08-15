import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { homeworkAssignmentData } from 'src/app/views/eadhigam/config/student_records';

@Component({
  selector: 'app-home-assignment',
  templateUrl: './home-assignment.component.html',
  styleUrls: ['./home-assignment.component.scss']
})

export class HomeAssignmentComponent implements OnInit {

  displayedColumnsHeads: string[] = [ "student_srn", "student_name","grade","school","block","district","Total_Assignments"]
  displayedColumns: any[] = [
    { title: 'Block', column: 'block' },
    { title: 'School', column: 'school' },
    { title: 'Grade', column: 'grade' },
    { title: 'Name', column: 'student_name' },
    { title: 'Srn No.', column: 'student_srn' },
    { title: 'District', column: 'district' },
    { title: 'Total Assignments', column: 'Total_Assignments' },
  ];

  

  dataSource = new MatTableDataSource<any>([]); // Initialize with empty array
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(homeworkAssignmentData);
  }


}
