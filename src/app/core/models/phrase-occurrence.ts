import {Phrase} from './phrase'
import {Song} from './song'
import {Band} from './band'

export class PhraseOccurrence {
    voice: number
    barNumber:number
    beat:number
    startTick:number
    endTick:number
    phrase: Phrase
    song: Song
    band :Band
}