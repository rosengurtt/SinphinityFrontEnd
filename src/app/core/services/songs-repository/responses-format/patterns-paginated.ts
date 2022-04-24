import { Phrase } from '../../../models/pattern'

export class PhrasesPaginated {
    pageNo: number
    pageSize: number
    totalItems: number
    totalPages: number
    items: Phrase[]
}