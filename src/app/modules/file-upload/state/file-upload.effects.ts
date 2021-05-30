import { Store } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { SongsRepositoryService } from '../../../core/services/songs-repository/songs-repository.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { FileUploadApiActions, FileUploadPageActions } from './actions'
import { FileUploadState } from '.'

@Injectable()
export class FileUploadEffects {

  constructor(
    private actions$: Actions,
    private songsRepositoryService: SongsRepositoryService,
    private store$: Store<FileUploadState>) { }

 
    loadStyles$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(FileUploadPageActions.loadStyles),
          mergeMap(action =>
            this.songsRepositoryService.getStyles({ pageNo: 0, pageSize: 300 }, null)
              .pipe(
                map(data => FileUploadApiActions.loadStylesSuccess({ styles: data.result.items })),
                catchError(error => of(FileUploadApiActions.loadStylesFailure({ error })))
              )
          )
        )
    })

    loadBands$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(FileUploadPageActions.loadBands),
          mergeMap(action =>
            this.songsRepositoryService.getBands(null, {  pageNo: 0, pageSize: 300 }, null)
              .pipe(
                map(data => FileUploadApiActions.loadBandsSuccess({ bands: data.result.items })),
                catchError(error => of(FileUploadApiActions.loadBandsFailure({ error })))
              )
          )
        )
    })

  styleSelected$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(FileUploadPageActions.styleSelectedChange),
        mergeMap((action) =>
          this.songsRepositoryService.getBands(action.selectedStyle.id, { pageNo: 0, pageSize: 300 }, null)
            .pipe(
              map(bands => FileUploadApiActions.styleSelectedSuccess({ bands: bands.result.items})),
              catchError(error => of(FileUploadApiActions.styleSelectedFailure({ error })))
            )
        )
      )
  })





}
