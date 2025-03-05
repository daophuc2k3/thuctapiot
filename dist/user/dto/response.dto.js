"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = void 0;
class ResponseDto {
    statusCode;
    message;
    body;
    constructor(statusCode, message, body) {
        this.statusCode = statusCode;
        this.message = message;
        this.body = body;
    }
}
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map