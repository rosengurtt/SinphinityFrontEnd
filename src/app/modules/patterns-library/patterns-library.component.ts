import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core"
import { Subscription } from 'rxjs'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { PageEvent } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Band } from "../../core/models/band"
import { MusicStyle } from "../../core/models/music-style"
import { Song } from "../../core/models/song"
import { PaginationData } from '../../core/models/pagination-data'
import { Phrase } from "../../core/models/phrase"
import { PhrasesFilter } from "src/app/core/models/phrases-filter"
import { environment } from '../../../environments/environment'
import { PhraseOccurrence } from "src/app/core/models/phrase-occurrence"
import { Voice } from "src/app/core/models/voice"

declare var MIDIjs: any

@Component({
    selector: 'dc-patterns-library',
    templateUrl: './patterns-library.component.html',
    styleUrls: ['./patterns-library.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatternsLibraryComponent  {
    @Input() stylesDataSource: MatTableDataSource<MusicStyle>
    @Input() bandsDataSource: MatTableDataSource<Band>
    @Input() songsDataSource: MatTableDataSource<Song>
    @Input() patternsDataSource: MatTableDataSource<Phrase>
    @Input() occurrencesDataSource: MatTableDataSource<PhraseOccurrence>
    @Input() voices: Voice[]
    @Input() styleSelected: MusicStyle
    @Input() bandSelected: Band
    @Input() songSelected: Song
    @Input() phraseSelected: Phrase
    @Input() occurrenceSelected: PhraseOccurrence
    @Input() stylesPageNo: number
    @Input() bandsPageNo: number
    @Input() songsPageNo: number
    @Input() patternsPageNo: number
    @Input() occurrencesPageNo: number
    @Input() stylesPageSize: number
    @Input() bandsPageSize: number
    @Input() songsPageSize: number
    @Input() patternsPageSize: number
    @Input() occurrencesPageSize: number
    @Input() totalStyles: number | null
    @Input() totalBands: number | null
    @Input() totalSongs: number | null
    @Input() totalPatterns: number | null
    @Input() totalOccurrences: number | null
    @Output() stylesPageChanged = new EventEmitter<PaginationData>()
    @Output() bandsPageChanged = new EventEmitter<PaginationData>()
    @Output() songsPageChanged = new EventEmitter<PaginationData>()
    @Output() patternsPageChanged = new EventEmitter<PaginationData>()
    @Output() occurrencesPageChanged = new EventEmitter<PaginationData>()
    @Output() stylesTermChanged = new EventEmitter<string>()
    @Output() bandsTermChanged = new EventEmitter<string>()
    @Output() songsTermChanged = new EventEmitter<string>()
    @Output() phrasesFilterChanged = new EventEmitter<PhrasesFilter>()
    @Output() styleSelectedChanged = new EventEmitter<MusicStyle>()
    @Output() bandSelectedChanged = new EventEmitter<Band>()
    @Output() songSelectedChanged = new EventEmitter<Song>()
    @Output() phraseSelectedChanged = new EventEmitter<Phrase>()
    @Output() occurrenceSelectedChanged = new EventEmitter<PhraseOccurrence>()
    @Output() analyzePattern = new EventEmitter<Phrase>()    
    @Output() voiceSelectedChanged = new EventEmitter<number>()

    displayedColumns: string[] = ['name']
    subscriptionSearchTerms: Subscription[] = []
    styleTerm = new FormControl()
    bandTerm = new FormControl()
    songTerm = new FormControl()
    patternTerm = new FormControl()
    patternNumberOfNotes = new FormControl()
    patternRange = new FormControl()
    patternStep = new FormControl()
    patternDurationInTicks = new FormControl()
    backendUrl: string


    svgBoxWidth = 400
    svgBoxHeight = 200
    svgBoxIdPrefix = "svgPattern"

    constructor(private router: Router) {
    }


    async ngOnInit(): Promise<any> {
        this.backendUrl = environment.GetEnvironment().SinphinityBackend
        this.subscriptionSearchTerms.push(this.styleTerm.valueChanges.subscribe(value => this.stylesTermChanged.emit(value)))
        this.subscriptionSearchTerms.push(this.bandTerm.valueChanges.subscribe(value => this.bandsTermChanged.emit(value)))
        this.subscriptionSearchTerms.push(this.songTerm.valueChanges.subscribe(value => this.songsTermChanged.emit(value)))

        this.subscriptionSearchTerms.push(this.patternNumberOfNotes.valueChanges.subscribe(value => this.phrasesFilterChanged.emit({ numberOfNotes: value, alca: "numberOfNotes" })))
        this.subscriptionSearchTerms.push(this.patternRange.valueChanges.subscribe(value => this.phrasesFilterChanged.emit({ range: value, alca: "range" })))
        this.subscriptionSearchTerms.push(this.patternStep.valueChanges.subscribe(value => this.phrasesFilterChanged.emit({ step: value, alca: "step" })))
        this.subscriptionSearchTerms.push(this.patternDurationInTicks.valueChanges.subscribe(value => this.phrasesFilterChanged.emit({ durationInTicks: value, alca: "duration" })))
        this.subscriptionSearchTerms.push(this.patternTerm.valueChanges.subscribe(value => this.phrasesFilterChanged.emit({ contains: value, alca: "term" })))

    }

    public getStylesPage(event?: PageEvent) {
        if (event) this.stylesPageChanged.emit({ pageNo: event.pageIndex, pageSize: event.pageSize })
        return event
    }

    public getBandsPage(event?: PageEvent) {
        if (event) this.bandsPageChanged.emit({ pageNo: event.pageIndex, pageSize: event.pageSize })
        return event
    }

    public getSongsPage(event?: PageEvent) {
        if (event) this.songsPageChanged.emit({ pageNo: event.pageIndex, pageSize: event.pageSize })
        return event
    }
    public getPatternsPage(event?: PageEvent) {
        if (event) this.patternsPageChanged.emit({ pageNo: event.pageIndex, pageSize: event.pageSize })
        return event
    }
    public getOccurrencesPage(event?: PageEvent) {
        if (event) this.occurrencesPageChanged.emit({ pageNo: event.pageIndex, pageSize: event.pageSize })
        return event
    }

    selectStyle(style: MusicStyle) {
        this.styleSelectedChanged.emit(style)
    }
    selectBand(band: Band) {
        this.bandSelectedChanged.emit(band)
    }
    selectSong(song: Song) {
        this.songSelectedChanged.emit(song)
    }
    selectPhrase(phrase: Phrase) {
        this.phraseSelectedChanged.emit(phrase)
    }
    selectOccurrence(occurrence: PhraseOccurrence) {
        this.occurrenceSelectedChanged.emit(occurrence)
    }
    playPhrase(phrase: Phrase) {
        const midiUrl = `${this.backendUrl}phrases/midi?metricsAsString=${phrase.metricsAsString}&pitchesAsString=${phrase.pitchesAsString}`
        MIDIjs.play(midiUrl)
    }

    playPhraseInSong(occurrence: PhraseOccurrence, playSingleVoice = false) {
        let mutedTracks = ""
        if (playSingleVoice) {
            for (let i = 0; i < 25; i++) {
                if (i != occurrence.voice) {
                    mutedTracks += i + ","
                }
            }
            if (mutedTracks.endsWith(","))
                mutedTracks = mutedTracks.substring(0, mutedTracks.length - 1)
        }
        const midiUrl = `${this.backendUrl}songs/${occurrence.song.id}/midi?simplificationVersion=0&fromTick=${occurrence.startTick}&toTick=${occurrence.endTick}&mutedTracks=${mutedTracks}`
        MIDIjs.play(midiUrl)

    }
    stopPlaying() {
        MIDIjs.stop()

    }

    analyzePatternClicked(pattern: Phrase) {
        this.analyzePattern.emit(pattern)
        this.router.navigate(["song-panel", pattern.id])
    }

    voiceSelected(voice:number){
        this.voiceSelectedChanged.emit(voice)
    }
}