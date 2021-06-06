import { createFeatureSelector, createSelector } from '@ngrx/store'
import { MusicStyle } from '../../../core/models/music-style'
import { Band } from '../../../core/models/band'
import { MusicStylesPaginated } from 'src/app/core/services/songs-repository/responses-format/music-styles-paginated';
import { BandsPaginated } from 'src/app/core/services/songs-repository/responses-format/bands-paginated';

export interface FileUploadState {
    musicStylesPaginated: MusicStylesPaginated
    bandsPaginated: BandsPaginated  
    styleTerm: string
    bandTerm: string
    stylesNewPage: number | null
    bandsNewPage: number | null
    styleSelected: MusicStyle
    bandSelected: Band
    errorStyles: string
    errorBands: string
}

export const fileUploadFeatureKey = 'file-upload'

const getfileUploadFeatureState = createFeatureSelector<FileUploadState>(fileUploadFeatureKey);

export const getfileUploadState = createSelector(
    getfileUploadFeatureState,
    state => state
)

export const getStyles = createSelector(
    getfileUploadFeatureState,
    state => state.musicStylesPaginated.items
)
export const getBands = createSelector(
    getfileUploadFeatureState,
    state => state.bandsPaginated.items
)

export const getStylesCurrentPage = createSelector(
    getfileUploadFeatureState,
    state => state.musicStylesPaginated.pageNo
)
export const getBandsCurrentPage = createSelector(
    getfileUploadFeatureState,
    state => state.bandsPaginated.pageNo
)

export const getStylesNewPage = createSelector(
    getfileUploadFeatureState,
    state => state.stylesNewPage
)
export const getBandsNewPage = createSelector(
    getfileUploadFeatureState,
    state => state.bandsNewPage
)

export const getTotalStyles = createSelector(
    getfileUploadFeatureState,
    state => state.musicStylesPaginated.totalItems
)
export const getTotalBands = createSelector(
    getfileUploadFeatureState,
    state => state.bandsPaginated.totalItems
)
export const getStyleSelected = createSelector(
    getfileUploadFeatureState,
    state => state.styleSelected
)
export const getBandSelected= createSelector(
    getfileUploadFeatureState,
    state => state.bandSelected
)
export const getErrorStyles = createSelector(
    getfileUploadFeatureState,
    state => state.errorStyles
)
export const getErrorBands = createSelector(
    getfileUploadFeatureState,
    state => state.errorBands
)