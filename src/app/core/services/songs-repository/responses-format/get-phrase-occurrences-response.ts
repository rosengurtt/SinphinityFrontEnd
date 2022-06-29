import { PhraseOccurrencesPaginated } from './phrase-occurrences-paginated'

export class GetPhraseOccurrencesResponse {
    statusCode: number
    message: string
    result: PhraseOccurrencesPaginated
}