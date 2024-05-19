import { InstitutionType } from "./InstitutionType"

export type UserType = {
    id: string,
    name: string,
    email: string,
    role: string,
    institution: InstitutionType,
    notebooks: number
}