export class MidiStats {
    totalTracks: number
    totalChannels: number
    totalEvents: number
    totalNoteEvents: number
    totalTempoChanges: number
    totalPitchBendEvents: number
    totalProgramChangeEvents: number
    totalControlChangeEvents: number
    totalSustainPedalEvents: number
    totalChannelIndependentEvents: number
    hasMoreThanOneInstrumentPerTrack: boolean
    hasMoreThanOneChannelPerTrack: boolean
    totalChordTracks: number
    totalMelodicTracks: number
    totalBassTracks: number
    totalPercussionTracks: number
    totalTracksWithoutNotes: number
    totalInstruments: number
    totalPercussionInstruments: number
    durationInTicks: number
    durationInSeconds: number
}

