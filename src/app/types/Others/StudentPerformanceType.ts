import { StudentType } from "../StudentType"

export type StudentPerformanceType = {

    student: StudentType,
    absences: number,
    absencesPercentage: string,
    absencesStatus: string

}