import { createAction, props } from '@ngrx/store'
import { MusicStyle } from '../../../../core/models/music-style'


export const styleSelectedChange = createAction(
    '[File-Upload Page] Style Selected Change',
    props<{ selectedStyle: MusicStyle }>()
)

export const loadStyles = createAction(
    '[File-Upload Page] Load Styles'
)

export const loadBands = createAction(
    '[File-Upload Page] Load Bands'
)

