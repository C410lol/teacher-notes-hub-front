import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotebookType } from 'src/app/types/NotebookType';
import { NotebookService } from 'src/app/services/notebook.service';
import { SortInterface } from '../../types/interfaces/SortInterface';
import { HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.css', 
    './home-page.mobile.component.css',
    './home-page-error-container.component.css',
    '../pages-shared-styles/title-txt.css',
    '../pages-shared-styles/blur-filter.css',
  ]
})
export class HomePageComponent implements OnInit, SortInterface {

  @Output() totalPagesEvent: EventEmitter<number> = new EventEmitter<number>();

  isCreateMode:boolean = false;
  currentState: string = 'loading';

  teacherId: string = '';
  
  notebookList: NotebookType[] = [];
  totalPages: number = 1;

  sortBy: string = 'status';
  direction: string = 'desc';
  pageNum: number = 1;

  constructor(
    private notebookService: NotebookService,
    private userService: UserService,
    private dateFormatter: DatePipe
  ) { }

  ngOnInit(): void {
    this.verifyUserStatus();
  }

  verifyUserStatus(): void {
    const token: string | null = localStorage.getItem('token');
    if (token == null) {
      this.currentState = 'unlogged';
      return;
    }
    const userId: string | null = localStorage.getItem('userId');
    if (userId != null) {
      this.userService.isUserVerified(userId).subscribe({
        next: () => {
          this.teacherId = userId;
          this.getAllNotebooks();
        },
        error: (err: HttpResponse<boolean>) => {
          if (err.status == 400) {
            this.currentState = 'unverified';
          } else this.currentState = 'error';
        }
      });
    } else {
      this.currentState = 'error'; 
    }
  }

  orderByOnChange(orderBy: string): void {
    this.sortBy = orderBy;
    this.refreshNotebooks();
  }

  directionOnChange(direction: string): void {
    this.direction = direction;
    this.refreshNotebooks();
  }

  pageNumOnChange(pageNum: number): void {
    this.pageNum = pageNum;
    this.refreshNotebooks();
  }

  refreshNotebooks(): void {
    this.getAllNotebooks();
  }

  getAllNotebooks(): void {
    this.notebookService.getAllNotebooks(this.teacherId, this.sortBy, this.direction, this.pageNum - 1).subscribe({
      next: (res) => {
        if (res.status == 200) {
          if (res.body != null) {
            this.notebookList = res.body.content;
            this.totalPages = res.body.totalPages;
          }
        }
        this.currentState = 'loaded';
      },
      error: (err) => {
        this.currentState = 'error';
      }
    });
  }

  switchCreateMode(): void {
    if(this.isCreateMode === false) {
      this.isCreateMode = true;
    } else this.isCreateMode = false;
  }

  resendVerificationEmail(): void {
    const userId: string | null = sessionStorage.getItem('userId');
    if (userId != null) {
      this.userService.resendVerificationEmailBtUserId(userId).subscribe({
        next: () => alert('Email enviado com sucesso!'),
        error: () => alert('Ops, algo deu errado ao enviar seu email, tente novamente mais tarde.')
      });
    }
  }

  refreshPage(): void {
    location.reload();
  }

  formatDate(date: string | undefined): string {
    const dateFormatted: string | null = this.dateFormatter.transform(date, 'dd/MM/yyyy');
    if (dateFormatted != null) {
      return dateFormatted;
    }
    return "??/??/????";
  }

}
