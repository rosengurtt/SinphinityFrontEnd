import { createFeatureSelector, createSelector } from '@ngrx/store'
import { MusicStyle } from '../../../core/models/music-style'
import { Band } from '../../../core/models/band'

export interface FileUploadState {
    styles: MusicStyle[]
    bands: Band[]
    error: string
}

export const fileUploadFeatureKey = 'file-upload'

const getfileUploadFeatureState = createFeatureSelector<FileUploadState>(fileUploadFeatureKey);

export const getfileUploadState = createSelector(
    getfileUploadFeatureState,
    state => state
)
export const getStyles = createSelector(
    getfileUploadFeatureState,
    state => state.styles
)
export const getBands = createSelector(
    getfileUploadFeatureState,
    state => state.bands
)


export const getError = createSelector(
    getfileUploadFeatureState,
    state => state.error
)