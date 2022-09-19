import { Song } from "./song"

export class Phrase {
    id: string
    metricsAsString: string
    pitchesAsString: string
    durationInTicks: number
    numberOfNotes: number
    range: number
    isMonotone: boolean
    step: number
    asSong: Song

}