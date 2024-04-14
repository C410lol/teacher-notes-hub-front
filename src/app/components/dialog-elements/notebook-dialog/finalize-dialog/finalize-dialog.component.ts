import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { NotebookService } from 'src/app/services/notebook.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-finalize-dialog',
    templateUrl: './finalize-dialog.component.html',
    styleUrls: [
        '../../dialog-shared-elements/css-shared-elements.css',
        './finalize-dialog.component.css',
    ]
})
export class FinalizeDialogComponent extends DialogParent implements OnInit {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();


  @Input() notebookId?: string = '';


  numbersArray: number[] = [
      0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5,
      5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10
  ];


  weightSum: number = 0;
  weigthSumStyle: string = 'GREEN';


  //Select categories elements
  @ViewChildren('categoryCheckBox') categoryCheckBoxes: QueryList<ElementRef<HTMLInputElement>> = 
      new QueryList<ElementRef<HTMLInputElement>>();
  checkedCategories: string[] = [];

  isSecondModeEnable: boolean = false;
  //Select categories elements


  //Select weights elements
  @ViewChildren('weightsSelect') weigthsSelects: QueryList<ElementRef<HTMLSelectElement>> = 
      new QueryList<ElementRef<HTMLSelectElement>>();
  selectedWeights: Map<string, number> = new Map<string, number>();

  //Select weights elements




  constructor(
    private notebookService: NotebookService
  ) { 
      super();
  }

  ngOnInit(): void {
  }


  //Events
  onClickFirstSection(): void {
      this.insertCategoriesIntoList();
      if (this.checkedCategories.length < 1) {
          this.setStatusContent('Você deve selecionar no mínimo 1 categoria!');
          this.switchStatusMode();
          return;
      }

      this.isSecondModeEnable = true;
  }

  onClickBackBtn(): void {
      this.isSecondModeEnable = false;
  }

  onClickSecondSection(): void {
      this.setMapValues();
      this.ifThereIsMissingTasks();
  }

  cancelOnClick(): void {
      this.cancelButtonClick.emit();
  }
  //Events


  insertCategoriesIntoList(): void {
      this.categoryCheckBoxes.forEach((element) => {
          const input = element.nativeElement;

          if (this.checkedCategories.indexOf(input.value) == -1) {
              if (input.checked) this.checkedCategories.push(input.value);
          } else {
              if (!input.checked) this.checkedCategories.splice(this.checkedCategories.indexOf(input.value), 1);
          }
      });
  }


  setMapValues(): void {
      this.weigthsSelects.forEach((element) => {
          const option = element.nativeElement.options[element.nativeElement.selectedIndex];
          const values = option.value.split(' ');

          this.selectedWeights.set(values[0].toUpperCase(), Number.parseFloat(values[1]));
      });
  }




  //Requests
  ifThereIsMissingTasks(): void {
      this.notebookService.verifyMissingTasks(this.notebookId).subscribe({
          next: (res) => {
              if(res.status == HttpStatusCode.NoContent) { this.finalizeNotebook(); return; } 
              this.setStatusContent('Você possue aula(s)/ferramenta(s) sem chamada/notas');
              this.switchStatusMode();
          },
          error: () => {
              this.setStatusContent(environment.simpleErrorMessage);
              this.switchStatusMode();
          }
      });
  }

  finalizeNotebook(): void {
      this.notebookService.finalizeNotebook(this.serializeMapObject(this.selectedWeights), this.notebookId).subscribe({
          next: (res) => {
              const blobUrl: string = window.URL.createObjectURL(res);

              const a = document.createElement('a');
              a.href = blobUrl;
              a.download = 'caderneta.xlsx';
              a.click();

              window.URL.revokeObjectURL(blobUrl);

              this.confirmButtonClick.emit();
          },
          error: () => {
              this.setStatusContent('Algo deu errado ao finalizar sua caderneta, tente novamente mais tarde');
              this.switchStatusMode();
          }
      });
  }

  serializeMapObject(map: Map<string, number>): any {
      const serialzedObject: any = {};
      map.forEach((value, key) => {
          serialzedObject[key] = value;
      });
      return serialzedObject;
  }


  setStatusContent(content: string): void {
      this.setStatus('Erro Ao Finalizar Caderneta!', content);
  }

}
