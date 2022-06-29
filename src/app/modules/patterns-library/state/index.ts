import { createFeatureSelector, createSelector } from '@ngrx/store'
import { MusicStyle } from '../../../core/models/music-style'
import { Band } from '../../../core/models/band'
import { Song } from '../../../core/models/song'
import { MusicStylesPaginated } from '../../../core/services/songs-repository/responses-format/music-styles-paginated'
import { BandsPaginated } from '../../../core/services/songs-repository/responses-format/bands-paginated'
import { SongsPaginated } from '../../../core/services/songs-repository/responses-format/songs-paginated'
import { PhrasesPaginated } from '../../../core/services/songs-repository/responses-format/phrases-paginated'
import { Phrase } from '../../../core/models/phrase'
import { PhrasesFilter } from '../../../core/models/phrases-filter'
import { PhraseTypeEnum } from '../../../core/models/enums/phrase-type.enum'
import { PhraseOccurrence } from 'src/app/core/models/phrase-occurrence'
import { PhraseOccurrencesPaginated } from 'src/app/core/services/songs-repository/responses-format/phrase-occurrences-paginated'

export interface PatternsLibraryState {
    musicStylesPaginated: MusicStylesPaginated
    bandsPaginated: BandsPaginated
    songsPaginated: SongsPaginated   
    phrasesPaginated: PhrasesPaginated  
    occurrencesOfPhrasePaginated: PhraseOccurrencesPaginated
    styleTerm: string
    bandTerm: string
    songTerm: string
    phrasesFilter: PhrasesFilter
    stylesNewPage: number | null
    bandsNewPage: number | null
    songsNewPage: number | null
    patternsNewPage: number | null
    occurrencesOfPhraseNewPage: number | null
    styleSelected: MusicStyle
    bandSelected: Band
    songSelected: Song  
    phraseSelected: Phrase 
    occurrenceSelected: PhraseOccurrence
    errorStyles: string
    errorBands: string
    errorSongs: string
    errorPatterns: string
    errorOccurrences: string
}

export const patternsLibraryFeatureKey = 'patterns-library'

const getPatternsLibraryFeatureState = createFeatureSelector<PatternsLibraryState>(patternsLibraryFeatureKey);


export const getSongsLibraryState = createSelector(
    getPatternsLibraryFeatureState,
    state => state
)

export const getStyles = createSelector(
    getPatternsLibraryFeatureState,
    state => state.musicStylesPaginated.items
)
export const getBands = createSelector(
    getPatternsLibraryFeatureState,
    state => state.bandsPaginated.items
)
export const getSongs = createSelector(
    getPatternsLibraryFeatureState,
    state => state.songsPaginated.items
)
export const getPatterns = createSelector(
    getPatternsLibraryFeatureState,
    state => state.phrasesPaginated.items
)
export const getOccurrencesOfPhrase = createSelector(
    getPatternsLibraryFeatureState,
    state => state.occurrencesOfPhrasePaginated.items
)

export const getStylesCurrentPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.musicStylesPaginated.pageNo
)
export const getBandsCurrentPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.bandsPaginated.pageNo
)
export const getSongsCurrentPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.songsPaginated.pageNo
)
export const getPatternsCurrentPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.phrasesPaginated.pageNo
)
export const getOccurrencesOfPhraseCurrentPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.occurrencesOfPhrasePaginated.pageNo
)

export const getStylesNewPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.stylesNewPage
)
export const getBandsNewPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.bandsNewPage
)
export const getSongsNewPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.songsNewPage
)
export const getPatternsNewPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.patternsNewPage
)
export const getOccurrencesOfPhraseNewPage = createSelector(
    getPatternsLibraryFeatureState,
    state => state.occurrencesOfPhraseNewPage
)

export const getTotalStyles = createSelector(
    getPatternsLibraryFeatureState,
    state => state.musicStylesPaginated.totalItems
)
export const getTotalBands = createSelector(
    getPatternsLibraryFeatureState,
    state => state.bandsPaginated.totalItems
)
export const getTotalSongs = createSelector(
    getPatternsLibraryFeatureState,
    state => state.songsPaginated.totalItems
)
export const getTotalPatterns = createSelector(
    getPatternsLibraryFeatureState,
    state => state.phrasesPaginated.totalItems
)
export const getTotaOccurrencesOfPhrase = createSelector(
    getPatternsLibraryFeatureState,
    state => state.occurrencesOfPhrasePaginated.totalItems
)

export const getStyleSelected = createSelector(
    getPatternsLibraryFeatureState,
    state => state.styleSelected
)
export const getBandSelected= createSelector(
    getPatternsLibraryFeatureState,
    state => state.bandSelected
)
export const getSongSelected = createSelector(
    getPatternsLibraryFeatureState,
    state => state.songSelected
)
export const getPhraseSelected = createSelector(
    getPatternsLibraryFeatureState,
    state => state.phraseSelected
)

export const getOccurrenceSelected = createSelector(
    getPatternsLibraryFeatureState,
    state => state.occurrenceSelected
)
export const getErrorStyles = createSelector(
    getPatternsLibraryFeatureState,
    state => state.errorStyles
)
export const getErrorBands = createSelector(
    getPatternsLibraryFeatureState,
    state => state.errorBands
)

export const getErrorSongs = createSelector(
    getPatternsLibraryFeatureState,
    state => state.errorSongs
)
export const getErrorPatterns = createSelector(
    getPatternsLibraryFeatureState,
    state => state.errorPatterns
)
export const getErrorOccurrences = createSelector(
    getPatternsLibraryFeatureState,
    state => state.errorOccurrences
)

export const getPatternsFilter = createSelector(
    getPatternsLibraryFeatureState,
    state => state.phrasesFilter
)

