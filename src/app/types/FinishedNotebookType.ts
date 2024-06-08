import { FinishedStudentType } from "./FinishedStudentType"
import { NotebookType } from "./NotebookType"

export type FinishedNotebookType = {

    id: string,
    notebook: NotebookType,
    totalLessons: number,
    finishedStudents: FinishedStudentType[]

}