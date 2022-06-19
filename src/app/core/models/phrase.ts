import { PhraseTypeEnum } from "./enums/phrase-type.enum"
import { Note } from "./note"
import { Song } from "./song"

export class Phrase {
    id: string
    asString: string
    asStringWithoutOrnaments: string
    asStringBasic: string
    durationInTicks: number
    numberOfNotes: number
    range: number
    isMonotone: boolean
    step: number
    phraseType: PhraseTypeEnum
    asSong: Song

}