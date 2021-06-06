import { createAction, props } from '@ngrx/store'
import { BandsPaginated } from 'src/app/core/services/songs-repository/responses-format/bands-paginated'
import { MusicStylesPaginated } from 'src/app/core/services/songs-repository/responses-format/music-styles-paginated'
import { Band } from '../../../../core/models/band'
import { MusicStyle } from '../../../../core/models/music-style'



export const stylesPaginationChangeSuccess = createAction(
    '[File Upload API] Styles Page Change Success',
    props<{ musicStylesPaginated: MusicStylesPaginated }>()
)
export const stylesPaginationChangeFailure = createAction(
    '[File Upload API] Styles Page Change Fail',
    props<{ error: string }>()
)
export const bandsPaginationChangeSuccess = createAction(
    '[File Upload API] Bands Page Change Success',
    props<{ bandsPaginated: BandsPaginated }>()
)
export const bandsPaginationChangeFailure = createAction(
    '[File Upload API] Bands Page Change Fail',
    props<{ error: string }>()
)
export const styleSelectedSuccess = createAction(
    '[File Upload API] Style Selected Success',
    props<{ bandsPaginated: BandsPaginated }>()
)
export const styleSelectedFailure = createAction(
    '[File Upload API] Style Selected Fail',
    props<{ error: string }>()
)
export const bandSelectedSuccess = createAction(
    '[File Upload API] Band Selected Success'
)
export const bandSelectedFailure = createAction(
    '[File Upload API] Band Selected Fail',
    props<{ error: string }>()
)
export const filterStyleTermChangeSuccess = createAction(
    '[File Upload API] Filter Styles Term Change Success',
    props<{ musicStylesPaginated: MusicStylesPaginated }>()
)
export const filterStyleTermChangeFailure = createAction(
    '[File Upload API] Filter Styles Term Change Fail',
    props<{ error: string }>()
)
export const filterBandTermChangeSuccess = createAction(
    '[File Upload API] Filter Bands Term Change Success',
    props<{ bandsPaginated: BandsPaginated }>()
)
export const filterBandTermChangeFailure = createAction(
    '[File Upload API] Filter Bands Term Change Fail',
    props<{ error: string }>()
)