import { Band } from './band';
import { MusicStyle } from './music-style';
import { MidiStats } from './midi-stats';
import { SongSimplification } from './song-simplification';
import { Bar } from './bar';
import { TempoChange } from './tempo-change';

export class Song {
    // tslint:disable-next-line: variable-name
    id: string
    name: string
    band: Band
    style: MusicStyle
    midiBase64Encoded: string
    midiStats: MidiStats
    songSimplifications: SongSimplification[]
    bars: Bar[]
    tempoChanges: TempoChange[]
    durationInSeconds: number
    durationInTicks: number
    averageTempoInBeatsPerMinute: number
}
