import { createAction, props } from '@ngrx/store'
import { Voice } from 'src/app/core/models/voice'
import { PhraseOccurrencesPaginated } from 'src/app/core/services/songs-repository/responses-format/phrase-occurrences-paginated'
import { Phrase } from '../../../../core/models/phrase'
import { BandsPaginated } from '../../../../core/services/songs-repository/responses-format/bands-paginated'
import { MusicStylesPaginated } from '../../../../core/services/songs-repository/responses-format/music-styles-paginated'
import { PhrasesPaginated } from '../../../../core/services/songs-repository/responses-format/phrases-paginated'
import { SongsPaginated } from '../../../../core/services/songs-repository/responses-format/songs-paginated'


export const stylesPaginationChangeSuccess = createAction(
    '[PatternsLibrary API] Styles Page Change Success',
    props<{ musicStylesPaginated: MusicStylesPaginated }>()
)

export const stylesPaginationChangeFailure = createAction(
    '[PatternsLibrary API] Styles Page Change Fail',
    props<{ error: string }>()
)

export const bandsPaginationChangeSuccess = createAction(
    '[PatternsLibrary API] Bands Page Change Success',
    props<{ bandsPaginated: BandsPaginated }>()
)

export const bandsPaginationChangeFailure = createAction(
    '[PatternsLibrary API] Bands Page Change Fail',
    props<{ error: string }>()
)

export const songsPaginationChangeSuccess = createAction(
    '[PatternsLibrary API] Songs Page Change Success',
    props<{ songsPaginated: SongsPaginated }>()
)

export const songsPaginationChangeFailure = createAction(
    '[PatternsLibrary API] Songs Page Change Fail',
    props<{ error: string }>()
)

export const patternsPaginationChangeSuccess = createAction(
    '[PatternsLibrary API] Patterns Page Change Success',
    props<{ patternsPaginated: PhrasesPaginated }>()
)

export const patternsPaginationChangeFailure = createAction(
    '[PatternsLibrary API] Patterns Page Change Fail',
    props<{ error: string }>()
)
export const styleSelectedSuccess = createAction(
    '[PatternsLibrary API] Style Selected Success',
    props<{ bandsPaginated: BandsPaginated, songsPaginated: SongsPaginated}>()
)

export const styleSelectedFailure = createAction(
    '[PatternsLibrary API] Style Selected Fail',
    props<{ error: string }>()
)

export const bandSelectedSuccess = createAction(
    '[PatternsLibrary API] Band Selected Success',
    props<{ songsPaginated: SongsPaginated}>()
)

export const bandSelectedFailure = createAction(
    '[PatternsLibrary API] Band Selected Fail',
    props<{ error: string }>()
)

// export const songSelectedSuccess = createAction(
//     '[PatternsLibrary API] Song Selected Success',
//     props<{ patternsPaginated: PhrasesPaginated }>()
// )

export const songSelectedSuccess = createAction(
    '[PatternsLibrary API] Song Selected Success',
    props<{ voices: Voice[] }>()
)

export const songSelectedFailure = createAction(
    '[PatternsLibrary API] Song Selected Fail',
    props<{ error: string }>()
)

export const phraseSelectedSuccess = createAction(
    '[PatternsLibrary API] Phrase Selected Success',
    props<{ occurencesPaginated: PhraseOccurrencesPaginated }>()
)

export const phraseSelectedFailure = createAction(
    '[PatternsLibrary API] Phrase Selected Fail',
    props<{ error: string }>()
)

export const filterStyleTermChangeSuccess = createAction(
    '[PatternsLibrary API] Filter Styles Term Change Success',
    props<{ musicStylesPaginated: MusicStylesPaginated }>()
)

export const filterStyleTermChangeFailure = createAction(
    '[PatternsLibrary API] Filter Styles Term Change Fail',
    props<{ error: string }>()
)

export const filterBandTermChangeSuccess = createAction(
    '[PatternsLibrary API] Filter Bands Term Change Success',
    props<{ bandsPaginated: BandsPaginated }>()
)

export const filterBandTermChangeFailure = createAction(
    '[PatternsLibrary API] Filter Bands Term Change Fail',
    props<{ error: string }>()
)

export const filterSongTermChangeSuccess = createAction(
    '[PatternsLibrary API] Filter Songs Term Change Success',
    props<{ songsPaginated: SongsPaginated }>()
)

export const filterSongTermChangeFailure = createAction(
    '[PatternsLibrary API] Filter Songs Term Change Fail',
    props<{ error: string }>()
)

export const filterPatternTermChangeSuccess = createAction(
    '[PatternsLibrary API] Filter Patterns Term Change Success',
    props<{ patternsPaginated: PhrasesPaginated }>()
)

export const filterPatternTermChangeFailure = createAction(
    '[PatternsLibrary API] Filter Patterns Term Change Fail',
    props<{ error: string }>()
)

export const voiceChangeSuccess = createAction(
    '[PatternsLibrary API] Voice Change Success',
    props<{ patternsPaginated: PhrasesPaginated }>()
)

export const voiceChangeFailure = createAction(
    '[PatternsLibrary API] Voice Change Fail',
    props<{ error: string }>()
)