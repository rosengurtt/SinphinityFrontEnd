import { Song } from "./song"

export class Pattern {
    id: string
    asString: string
    asStringWithoutOrnaments: string
    asStringBasic: string
    durationInTicks: number
    numberOfNotes: number
    range: number
    isMonotone: boolean
    step: number

    get asSong(): Song{
        let retObj =  new Song()

        

        return retObj
    }
}