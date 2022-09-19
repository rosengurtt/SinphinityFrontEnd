export class PhrasesFilter{
    numberOfNotes?: number
    range?: number
    step?: number
    durationInTicks?: number
    isMonotone?: boolean
    contains?: string
    // the next filter is needed for a work around for a problem that happens because of spurious events in Angular
    alca?: string
}