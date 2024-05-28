import { HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { UserType } from 'src/app/types/UserType';

@Component({
  selector: 'app-teachers-list-page',
  templateUrl: './teachers-list-page.component.html',
  styleUrls: [
    './teachers-list-page.component.css',
    '../pages-shared-styles/css-shared-styles-2.css',
    '../pages-shared-styles/css-error-styles.css'
  ]
})
export class TeachersListPageComponent implements OnInit {

  pageType: string | null = null;


  institutionId: string = '';


  usersState: string = 'loading';
  usersList: UserType[] = [];




  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private teacherService: TeacherService,
    private adminService: AdminService
  ) {

  }


  ngOnInit(): void {
    this.getPageType();
    this.getInstitutionId();

    switch(this.pageType) {
      case 'teachers': 
        this.getTeachers();
        break;
      case 'admins': 
        this.getAdmins();
        break;
    }
  }


  getPageType(): void {
    this.pageType = this.router.url.split('/')[3];
  }


  getInstitutionId(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => this.institutionId = res['institutionId']
    });
  }




  getTeachers(): void {
    this.teacherService.getAllTeachersByInstitutionId(this.institutionId).subscribe(
      this.getPartialObservable()
    )
  }


  getAdmins(): void {
    this.adminService.getAllAdminsByInstitutionId(this.institutionId).subscribe(
      this.getPartialObservable()
    );
  }


  getPartialObservable(): Partial<Observer<HttpResponse<UserType[]>>> {
    return {
      next: (res) => {
        if (res.status == HttpStatusCode.NoContent) { this.usersState = 'empty'; return; }
        if (res.body == null) { this.usersState = 'error'; return; }

        this.usersList = res.body;
        this.usersState = 'loaded';
      },
      error: () => this.usersState = 'error' 
    }
  }




  getPageTypeName(): string {
    if (this.pageType == 'teachers') return 'Professores';
    return 'Admins';
  }

}
