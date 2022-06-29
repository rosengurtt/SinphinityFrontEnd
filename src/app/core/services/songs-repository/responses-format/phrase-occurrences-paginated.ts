import { PhraseOccurrence } from '../../../models/phrase-occurrence'

export class PhraseOccurrencesPaginated {
    pageNo: number
    pageSize: number
    totalItems: number
    totalPages: number
    items: PhraseOccurrence[]
}