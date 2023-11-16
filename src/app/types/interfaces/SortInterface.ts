export interface SortInterface {

    sortBy: string;
    direction: string;
    pageNum: number;

    orderByOnChange(orderBy: string): void;
    directionOnChange(direction: string): void;
    pageNumOnChange(pageNum: number): void;

}