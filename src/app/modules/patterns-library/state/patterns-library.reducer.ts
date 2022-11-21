
import { createReducer, on } from '@ngrx/store'
import { PatternsLibraryApiActions, PatternsLibraryPageActions } from './actions'
import { PatternsLibraryState } from './index'
import { cloneDeep } from 'lodash-es'


const initialState: PatternsLibraryState = {
    musicStylesPaginated: {
        pageNo: 0,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        items: []
    },
    bandsPaginated: {
        pageNo: 0,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        items: []
    },
    songsPaginated: {
        pageNo: 0,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        items: []
    },
    phrasesPaginated: {
        pageNo: 0,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        items: []
    },
    voices: [],
    stylesNewPage: null,
    bandsNewPage: null,
    songsNewPage: null,
    patternsNewPage: null,
    occurrencesOfPhraseNewPage: null,
    styleTerm: '',
    bandTerm: '',
    songTerm: '',
    phrasesFilter: {},
    styleSelected: null,
    bandSelected: null,
    songSelected: null,
    phraseSelected: null,
    occurrenceSelected: null,
    voiceSelected: null,
    occurrencesOfPhrasePaginated: {
        pageNo: 0,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        items: []
    },
    errorStyles: '',
    errorBands: '',
    errorSongs: '',
    errorPatterns: '',
    errorOccurrences: ''
}


export const patternsLibraryReducer = createReducer<PatternsLibraryState>(
    initialState,
    on(PatternsLibraryPageActions.stylesPaginationChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.stylesNewPage = action.paginationData.pageNo
        return newState
    }),
    on(PatternsLibraryPageActions.bandsPaginationChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.bandsNewPage = action.paginationData.pageNo
        return newState
    }),
    on(PatternsLibraryPageActions.songsPaginationChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.songsNewPage = action.paginationData.pageNo
        return newState
    }),
    on(PatternsLibraryPageActions.patternsPaginationChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.patternsNewPage = action.paginationData.pageNo
        return newState
    }),

    on(PatternsLibraryPageActions.filterStyleTermChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.styleTerm = action.styleTerm
        return newState
    }),

    on(PatternsLibraryPageActions.filterBandTermChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.bandTerm = action.bandTerm
        return newState
    }),

    on(PatternsLibraryPageActions.filterSongTermChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.songTerm = action.songTerm
        return newState
    }),

    on(PatternsLibraryPageActions.filterPhraseChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        if (action.phraseFilter.contains != null)
            newState.phrasesFilter.contains = action.phraseFilter.contains
        if (action.phraseFilter.durationInTicks != null)
            newState.phrasesFilter.durationInTicks = action.phraseFilter.durationInTicks
        if (action.phraseFilter.isMonotone != null)
            newState.phrasesFilter.isMonotone = action.phraseFilter.isMonotone
        if (action.phraseFilter.numberOfNotes != null)
            newState.phrasesFilter.numberOfNotes = action.phraseFilter.numberOfNotes
        if (action.phraseFilter.range != null)
            newState.phrasesFilter.range = action.phraseFilter.range
        if (action.phraseFilter.step != null)
            newState.phrasesFilter.step = action.phraseFilter.step

        return newState
    }),

    on(PatternsLibraryPageActions.styleSelectedChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.styleSelected = action.selectedStyle
        newState.bandSelected = null
        newState.bandsPaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        newState.songSelected = null
        newState.songsPaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        newState.phraseSelected = null
        newState.phrasesPaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        newState.occurrenceSelected = null
        newState.occurrencesOfPhrasePaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        return newState
    }),
    on(PatternsLibraryPageActions.bandSelectedChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.bandSelected = action.selectedBand
        newState.songSelected = null
        newState.songsPaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        newState.phraseSelected = null
        newState.phrasesPaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        newState.occurrenceSelected = null
        newState.occurrencesOfPhrasePaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        return newState
    }),

    on(PatternsLibraryPageActions.songSelectedChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.songSelected = action.selectedSong
        newState.occurrenceSelected = null
        newState.occurrencesOfPhrasePaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        return newState
    }),
    on(PatternsLibraryPageActions.phraseSelectedChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.phraseSelected = action.selectedPhrase
        newState.occurrenceSelected = null
        newState.occurrencesOfPhrasePaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        return newState
    }),

    on(PatternsLibraryPageActions.occurrenceSelectedChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.occurrenceSelected = action.selectedOccurrence
        return newState
    }),

    on(PatternsLibraryPageActions.voiceSelectedChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.voiceSelected = action.voice
        return newState
    }),
    on(
        PatternsLibraryApiActions.stylesPaginationChangeSuccess,
        PatternsLibraryApiActions.filterStyleTermChangeSuccess,
        (state, action): PatternsLibraryState => {
            let newState = cloneDeep(state)
            newState.errorStyles = null
            newState.musicStylesPaginated = action.musicStylesPaginated
            newState.bandSelected = null
            newState.songSelected = null
            newState.phraseSelected = null
            newState.phrasesPaginated = {
                pageNo: 0,
                pageSize: 10,
                totalItems: 0,
                totalPages: 0,
                items: []
            }
            return newState
        }),

    on(
        PatternsLibraryApiActions.bandsPaginationChangeSuccess,
        PatternsLibraryApiActions.filterBandTermChangeSuccess,
        (state, action): PatternsLibraryState => {
            let newState = cloneDeep(state)
            newState.bandsPaginated = action.bandsPaginated
            newState.bandSelected = null
            newState.songSelected = null
            newState.phraseSelected = null
            newState.errorBands = null
            return newState
        }),
    on(
        PatternsLibraryApiActions.songsPaginationChangeSuccess,
        PatternsLibraryApiActions.filterSongTermChangeSuccess,
        (state, action): PatternsLibraryState => {
            let newState = cloneDeep(state)
            newState.songsPaginated = action.songsPaginated
            newState.phraseSelected = null
            newState.errorSongs = null
            return newState
        }),
    on(
        PatternsLibraryApiActions.patternsPaginationChangeSuccess,
        PatternsLibraryApiActions.filterPatternTermChangeSuccess,
        (state, action): PatternsLibraryState => {
            let newState = cloneDeep(state)
            newState.phrasesPaginated = action.patternsPaginated
            newState.errorPatterns = null
            return newState
        }),

    on(
        PatternsLibraryApiActions.stylesPaginationChangeFailure,
        PatternsLibraryApiActions.filterStyleTermChangeFailure,
        (state, action): PatternsLibraryState => {
            let newState = cloneDeep(state)
            newState.styleSelected = null
            newState.bandSelected = null
            newState.songSelected = null
            newState.phraseSelected = null
            newState.musicStylesPaginated = {
                pageNo: 0,
                pageSize: 10,
                totalItems: 0,
                totalPages: 0,
                items: []
            }
            newState.errorStyles = action.error
            return newState
        }),
    on(
        PatternsLibraryApiActions.bandsPaginationChangeFailure,
        PatternsLibraryApiActions.filterBandTermChangeFailure,
        (state, action): PatternsLibraryState => {
            let newState = cloneDeep(state)
            newState.bandSelected = null
            newState.songSelected = null
            newState.phraseSelected = null
            newState.bandsPaginated = {
                pageNo: 0,
                pageSize: 10,
                totalItems: 0,
                totalPages: 0,
                items: []
            }
            newState.errorBands = action.error
            return newState
        }),
    on(
        PatternsLibraryApiActions.songsPaginationChangeFailure,
        PatternsLibraryApiActions.filterSongTermChangeFailure,
        (state, action): PatternsLibraryState => {
            let newState = cloneDeep(state)
            newState.songSelected = null
            newState.phraseSelected = null
            newState.songsPaginated = {
                pageNo: 0,
                pageSize: 10,
                totalItems: 0,
                totalPages: 0,
                items: []
            }
            newState.errorSongs = action.error
            return newState
        }),
    on(
        PatternsLibraryApiActions.patternsPaginationChangeFailure,
        PatternsLibraryApiActions.filterPatternTermChangeFailure,
        (state, action): PatternsLibraryState => {
            let newState = cloneDeep(state)
            newState.phraseSelected = null
            newState.phrasesPaginated = {
                pageNo: 0,
                pageSize: 10,
                totalItems: 0,
                totalPages: 0,
                items: []
            }
            newState.errorPatterns = action.error
            return newState
        }),



    on(PatternsLibraryApiActions.styleSelectedSuccess, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.bandsPaginated = action.bandsPaginated
        newState.songsPaginated = action.songsPaginated
        newState.bandSelected = null
        newState.songSelected = null
        return newState
    }),
    on(PatternsLibraryApiActions.styleSelectedFailure, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.bandSelected = null
        newState.songSelected = null
        newState.songsPaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        newState.bandsPaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        newState.errorBands = action.error
        return newState
    }),

    on(PatternsLibraryApiActions.bandSelectedSuccess, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.songsPaginated = action.songsPaginated
        newState.songSelected = null
        return newState
    }),
    on(PatternsLibraryApiActions.bandSelectedFailure, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.songSelected = null
        newState.songsPaginated = {
            pageNo: 0,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
            items: []
        }
        newState.errorSongs = action.error
        return newState
    }),

    // on(PatternsLibraryApiActions.songSelectedSuccess, (state, action): PatternsLibraryState => {
    //     let newState = cloneDeep(state)
    //     newState.phrasesPaginated = action.patternsPaginated
    //     return newState
    // }),

    on(PatternsLibraryApiActions.songSelectedSuccess, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.voices = action.voices
        return newState
    }),

    on(PatternsLibraryApiActions.songSelectedFailure, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.songSelected = null
        newState.errorSongs = action.error
        return newState
    }),

    on(PatternsLibraryApiActions.phraseSelectedSuccess, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.occurrencesOfPhrasePaginated = action.occurencesPaginated
        return newState
    }),
    on(PatternsLibraryApiActions.phraseSelectedFailure, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.phraseSelected = null
        newState.errorPatterns = action.error
        return newState
    }),
    

    on(PatternsLibraryApiActions.voiceChangeSuccess, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.phrasesPaginated = action.patternsPaginated
        newState.errorPatterns = null
        return newState
    }),
    on(PatternsLibraryApiActions.voiceChangeFailure, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.phraseSelected = null
        newState.errorPatterns = action.error
        return newState
    })
)
