import { StudentType } from "../StudentType"

export type StudentPerformanceType = {

    student: StudentType,
    totalLessons: number,
    absences: number,
    absencesPercentage: string,
    absencesStatus: string

}