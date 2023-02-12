import { ErrorException } from ".";

export interface ResponseApi<T> extends Partial<ErrorException> {
    data?: T
    status?: string
    message?: string
}
