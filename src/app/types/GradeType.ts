import { StudentType } from "./StudentType"

export type GradeType = {
    id: number,
    grade: number,
    student: StudentType,
}