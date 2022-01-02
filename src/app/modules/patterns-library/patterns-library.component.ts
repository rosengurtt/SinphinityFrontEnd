import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core"
import { Subscription } from 'rxjs'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { PageEvent } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Band } from "../../core/models/band"
import { MusicStyle } from "../../core/models/music-style"
import { Song } from "../../core/models/song"
import { PaginationData } from '../../core/models/pagination-data'
import { Pattern } from "../../core/models/pattern"
import { PatternsFilter } from "src/app/core/models/patterns-filter"

@Component({
    selector: 'dc-patterns-library',
    templateUrl: './patterns-library.component.html',
    styleUrls: ['./patterns-library.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatternsLibraryComponent {
    @Input() stylesDataSource: MatTableDataSource<MusicStyle>
    @Input() bandsDataSource: MatTableDataSource<Band>
    @Input() songsDataSource: MatTableDataSource<Song>
    @Input() patternsDataSource: MatTableDataSource<Pattern>
    @Input() styleSelected: MusicStyle
    @Input() bandSelected: Band
    @Input() songSelected: Song
    @Input() patternSelected: Pattern
    @Input() stylesPageNo: number
    @Input() bandsPageNo: number
    @Input() songsPageNo: number
    @Input() patternsPageNo: number
    @Input() stylesPageSize: number
    @Input() bandsPageSize: number
    @Input() songsPageSize: number
    @Input() patternsPageSize: number
    @Input() totalStyles: number | null
    @Input() totalBands: number | null
    @Input() totalSongs: number | null
    @Input() totalPatterns: number | null
    @Output() stylesPageChanged = new EventEmitter<PaginationData>()
    @Output() bandsPageChanged = new EventEmitter<PaginationData>()
    @Output() songsPageChanged = new EventEmitter<PaginationData>()
    @Output() patternsPageChanged = new EventEmitter<PaginationData>()
    @Output() stylesTermChanged = new EventEmitter<string>()
    @Output() bandsTermChanged = new EventEmitter<string>()
    @Output() songsTermChanged = new EventEmitter<string>()
    @Output() patternsFilterChanged = new EventEmitter<PatternsFilter>()
    @Output() styleSelectedChanged = new EventEmitter<MusicStyle>()
    @Output() bandSelectedChanged = new EventEmitter<Band>()
    @Output() songSelectedChanged = new EventEmitter<Song>()
    @Output() patternSelectedChanged = new EventEmitter<Pattern>()
    @Output() analyzePattern = new EventEmitter<Pattern>()
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

    constructor(private router: Router) {
    }

    async ngOnInit(): Promise<any> {
        this.subscriptionSearchTerms.push(this.styleTerm.valueChanges.subscribe(value => this.stylesTermChanged.emit(value)))
        this.subscriptionSearchTerms.push(this.bandTerm.valueChanges.subscribe(value => this.bandsTermChanged.emit(value)))
        this.subscriptionSearchTerms.push(this.songTerm.valueChanges.subscribe(value => this.songsTermChanged.emit(value)))

        this.subscriptionSearchTerms.push(this.patternNumberOfNotes.valueChanges.subscribe(value => this.patternsFilterChanged.emit({numberOfNotes: value})))
        this.subscriptionSearchTerms.push(this.patternRange.valueChanges.subscribe(value => this.patternsFilterChanged.emit({range: value})))
        this.subscriptionSearchTerms.push(this.patternStep.valueChanges.subscribe(value => this.patternsFilterChanged.emit({step: value})))
        this.subscriptionSearchTerms.push(this.patternDurationInTicks.valueChanges.subscribe(value => this.patternsFilterChanged.emit({durationInTicks: value})))
        this.subscriptionSearchTerms.push(this.patternTerm.valueChanges.subscribe(value => this.patternsFilterChanged.emit({contains: value})))
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

    selectStyle(style: MusicStyle) {
        this.styleSelectedChanged.emit(style)
    }
    selectBand(band: Band) {
        this.bandSelectedChanged.emit(band)
    }
    selectSong(song: Song) {
        this.songSelectedChanged.emit(song)
    }

 

    analyzePatternClicked(pattern: Pattern) {
        this.analyzePattern.emit(pattern)
        this.router.navigate(["song-panel", pattern.id])
    }
}