import { GeneralMidiInstrument } from "./midi/midi-codes/general-midi-instrument"


export class Voice {
    voiceNumber: number
    instrumentNumber: number

    public instrument(): string {
        return GeneralMidiInstrument.GetInstrumentName(this.instrumentNumber)
    }
}