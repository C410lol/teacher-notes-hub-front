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


  studentsState: string = 'empty';
  studentsList: StudentType[] | null = null;


//  isInflated: boolean = false;
//  positionX: number = 0;
//  positionY: number = 0;
//  inflatedStudentId: string = '';




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
    this.studentService.getStudentsByInstitutionAndClasse(this.institutionId, this.selectedClasse).subscribe({
      next: (res) => { this.studentsList = res.body; this.studentsState = 'loaded' },
      error: (err) => { this.studentsState = 'error'; console.error(err); }
    });
  }




  setStudentClicked(student: StudentType): void {
    this.clickedStudentId = student.id;
    this.clickedStudentName = student.name;
    this.clickedStudentIsOrder = student.isOrder;
    console.log("BBBBBBBBB");
  } 


  deleteStudentClick(studentId: string): void {
    console.log("AAAAAAAA");
    this.clickedStudentId = studentId;
    this.switchMode03();
  }




  refreshPage(): void {
    location.reload();
  }

//  inflateContainer(array: string[]): void {
//    if (array[0] != this.inflatedStudentId) {
//      this.isInflated = true;
//      this.inflatedStudentId = array[0];
//
//      this.positionX = Number.parseInt(array[1]);
//      this.positionY = Number.parseInt(array[2]);
//
//      const pageWidth = window.innerWidth;
//      const pageHeigth = window.innerHeight;
//
//      if (this.positionX + 165 > pageWidth) this.positionX = pageWidth - (165 + 20);
//      if (this.positionY + 80 > pageHeigth) this.positionY = pageHeigth - (80 + 20);
//    } else this.isInflated = !this.isInflated;  
//  }

}
