import { StudentType } from './StudentType';

export type AttendanceType = {
    id?: number,
    presentStudents: StudentType[],
    absentStudents: StudentType[],
}