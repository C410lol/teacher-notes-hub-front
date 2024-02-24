import { BNCCCodeType } from "./BNCCCodeType"

export type LessonType = {

    id?: number,
    title: string,
    details: string,
    observations: string,
    bnccCodes?: BNCCCodeType[],
    quantity: number,
    date: string,
    attendances?: number

}