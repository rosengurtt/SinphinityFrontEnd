import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { MatTableDataSource } from '@angular/material/table'
import {
    getBands,
    getStyles,
    getSongs,
    PatternsLibraryState,
    getErrorStyles,
    getErrorBands,
    getSongsCurrentPage,
    getBandsCurrentPage,
    getErrorSongs,
    getStylesCurrentPage,
    getTotalStyles,
    getTotalBands,
    getTotalSongs,
    getStyleSelected,
    getBandSelected,
    getSongSelected,
    getPatterns,
    getPatternsCurrentPage,
    getTotalPatterns,
    getPatternSelected,
    getErrorPatterns
} from './state'
import { MusicStyle } from '../../core/models/music-style'
import { Band } from '../../core/models/band'
import { Song } from '../../core/models/song'
import { PatternsLibraryPageActions } from './state/actions'
import { State } from '../../core/state/app.state'
import { PaginationData } from '../../core/models/pagination-data'
import { Pattern } from '../../core/models/pattern'
import { PatternsFilter } from 'src/app/core/models/patterns-filter'

@Component({
    templateUrl: './patterns-library-shell.component.html'
})
export class PatternsLibraryShellComponent implements OnInit {

    stylesDatasource$: Observable<MatTableDataSource<MusicStyle>>
    bandsDatasource$: Observable<MatTableDataSource<Band>>
    songsDatasource$: Observable<MatTableDataSource<Song>>
    patternsDatasource$: Observable<MatTableDataSource<Pattern>>

    styleSelected$: Observable<MusicStyle>
    bandSelected$: Observable<Band>
    songSelected$: Observable<Song>
    patternSelected$: Observable<Pattern>

    stylesPageNo$: Observable<number>
    bandsPageNo$: Observable<number>
    songsPageNo$: Observable<number>
    patternsPageNo$: Observable<number>

    totalStyles$: Observable<number>
    totalBands$: Observable<number>
    totalSongs$: Observable<number>
    totalPatterns$: Observable<number>

    stylesPageSize = 10
    bandsPageSize = 10
    songsPageSize = 10
    patternsPageSize = 10

    errorStylesMessage$: Observable<string>
    errorBandsMessage$: Observable<string>
    errorSongsMessage$: Observable<string>
    errorPatternsMessage$: Observable<string>

    constructor(
        private patternsLibStore: Store<PatternsLibraryState>,
        private mainStore: Store<State>) { }

    ngOnInit(): void {
        this.stylesDatasource$ = this.patternsLibStore.select(getStyles).pipe(map(styles => new MatTableDataSource<MusicStyle>(styles)))
        this.bandsDatasource$ = this.patternsLibStore.select(getBands).pipe(map(bands => new MatTableDataSource<Band>(bands)))
        this.songsDatasource$ = this.patternsLibStore.select(getSongs).pipe(map(songs => new MatTableDataSource<Song>(songs)))
        this.patternsDatasource$ = this.patternsLibStore.select(getPatterns).pipe(map(patterns => new MatTableDataSource<Pattern>(patterns)))

        this.stylesPageNo$ = this.patternsLibStore.select(getStylesCurrentPage)
        this.bandsPageNo$ = this.patternsLibStore.select(getBandsCurrentPage)
        this.songsPageNo$ = this.patternsLibStore.select(getSongsCurrentPage)
        this.patternsPageNo$ = this.patternsLibStore.select(getPatternsCurrentPage)

        this.totalStyles$ = this.patternsLibStore.select(getTotalStyles)
        this.totalBands$ = this.patternsLibStore.select(getTotalBands)
        this.totalSongs$ = this.patternsLibStore.select(getTotalSongs)
        this.totalPatterns$ = this.patternsLibStore.select(getTotalPatterns)

        this.styleSelected$ = this.patternsLibStore.select(getStyleSelected)
        this.bandSelected$ = this.patternsLibStore.select(getBandSelected)
        this.songSelected$ = this.patternsLibStore.select(getSongSelected)
        this.patternSelected$ = this.patternsLibStore.select(getPatternSelected)

        this.errorStylesMessage$ = this.patternsLibStore.select(getErrorStyles)
        this.errorBandsMessage$ = this.patternsLibStore.select(getErrorBands)
        this.errorSongsMessage$ = this.patternsLibStore.select(getErrorSongs)
        this.errorPatternsMessage$ = this.patternsLibStore.select(getErrorPatterns)

        this.patternsLibStore.dispatch(PatternsLibraryPageActions.stylesPaginationChange({ paginationData: { pageSize: this.stylesPageSize, pageNo: 0 } }))
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.bandsPaginationChange({ paginationData: { pageSize: this.bandsPageSize, pageNo: 0 } }))
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.songsPaginationChange({ paginationData: { pageSize: this.songsPageSize, pageNo: 0 } }))
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.patternsPaginationChange({ paginationData: { pageSize: this.patternsPageSize, pageNo: 0 } }))
    }


    stylesPageChanged(paginationData: PaginationData): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.stylesPaginationChange({ paginationData: paginationData }))
    }
    bandsPageChanged(paginationData: PaginationData): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.bandsPaginationChange({ paginationData: paginationData }))
    }
    songsPageChanged(paginationData: PaginationData): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.songsPaginationChange({ paginationData: paginationData }))
    }
    patternsPageChanged(paginationData: PaginationData): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.patternsPaginationChange({ paginationData: paginationData }))
    }

    stylesTermChanged(term: string): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.filterStyleTermChange({ styleTerm: term }))
    }
    bandsTermChanged(term: string): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.filterBandTermChange({ bandTerm: term }))
    }
    songsTermChanged(term: string): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.filterSongTermChange({ songTerm: term }))
    }
    patternsFilterChanged(filterData: PatternsFilter): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.filterPatternChange({ patternFilter: filterData }))
    }

    styleSelectedChange(style: MusicStyle): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.styleSelectedChange({ selectedStyle: style }))
    }
    bandSelectedChange(band: Band): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.bandSelectedChange({ selectedBand: band }))
    }
    songSelectedChange(song: Song): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.songSelectedChange({ selectedSong: song }))
    }
    patternSelectedChange(pattern: Pattern): void {
        this.patternsLibStore.dispatch(PatternsLibraryPageActions.patternSelectedChange({ selectedPattern: pattern }))
    }
    analyzePattern(pattern: Pattern): void {
        //this.mainStore.dispatch(PatternPanelPageActions.addSong({ song: song }))
    }
}