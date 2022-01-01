import { Pattern } from '../../../models/pattern'

export class PatternsPaginated {
    pageNo: number
    pageSize: number
    totalItems: number
    totalPages: number
    items: Pattern[]
}