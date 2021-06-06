import { createReducer, on } from '@ngrx/store'
import { FileUploadState } from './index'
import { cloneDeep } from 'lodash-es'
import { FileUploadApiActions, FileUploadPageActions } from './actions'


const initialState: FileUploadState = {
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
    stylesNewPage: null,
    bandsNewPage: null,
    styleTerm: '',
    bandTerm: '',
    styleSelected: null,
    bandSelected: null,
    errorStyles: '',
    errorBands: '',
}


export const fileUploadReducer = createReducer<FileUploadState>(
    initialState,

    on(FileUploadPageActions.stylesPaginationChange, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.stylesNewPage = action.paginationData.pageNo
        return newState
    }),
    on(FileUploadPageActions.bandsPaginationChange, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.bandsNewPage = action.paginationData.pageNo
        return newState
    }),

    on(FileUploadPageActions.filterStyleTermChange, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.styleTerm = action.styleTerm
        return newState
    }),

    on(FileUploadPageActions.filterBandTermChange, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.bandTerm = action.bandTerm
        return newState
    }),
    on(FileUploadPageActions.styleSelectedChange, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.styleSelected = action.selectedStyle
        return newState
    }),
    on(FileUploadPageActions.bandSelectedChange, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.bandSelected = action.selectedBand
        return newState
    }),

    on(
        FileUploadApiActions.stylesPaginationChangeSuccess,
        FileUploadApiActions.filterStyleTermChangeSuccess,
        (state, action): FileUploadState => {
            let newState = cloneDeep(state)
            newState.errorStyles = null
            newState.musicStylesPaginated = action.musicStylesPaginated
            return newState
        }),
    on(
        FileUploadApiActions.bandsPaginationChangeSuccess,
        FileUploadApiActions.filterBandTermChangeSuccess,
        (state, action): FileUploadState => {
            let newState = cloneDeep(state)
            newState.bandsPaginated = action.bandsPaginated
            newState.errorBands = null
            return newState
        }),

    on(
        FileUploadApiActions.stylesPaginationChangeFailure,
        FileUploadApiActions.filterStyleTermChangeFailure,
        (state, action): FileUploadState => {
            let newState = cloneDeep(state)
            newState.styleSelected = null
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
        FileUploadApiActions.bandsPaginationChangeFailure,
        FileUploadApiActions.filterBandTermChangeFailure,
        (state, action): FileUploadState => {
            let newState = cloneDeep(state)
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

    on(FileUploadApiActions.styleSelectedSuccess, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.bandsPaginated = action.bandsPaginated
        return newState
    }),
    on(FileUploadApiActions.styleSelectedFailure, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
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




)
