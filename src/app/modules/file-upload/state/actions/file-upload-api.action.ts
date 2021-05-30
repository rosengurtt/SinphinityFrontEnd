import { createAction, props } from '@ngrx/store'
import { Band } from '../../../../core/models/band'
import { MusicStyle } from '../../../../core/models/music-style'


export const styleSelectedSuccess = createAction(
    '[File Upload API] Style Selected Success',
    props<{ bands: Band[] }>()
)

export const styleSelectedFailure = createAction(
    '[File Upload API] Style Selected Fail',
    props<{ error: string }>()
)
export const loadStylesSuccess = createAction(
    '[File Upload API] Load Styles Success',
    props<{ styles: MusicStyle[] }>()
)

export const loadStylesFailure = createAction(
    '[FileUpload API] Load Styles Fail',
    props<{ error: string }>()
)
export const loadBandsSuccess = createAction(
    '[File Upload API] Load Bands Success',
    props<{ bands: Band[] }>()
)

export const loadBandsFailure = createAction(
    '[FileUpload API] Load Bands Fail',
    props<{ error: string }>()
)

