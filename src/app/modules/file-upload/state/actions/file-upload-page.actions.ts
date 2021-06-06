import { createAction, props } from '@ngrx/store'
import { Band } from 'src/app/core/models/band'
import { PaginationData } from 'src/app/core/models/pagination-data'
import { MusicStyle } from '../../../../core/models/music-style'


export const filterStyleTermChange = createAction(
    '[File Upload Page] Filter Style',
    props<{ styleTerm: string }>()
)
export const filterBandTermChange = createAction(
    '[File Upload Page] Filter Band',
    props<{ bandTerm: string }>()
)
export const stylesPaginationChange = createAction(
    '[File Upload Page] Page Style',
    props<{ paginationData: PaginationData }>()
)
export const bandsPaginationChange = createAction(
    '[File Upload Page] Page Band',
    props<{ paginationData: PaginationData }>()
)
export const styleSelectedChange = createAction(
    '[File Upload Page] Style Selected Change',
    props<{ selectedStyle: MusicStyle }>()
)
export const bandSelectedChange = createAction(
    '[File Upload Page] Band Selected Change',
    props<{ selectedBand: Band }>()
)