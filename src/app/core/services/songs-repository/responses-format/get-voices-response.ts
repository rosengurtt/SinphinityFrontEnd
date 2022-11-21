import { Voice } from "../../../models/voice"

export class GetVoicesResponse {
    statusCode: number
    message: string
    result: Voice[]
}