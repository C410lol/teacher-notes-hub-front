import { AttendanceType } from "./AttendanceType"

export type LessonType = {

    id?: number,
    title: string,
    details: string,
    observations: string,
    quantity: number,
    date: string,
    attendances?: number

}