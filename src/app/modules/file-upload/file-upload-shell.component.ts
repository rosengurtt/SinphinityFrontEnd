import { Component, OnInit } from '@angular/core'
import { MusicStyle } from '../../core/models/music-style'
import { Observable } from 'rxjs'
import { Band } from '../../core/models/band'
import { FileUploadState, getBands, getBandsCurrentPage, getBandSelected, getErrorBands, getErrorStyles, getStyles, getStylesCurrentPage, getStyleSelected, getTotalBands, getTotalStyles } from './state'
import { Store } from '@ngrx/store'
import { FileUploadPageActions } from './state/actions'
import { MatTableDataSource } from '@angular/material/table'
import { PaginationData } from 'src/app/core/models/pagination-data'
import { map } from 'rxjs/operators'

@Component({
    templateUrl: './file-upload-shell.component.html'
})
export class FileUploadShellComponent implements OnInit {
    styles$: Observable<MusicStyle[]>
    bands$: Observable<Band[]>
    errorMessage$: Observable<string>;
    saveResult$: Observable<string>
    stylesLoaded$: Observable<boolean>

    stylesDatasource$: Observable<MatTableDataSource<MusicStyle>>
    bandsDatasource$: Observable<MatTableDataSource<Band>>

    styleSelected$: Observable<MusicStyle>
    bandSelected$: Observable<Band>

    stylesPageNo$: Observable<number>
    bandsPageNo$: Observable<number>

    totalStyles$: Observable<number>
    totalBands$: Observable<number>

    stylesPageSize = 10
    bandsPageSize = 10
    songsPageSize = 11

    errorStylesMessage$: Observable<string>
    errorBandsMessage$: Observable<string>

    constructor(private fileUploadStore: Store<FileUploadState>) { }


    ngOnInit(): void {


        this.stylesDatasource$ = this.fileUploadStore.select(getStyles).pipe(map(styles => new MatTableDataSource<MusicStyle>(styles)))
        this.bandsDatasource$ = this.fileUploadStore.select(getBands).pipe(map(bands => new MatTableDataSource<Band>(bands)))

        this.stylesPageNo$ = this.fileUploadStore.select(getStylesCurrentPage)
        this.bandsPageNo$ = this.fileUploadStore.select(getBandsCurrentPage)

        this.totalStyles$ = this.fileUploadStore.select(getTotalStyles)
        this.totalBands$ = this.fileUploadStore.select(getTotalBands)

        this.styleSelected$ = this.fileUploadStore.select(getStyleSelected)
        this.bandSelected$ = this.fileUploadStore.select(getBandSelected)

        this.errorStylesMessage$ = this.fileUploadStore.select(getErrorStyles)
        this.errorBandsMessage$ = this.fileUploadStore.select(getErrorBands)

        this.fileUploadStore.dispatch(FileUploadPageActions.stylesPaginationChange({ paginationData: { pageSize: this.stylesPageSize, pageNo: 0 } }))
        this.fileUploadStore.dispatch(FileUploadPageActions.bandsPaginationChange({  paginationData: { pageSize: this.bandsPageSize, pageNo: 0 } }))
    }

    stylesPageChanged(paginationData: PaginationData): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.stylesPaginationChange({ paginationData: paginationData }))
    }
    bandsPageChanged(paginationData: PaginationData): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.bandsPaginationChange({ paginationData: paginationData }))
    }

    stylesTermChanged(term: string): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.filterStyleTermChange({ styleTerm: term }))
    }
    bandsTermChanged(term: string): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.filterBandTermChange({ bandTerm: term }))
    }

    styleSelectedChange(style: MusicStyle): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.styleSelectedChange({ selectedStyle: style }))
    }
    bandSelectedChange(band: Band): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.bandSelectedChange({ selectedBand: band }))
    }
    
}

