import { Store } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators'
import { of } from 'rxjs'
import { SongsRepositoryService } from '../../../core/services/songs-repository/songs-repository.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { FileUploadApiActions, FileUploadPageActions } from './actions'
import { FileUploadState, getfileUploadState } from '.'

@Injectable()
export class FileUploadEffects {

  constructor(
    private actions$: Actions,
    private songsRepositoryService: SongsRepositoryService,
    private store$: Store<FileUploadState>) { }

 
    stylesPaginationChange$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(FileUploadPageActions.stylesPaginationChange),
          withLatestFrom(this.store$.select(getfileUploadState)),
          mergeMap(([action, state]) =>
            this.songsRepositoryService.getStyles({ pageNo: action.paginationData.pageNo, pageSize: action.paginationData.pageSize }, state.styleTerm)
              .pipe(
                map(data => FileUploadApiActions.stylesPaginationChangeSuccess({ musicStylesPaginated: data.result })),
                catchError(error => of(FileUploadApiActions.stylesPaginationChangeFailure({ error })))
              )
          )
        )
    })
    bandsPaginationChange$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(FileUploadPageActions.bandsPaginationChange),
          withLatestFrom(this.store$.select(getfileUploadState)),
          mergeMap(([action, state]) =>
            this.songsRepositoryService.getBands(state.styleSelected?.id, { pageNo: action.paginationData.pageNo, pageSize: action.paginationData.pageSize }, state.bandTerm)
              .pipe(
                map(data => FileUploadApiActions.bandsPaginationChangeSuccess({ bandsPaginated: data.result })),
                catchError(error => of(FileUploadApiActions.bandsPaginationChangeFailure({ error })))
              )
          )
        )
    })  
  
    styleSelected$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(FileUploadPageActions.styleSelectedChange),
          withLatestFrom(this.store$.select(getfileUploadState)),
          mergeMap(([action, state]) =>
            this.songsRepositoryService.getBands(action.selectedStyle.id, { pageNo: 0, pageSize: state.bandsPaginated.pageSize }, state.bandTerm)
              .pipe(
                map((bands) =>
                  FileUploadApiActions.styleSelectedSuccess({ bandsPaginated: bands.result }))
                  ,
                catchError(error => of(FileUploadApiActions.styleSelectedFailure({ error })))
              )
          )
        )
    })  
  

  
    filterStyleTermChange$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(FileUploadPageActions.filterStyleTermChange),
          withLatestFrom(this.store$.select(getfileUploadState)),
          mergeMap(([action, state]) =>
            this.songsRepositoryService.getStyles({ pageNo: 0, pageSize: state.musicStylesPaginated.pageSize }, action.styleTerm)
              .pipe(
                map(data => FileUploadApiActions.filterStyleTermChangeSuccess({ musicStylesPaginated: data.result })),
                catchError(error => of(FileUploadApiActions.filterStyleTermChangeFailure({ error })))
              )
          )
        )
    })
  
    filterBandTermChange$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(FileUploadPageActions.filterBandTermChange),
          withLatestFrom(this.store$.select(getfileUploadState)),
          mergeMap(([action, state]) =>
            this.songsRepositoryService.getBands(state.styleSelected?.id, { pageNo: 0, pageSize: state.bandsPaginated.pageSize }, action.bandTerm)
              .pipe(
                map(data => FileUploadApiActions.filterBandTermChangeSuccess({ bandsPaginated: data.result })),
                catchError(error => of(FileUploadApiActions.filterBandTermChangeFailure({ error })))
              )
          )
        )
    })





}
