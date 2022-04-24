import { PhrasesPaginated } from './phrases-paginated'

export class GetPhrasesResponse {
    statusCode: number
    message: string
    result: PhrasesPaginated
}