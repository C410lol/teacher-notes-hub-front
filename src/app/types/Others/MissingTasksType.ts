import { MissingTaskLessonType } from "./MissingTaskLessonType"
import { MissingTaskWorkType } from "./MissingTaskWorkType"

export type MissingTasksType = {

    missingLessons: MissingTaskLessonType[],
    missingWorks: MissingTaskWorkType[]

}