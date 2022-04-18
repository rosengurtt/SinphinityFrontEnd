
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Song } from 'src/app/core/models/song'
import { SongUnderAnalysis } from 'src/app/core/models/song-under-analysis'
import { StringifiedMap } from 'src/app/core/utilities/stringified-map'
import { PlayingSong } from 'src/app/core/models/playing-song'
import { SongViewType } from 'src/app/core/models/enums/SongViewTypes.enum'

// State for this feature (Product)
export interface SongPanelState {
    songsUnderAnalysis: SongUnderAnalysis[]
    playingSong: PlayingSong
    error: string
}


export const songsPanelFeatureKey = 'songs-panel'

const getSongPanelFeatureState = createFeatureSelector<SongPanelState>(songsPanelFeatureKey);

export const getSongsUnderAnalysis = createSelector(
    getSongPanelFeatureState,
    state => state.songsUnderAnalysis.map(s => s.song)
)

export const getSongUnderAnalysisById = createSelector(
    getSongPanelFeatureState,
    (state, props) => {
        if (props) {
            const songita = state.songsUnderAnalysis.filter(s => s.song?.id == props.id)
             return songita[0]?.song
        }
        return null
    }
)

export const getDisplacementBySongId = createSelector(
    getSongPanelFeatureState,
    (state, props) => {
        const songita = state.songsUnderAnalysis.filter(s => s.song?.id == props.songId)
        return songita[0]?.displacement
    }
)
export const getScaleBySongId = createSelector(
    getSongPanelFeatureState,
    (state, props) => {
        const songita = state.songsUnderAnalysis.filter(s => s.song?.id == props.songId)
        return songita[0]?.scale
    }
)

export const getPlayingSong = createSelector(
    getSongPanelFeatureState,
    state => state.playingSong
)

export const getMutedTracks = createSelector(
    getSongPanelFeatureState,
    (state, props) => {
        const songita = state.songsUnderAnalysis.filter(s => s.song?.id == props.songId)
        return songita[0]?.tracksMuted
    }
)

export const getSongViewType = createSelector(
    getSongPanelFeatureState,
    (state, props) => {
        const songita = state.songsUnderAnalysis.filter(s => s.song?.id == props.songId)
        return songita[0]?.viewType
    }
)

export const getSongSimplificationSelected = createSelector(
    getSongPanelFeatureState,
    (state, props) => {
        const songita = state.songsUnderAnalysis.filter(s => s.song?.id == props.songId)
        return songita[0]?.simplificationVersionSelected
    }
)

export const getSongSliderPositionForSongId = createSelector(
    getSongPanelFeatureState,
    (state, props) => {
        const songita = state.songsUnderAnalysis.filter(s => s.song?.id == props.songId)
        return songita[0]?.songSliderPosition
    }
)