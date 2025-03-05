export declare class ResponseDto<T> {
    statusCode: number;
    message: string;
    body: T;
    constructor(statusCode: number, message: string, body: T);
}
