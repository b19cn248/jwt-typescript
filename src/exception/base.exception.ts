export type BaseResponseType<D> = SuccessResponseType<D> | FailedResponseType<string | string[]>;

export interface IBaseResponse{
    statusCode: number,
}

export interface SuccessResponseType<D> extends IBaseResponse {
    message: string
    data: D
}

export interface FailedResponseType<E> extends IBaseResponse {
    message: E
}

export function instanceOfFailedResponseType<T>(object: any): object is FailedResponseType<T>{
    return object.statusCode !== undefined
}

export interface IListResponse<Data> {
    items: Data
    total: number
}

export const successResponse = <D>(message: string, data: D): SuccessResponseType<D> => {
    return {message ,data, statusCode: 200 }
};

export const failedResponse = <E>(message: E, statusCode: number): FailedResponseType<E> => {
    return { message, statusCode }
};
