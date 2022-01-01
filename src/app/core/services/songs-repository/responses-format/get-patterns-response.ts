import { PatternsPaginated } from './patterns-paginated'

export class GetPatternsResponse {
    statusCode: number
    message: string
    result: PatternsPaginated
}