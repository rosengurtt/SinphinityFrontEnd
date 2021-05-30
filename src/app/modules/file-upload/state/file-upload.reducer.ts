import { createReducer, on } from '@ngrx/store'
import { FileUploadState } from './index'
import { cloneDeep } from 'lodash-es'
import { FileUploadApiActions, FileUploadPageActions } from './actions'


const initialState: FileUploadState = {
    styles: [],
    bands: [],
    error: ''
}


export const fileUploadReducer = createReducer<FileUploadState>(
    initialState,


    on(FileUploadApiActions.loadStylesSuccess, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.styles = action.styles
        return newState
    }),
    on(FileUploadApiActions.loadStylesFailure, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.styles = []
        newState.bands = []
        newState.error = action.error
        return newState
    }),
    on(FileUploadApiActions.loadBandsSuccess, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.bands = action.bands
        return newState
    }),
    on(FileUploadApiActions.loadBandsFailure, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.bands = []
        newState.error = action.error
        return newState
    }),



    on(FileUploadApiActions.styleSelectedSuccess, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.bands = action.bands
        return newState
    }),
    on(FileUploadApiActions.styleSelectedFailure, (state, action): FileUploadState => {
        let newState = cloneDeep(state)
        newState.bands = []
        newState.error = action.error
        return newState
    }),

)
