import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validations } from 'src/app/pages/pages-shared-styles/Validations';
import { BnccService } from 'src/app/services/bncc.service';
import { LessonService } from 'src/app/services/lesson.service';
import { BNCCCodeType } from 'src/app/types/BNCCCodeType';
import { LessonType } from 'src/app/types/LessonType';
import { LessonCreationType } from 'src/app/types/Others/LessonCreationType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-lesson-dialog',
  templateUrl: './lesson-dialog.component.html',
  styleUrls: [
    './lesson-dialog.component.css',
    './lesson-dialog.ng-select.component.css'
  ]
})
export class LessonDialogComponent extends DialogParent implements OnInit {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() type:string = '';
  @Input() title:string = '';

  @Input() notebookId: string = '';
  @Input() lessonId: string = '';

  @Input() lessonTitle: string = '';
  @Input() details: string = '';
  @Input() observations: string = '';
  @Input() bnccCodes?: string[] = [];
  @Input() quantity: number = 1;
  @Input() date: string = '';

  bnccInput: string = '';
  selectedCodes: string[] = [];
  allBnccCodes: BNCCCodeType[] = [];

  isInputFocus: boolean = false;
  isCodeSelected: boolean = false;

  timer: any;

  constructor(
    private lessonService: LessonService,
    private bnccService: BnccService,
  ) { 
    super();
  }

  ngOnInit(): void {
    if (this.bnccCodes != null && this.bnccCodes.length > 0) this.selectedCodes = [...this.bnccCodes];
    if (this.selectedCodes.length > 0) this.isCodeSelected = true;
    this.getBnccCodes();
  }

  bnccInputChange(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => { this.getBnccCodes() }, 1000);
  }

  getBnccCodes(): void {
    this.bnccService.getBnccCodes(this.notebookId, this.bnccInput).subscribe({
      next: (res) => this.allBnccCodes = res,
      error: () => {
        this.setStatus('Erro Ao Carregar As Habilidades!', environment.simpleErrorMessage);
        this.switchStatusMode();
      }
    });
  }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
    if (!Validations.isNotBlank([this.lessonTitle, this.details])) { 
      this.setStatusContent('Algum campo está vazio');
      this.switchStatusMode();
      return; 
    }
    if(this.type === 'create') { this.createLesson(); } 
    if(this.type === 'edit') { this.editLesson(); }
  }

  createLesson(): void {
    this.lessonService.createLesson(this.notebookId, this.createLessonObject()).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => {
        this.setStatusContent(environment.fieldErrorMessage);
        this.switchStatusMode();
      }
    });
  }

  editLesson(): void {
    this.lessonService.editLesson(this.lessonId, this.createLessonObject()).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => {
        this.setStatusContent(environment.fieldErrorMessage);
        this.switchStatusMode();
      }
    });
  }

  createLessonObject(): LessonCreationType {
    return {
      title: this.lessonTitle.trim(),
      details: this.details.trim(),
      observations: this.observations.trim(),
      bnccCodes: this.selectedCodes,
      quantity: this.quantity,
      date: this.date
    }
  }

  isEditMode(): boolean {
    return this.type == 'edit';
  }

  changeInputFocus(): void {
    setTimeout(() => { this.isInputFocus = !this.isInputFocus; }, 250);
  }

  insertSelectCode(code: string): void {
    if (this.selectedCodes.indexOf(code) == -1) this.selectedCodes.push(code);
  }

  removeSelectedCode(code: string): void {
    this.selectedCodes.splice(this.selectedCodes.indexOf(code), 1);
    if (this.selectedCodes.length < 1) this.isCodeSelected = false;
  }

  setStatusContent(content: string): void {
    this.setStatus('Erro Ao Salvar Aula!', content);
  }

}
