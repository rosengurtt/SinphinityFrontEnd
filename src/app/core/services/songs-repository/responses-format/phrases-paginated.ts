import { Phrase } from '../../../models/phrase'

export class PhrasesPaginated {
    pageNo: number
    pageSize: number
    totalItems: number
    totalPages: number
    items: Phrase[]
}