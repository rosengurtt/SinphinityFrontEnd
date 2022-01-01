
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
    patternsPaginated: {
        pageNo: 0,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        items: []
    },
    stylesNewPage: null,
    bandsNewPage: null,
    songsNewPage: null,
    patternsNewPage: null,
    styleTerm: '',
    bandTerm: '',
    songTerm: '',
    patternTerm: '',
    styleSelected: null,
    bandSelected: null,
    songSelected: null,
    patternSelected: null,
    errorStyles: '',
    errorBands: '',
    errorSongs: '',
    errorPatterns: ''
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

    on(PatternsLibraryPageActions.filterPatternTermChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.patternTerm = action.patternTerm
        return newState
    }),

    on(PatternsLibraryPageActions.styleSelectedChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.styleSelected = action.selectedStyle
        return newState
    }),
    on(PatternsLibraryPageActions.bandSelectedChange, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.bandSelected = action.selectedBand
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
            newState.patternSelected = null
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
            newState.patternSelected = null
            newState.errorBands = null
            return newState
        }),
    on(
        PatternsLibraryApiActions.songsPaginationChangeSuccess,
        PatternsLibraryApiActions.filterSongTermChangeSuccess,
        (state, action): PatternsLibraryState => {
            let newState = cloneDeep(state)
            newState.songsPaginated = action.songsPaginated
            newState.patternSelected = null
            newState.errorSongs = null
            return newState
        }),
        on(
            PatternsLibraryApiActions.patternsPaginationChangeSuccess,
            PatternsLibraryApiActions.filterPatternTermChangeSuccess,
            (state, action): PatternsLibraryState => {
                let newState = cloneDeep(state)
                newState.patternsPaginated = action.patternsPaginated
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
            newState.patternSelected = null
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
            newState.patternSelected = null
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
            newState.patternSelected = null
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
                newState.patternSelected = null
                newState.patternsPaginated = {
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

    on(PatternsLibraryApiActions.songSelectedSuccess, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.songSelected = action.song
        return newState
    }),
    on(PatternsLibraryApiActions.songSelectedFailure, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.songSelected = null
        newState.errorSongs = action.error
        return newState
    }),

    on(PatternsLibraryApiActions.patternSelectedSuccess, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.patternSelected = action.pattern
        return newState
    }),
    on(PatternsLibraryApiActions.patternSelectedFailure, (state, action): PatternsLibraryState => {
        let newState = cloneDeep(state)
        newState.patternSelected = null
        newState.errorPatterns = action.error
        return newState
    }),
)
