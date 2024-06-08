import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { StudentType } from 'src/app/types/StudentType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: [
    '../pages-shared-styles/css-shared-styles-2.css',
    '../pages-shared-styles/css-error-styles.css',
    './students-page.component.css'
  ]
})
export class StudentsPageComponent extends DialogParent implements OnInit {

  institutionId: string = '';


  selectedClasse: string = 'Ensino_Fundamental_6_A';
  clickedStudentId: string = '';
  clickedStudentName: string = '';
  clickedStudentIsOrder: boolean = true;


  studentsState: string = 'loading';
  studentsList: StudentType[] | null = null;
  totalPages: number = 1;


  sortBy: string = 'number';
  direction: string = 'asc';
  pageNum: number = 1;




  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService
  ) {
    super();
  }


  ngOnInit(): void {
    this.getInstitutionId();
    this.getStudents();
  }




  getInstitutionId(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => this.institutionId = res['institutionId']
    });
  }


  getStudents(): void {
    this.studentsState = 'loading';

    this.studentService.getStudentsByInstitutionAndClasse(
      this.institutionId, 
      this.selectedClasse,
      this.sortBy,
      this.direction,
      this.pageNum - 1
    ).subscribe({
      next: (res) => { 
        if (res.status == HttpStatusCode.NoContent) { this.studentsState = 'empty'; return; }

        const body = res.body;
        if (body == null) { this.studentsState = 'error'; return; }

        this.studentsList = body.content; 
        this.studentsState = 'loaded';
      },
      error: (err) => { this.studentsState = 'error'; console.error(err); }
    });
  }




  receiveSortValues(values: Map<string, string>): void {
    const val0 = values.get('sortBy');
    const val1 = values.get('direction');
    const val2 = values.get('pageNum');

    if (val0 != null && val1 != null && val2 != null) {
        this.sortBy = val0;
        this.direction = val1;
        this.pageNum = Number.parseInt(val2);
        this.getStudents();
    }
  }




  setStudentClicked(student: StudentType): void {
    this.clickedStudentId = student.id;
    this.clickedStudentName = student.name;
    this.clickedStudentIsOrder = student.isOrder;
  } 


  deleteStudentClick(studentId: string): void {
    this.clickedStudentId = studentId;
    this.switchMode03();
  }




  refreshPage(): void {
    location.reload();
  }


}
