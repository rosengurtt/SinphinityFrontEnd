import { Store } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { SongsRepositoryService } from '../../../core/services/songs-repository/songs-repository.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { PatternsLibraryApiActions, PatternsLibraryPageActions } from './actions'
import { PatternsLibraryState, getSongsLibraryState as getPatternsLibraryState } from '../state'

@Injectable()
export class PatternsLibraryEffects {

  constructor(
    private actions$: Actions,
    private songsRepositoryService: SongsRepositoryService,
    private store$: Store<PatternsLibraryState>) { }

  stylesPaginationChange$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.stylesPaginationChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getStyles({ pageNo: action.paginationData.pageNo, pageSize: action.paginationData.pageSize }, state.styleTerm)
            .pipe(
              map(data => PatternsLibraryApiActions.stylesPaginationChangeSuccess({ musicStylesPaginated: data.result })),
              catchError(error => of(PatternsLibraryApiActions.stylesPaginationChangeFailure({ error })))
            )
        )
      )
  })
  bandsPaginationChange$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.bandsPaginationChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getBands(state.styleSelected?.id, { pageNo: action.paginationData.pageNo, pageSize: action.paginationData.pageSize }, state.bandTerm)
            .pipe(
              map(data => PatternsLibraryApiActions.bandsPaginationChangeSuccess({ bandsPaginated: data.result })),
              catchError(error => of(PatternsLibraryApiActions.bandsPaginationChangeFailure({ error })))
            )
        )
      )
  })
  songsPaginationChange$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.songsPaginationChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getSongs(state.styleSelected?.id, state.bandSelected?.id, { pageNo: action.paginationData.pageNo, pageSize: action.paginationData.pageSize }, state.songTerm)
            .pipe(
              map(data => PatternsLibraryApiActions.songsPaginationChangeSuccess({ songsPaginated: data.result })),
              catchError(error => of(PatternsLibraryApiActions.songSelectedFailure({ error })))
            )
        )
      )
  })
  patternsPaginationChange$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.patternsPaginationChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getPatterns(state.styleSelected?.id, state.bandSelected?.id, state.songSelected?.id, { pageNo: action.paginationData.pageNo, pageSize: action.paginationData.pageSize }, state.patternTerm)
            .pipe(
              map(data => PatternsLibraryApiActions.patternsPaginationChangeSuccess({ patternsPaginated: data.result })),
              catchError(error => of(PatternsLibraryApiActions.patternsPaginationChangeFailure({ error })))
            )
        )
      )
  })


  styleSelected$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.styleSelectedChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
        this.songsRepositoryService.getSongs(action.selectedStyle.id, null, { pageNo: 0, pageSize: state.songsPaginated.pageSize }, state.songTerm)
            .pipe(
              withLatestFrom(
                this.songsRepositoryService.getBands(action.selectedStyle.id, { pageNo: 0, pageSize: state.bandsPaginated.pageSize }, state.bandTerm),
                this.songsRepositoryService.getPatterns(state.styleSelected?.id, null, null, { pageNo: 0, pageSize: state.patternsPaginated.pageSize }, state.patternTerm)
              ),
              map(([songs, bands, patterns]) =>
                PatternsLibraryApiActions.styleSelectedSuccess({ bandsPaginated: bands.result, songsPaginated: songs.result, patternsPaginated: patterns.result })),
              catchError(error => of(PatternsLibraryApiActions.styleSelectedFailure({ error })))

            )
        )
      )
  })


  bandSelected$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.bandSelectedChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getSongs(state.styleSelected?.id, action.selectedBand.id, { pageNo: 0, pageSize: state.songsPaginated.pageSize }, state.songTerm)
            .pipe(
              withLatestFrom(this.songsRepositoryService.getPatterns(null, action.selectedBand.id, null, { pageNo: 0, pageSize: state.patternsPaginated.pageSize }, state.songTerm)),
              map(([songs, patterns]) =>
                PatternsLibraryApiActions.bandSelectedSuccess({ songsPaginated: songs.result, patternsPaginated: patterns.result })),
              catchError(error => of(PatternsLibraryApiActions.bandSelectedFailure({ error })))
            )
        )
      )
  })

  songSelected$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.songSelectedChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getPatterns(state.styleSelected?.id, state.bandSelected?.id, action.selectedSong.id, { pageNo: 0, pageSize: state.patternsPaginated.pageSize }, state.songTerm)
            .pipe(
              map(data => PatternsLibraryApiActions.songSelectedSuccess({ patternsPaginated: data.result })),
              catchError(error => of(PatternsLibraryApiActions.bandSelectedFailure({ error })))
            )
        )
      )
  })


  filterStyleTermChange$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.filterStyleTermChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getStyles({ pageNo: 0, pageSize: state.musicStylesPaginated.pageSize }, action.styleTerm)
            .pipe(
              map(data => PatternsLibraryApiActions.filterStyleTermChangeSuccess({ musicStylesPaginated: data.result })),
              catchError(error => of(PatternsLibraryApiActions.filterStyleTermChangeFailure({ error })))
            )
        )
      )
  })

  filterBandTermChange$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.filterBandTermChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getBands(state.styleSelected?.id, { pageNo: 0, pageSize: state.bandsPaginated.pageSize }, action.bandTerm)
            .pipe(
              map(data => PatternsLibraryApiActions.filterBandTermChangeSuccess({ bandsPaginated: data.result })),
              catchError(error => of(PatternsLibraryApiActions.filterBandTermChangeFailure({ error })))
            )
        )
      )
  })
  filterSongTermChange$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.filterSongTermChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getSongs(state.styleSelected?.id, state.bandSelected?.id, { pageNo: 0, pageSize: state.songsPaginated.pageSize }, action.songTerm)
            .pipe(
              map(data => PatternsLibraryApiActions.filterSongTermChangeSuccess({ songsPaginated: data.result })),
              catchError(error => of(PatternsLibraryApiActions.filterSongTermChangeFailure({ error })))
            )
        )
      )
  })

  filterPatternTermChange$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PatternsLibraryPageActions.filterPatternTermChange),
        withLatestFrom(this.store$.select(getPatternsLibraryState)),
        mergeMap(([action, state]) =>
          this.songsRepositoryService.getPatterns(state.styleSelected?.id, state.bandSelected?.id, state.songSelected?.id, { pageNo: 0, pageSize: state.patternsPaginated.pageSize }, action.patternTerm)
            .pipe(
              map(data => PatternsLibraryApiActions.filterPatternTermChangeSuccess({ patternsPaginated: data.result })),
              catchError(error => of(PatternsLibraryApiActions.filterPatternTermChangeFailure({ error })))
            )
        )
      )
  })
}
