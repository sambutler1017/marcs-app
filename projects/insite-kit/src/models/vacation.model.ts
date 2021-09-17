import { VacationStatus } from "./common.model";

export interface Vacation {
    id?: number;
    userId?: number;
    startDate?: Date | string;
    endDate?: Date | string;
    insertDate?: Date;
    status?: VacationStatus;
}