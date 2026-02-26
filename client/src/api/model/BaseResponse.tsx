import type IBaseResponse from "./IBaseResponse";

export default class BaseResponse implements IBaseResponse {
    Identifier!: string
    static fromJSON(json: any): BaseResponse {
        return Object.assign(new BaseResponse(), json);
    }
}