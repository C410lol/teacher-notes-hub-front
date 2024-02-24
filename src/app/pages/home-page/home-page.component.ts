import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotebookType } from 'src/app/types/NotebookType';
import { NotebookService } from 'src/app/services/notebook.service';
import { SortInterface } from '../../types/interfaces/SortInterface';
import { HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

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
export class HomePageComponent extends DialogParent implements OnInit, SortInterface {

  @Output() totalPagesEvent: EventEmitter<number> = new EventEmitter<number>();

  currentState: string = 'loading';

  teacherId: string = '';
  
  notebookList: NotebookType[] = [];
  totalPages: number = 1;

  sortBy: string = 'status';
  direction: string = 'desc';
  pageNum: number = 1;

  deleteNotebookId?: string;
  deleteNotebookVCode?: string;

  constructor(
    private notebookService: NotebookService,
    private userService: UserService,
    private dateFormatter: DatePipe,
    private activatedRoute: ActivatedRoute,
  ) { 
    super();
    this.activatedRoute.queryParams.subscribe({
      next: (res) => {
        this.deleteNotebookId = res['deleteNotebookId'];
        this.deleteNotebookVCode = res['deleteNotebookVCode'];
        if (this.deleteNotebookId != null && this.deleteNotebookVCode != null) this.deleteNotebook();
      }
    });
  }

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

  deleteNotebook(): void {
    this.notebookService.deleteNotebook(this.deleteNotebookId, this.deleteNotebookVCode).subscribe({
      next: () => { 
        this.refreshNotebooks(); 
        this.setStatus('Caderneta Deletada Com Sucesso!', 'Caderneta deletada com sucesso', 'success');
        this.switchStatusMode();
      },
      error: () => {
        this.setStatus('Erro Ao Deletar Cadereta!', environment.simpleErrorMessage, 'error');
        this.switchStatusMode();
      }
    });
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
      error: () => {
        this.currentState = 'error';
      }
    });
  }

  resendVerificationEmail(): void {
    const userId: string | null = sessionStorage.getItem('userId');
    if (userId != null) {
      this.userService.resendVerificationEmailBtUserId(userId).subscribe({
        next: () => {
          this.setStatus('Email Reenviado Com Sucesso!', 'Vá até seu email para confirmar sua conta', 'success');
          this.switchStatusMode();
        },
        error: () => {
          this.setStatus('Erro Ao Reenviar Email!', environment.simpleErrorMessage, 'error');
          this.switchStatusMode();
        }
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

  setCreateStatus(): void {
    this.setStatus('Caderneta Criada Com Sucesso!', 'Caderneta criada com sucesso', 'success');
  }

}
