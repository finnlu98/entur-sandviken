import type IBaseResponse from "./base-response-contract";

export default class BaseResponse implements IBaseResponse {
    Identifier!: string
    static fromJSON(json: any): BaseResponse {
        return Object.assign(new BaseResponse(), json);
    }
}