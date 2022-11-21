import { Pipe, PipeTransform } from "@angular/core";
import { Instrument } from '../models/midi/midi-codes/instrument.enum'

@Pipe({ name: 'instrumentCodeToName' })
export class InstrumentCodeToNamePipe implements PipeTransform {
    transform(value: number): string {
        
        return Instrument[value]
    }
}

