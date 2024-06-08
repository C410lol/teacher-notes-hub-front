import { StudentType } from "./StudentType"

export type FinishedStudentType = {

    id: string,
    student: StudentType,
    finalGrade: number,
    absences: number,
    presencePercentage: string

}