import { createAction, props } from '@ngrx/store'
import { MusicStyle } from '../../../../core/models/music-style'
import { Band } from '../../../../core/models/band'
import { Song } from '../../../../core/models/song'
import { PaginationData } from '../../../../core/models/pagination-data'
import { Phrase } from '../../../../core/models/phrase'
import { PhrasesFilter } from 'src/app/core/models/phrases-filter'

export const filterStyleTermChange = createAction(
  '[Patterns-Library-Page] Filter Style',
  props<{ styleTerm: string }>()
)
export const filterBandTermChange = createAction(
  '[Patterns-Library-Page] Filter Band',
  props<{ bandTerm: string }>()
)
export const filterSongTermChange = createAction(
  '[Patterns-Library-Page] Filter Song',
  props<{ songTerm: string }>()
)
export const filterPhraseChange = createAction(
  '[Patterns-Library-Page] Filter Phrase',
  props<{ phraseFilter: PhrasesFilter }>()
)
export const stylesPaginationChange = createAction(
  '[Patterns-Library-Page] Page Style',
  props<{ paginationData: PaginationData }>()
)
export const bandsPaginationChange = createAction(
  '[Patterns-Library-Page] Page Band',
  props<{ paginationData: PaginationData }>()
)
export const songsPaginationChange = createAction(
  '[Patterns-Library-Page] Page Song',
  props<{ paginationData: PaginationData }>()
)
export const patternsPaginationChange = createAction(
  '[Patterns-Library-Page] Page Pattern',
  props<{ paginationData: PaginationData }>()
)
export const styleSelectedChange = createAction(
  '[Patterns-Library-Page] Style Selected Change',
  props<{ selectedStyle: MusicStyle }>()
)
export const bandSelectedChange = createAction(
  '[Patterns-Library-Page] Band Selected Change',
  props<{ selectedBand: Band }>()
)
export const songSelectedChange = createAction(
  '[Patterns-Library-Page] Song Selected Change',
  props<{ selectedSong: Song }>()
)
export const phraseSelectedChange = createAction(
  '[Patterns-Library-Page] Phrase Selected Change',
  props<{ selectedPhrase: Phrase }>()
)
