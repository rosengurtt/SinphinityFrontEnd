import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Song } from '../../core/models/song'
import { Store } from '@ngrx/store'
import { State } from '../../core/state/app.state'
import { getDisplacementBySongId, getMutedTracks, getPlayingSong, getScaleBySongId, getSongSimplificationSelected, getSongSliderPositionForSongId, getSongUnderAnalysisById, getSongViewType } from './state'
import { Observable, Subscription, timer } from 'rxjs'
import { SongPanelPageActions } from './state/actions'
import { Coordenadas } from 'src/app/core/models/coordenadas'
import { PlayingSong } from 'src/app/core/models/playing-song'
import { SongViewType } from 'src/app/core/models/enums/SongViewTypes.enum'

@Component({
    templateUrl: './song-panel-shell.component.html'
})
export class SongPanelShellComponent implements OnInit {
    songId: number
    song$: Observable<Song>
    displacement$: Observable<Coordenadas>
    scale$: Observable<number>
    songTimer$: Observable<number>
    playingSong$: Observable<PlayingSong>
    timerSubscription: Subscription
    mutedTracks$: Observable<number[]>
    viewType$: Observable<SongViewType>
    songSimplificationVersion$: Observable<number>
    songSliderPosition$: Observable<number>

    constructor(
        private mainStore: Store<State>,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            this.songId = +params.get('songId');

            this.song$ = this.mainStore.select(getSongUnderAnalysisById, { id: this.songId })
            this.displacement$ = this.mainStore.select(getDisplacementBySongId, { songId: this.songId })
            this.scale$ = this.mainStore.select(getScaleBySongId, { songId: this.songId })
            this.playingSong$ = this.mainStore.select(getPlayingSong)
            this.mutedTracks$ = this.mainStore.select(getMutedTracks, { songId: this.songId })
            this.viewType$ = this.mainStore.select(getSongViewType, { songId: this.songId })
            this.songSimplificationVersion$ = this.mainStore.select(getSongSimplificationSelected, { songId: this.songId })
            this.songSliderPosition$ = this.mainStore.select(getSongSliderPositionForSongId, { songId: this.songId })
        })
    }
    displacementChanged(value: Coordenadas): void {
        this.mainStore.dispatch(SongPanelPageActions.displacementChange({ songId: this.songId, displacement: value }))
    }

    scaleChanged(value: number): void {
        this.mainStore.dispatch(SongPanelPageActions.scaleChange({ songId: this.songId, scale: value }))
    }

    songStartedPlaying(songStarted: PlayingSong) {
        this.mainStore.dispatch(SongPanelPageActions.startPlayingSong({ playingSong: songStarted }))
        this.songTimer$ = timer(0, 500)
        this.timerSubscription = this.songTimer$.subscribe(x => { this.mainStore.dispatch(SongPanelPageActions.elapsedSecondPlayingSong()) })
    }
    songStoppedPlaying() {
        this.mainStore.dispatch(SongPanelPageActions.stopPlayingSong())
        this.timerSubscription?.unsubscribe()
    }
    songPaused() {
        this.mainStore.dispatch(SongPanelPageActions.pausePlayingSong())
        this.timerSubscription?.unsubscribe()
    }
    songResumed() {
        this.mainStore.dispatch(SongPanelPageActions.resumePlayingSong())
        this.timerSubscription = this.songTimer$.subscribe(x => { this.mainStore.dispatch(SongPanelPageActions.elapsedSecondPlayingSong()) })
    }
    muteStatusChanged(trackMuteStatus) {
        this.mainStore.dispatch(SongPanelPageActions.trackMutedStatusChange(trackMuteStatus))
    }
    unmuteAllTracks() {
        this.mainStore.dispatch(SongPanelPageActions.unmuteAllTracks({ songId: this.songId }))
    }
    closePage(song: Song) {
        this.mainStore.dispatch(SongPanelPageActions.removeSong({ song: song }))
    }
    songViewTypeChanged(viewType: SongViewType) {
        this.mainStore.dispatch(SongPanelPageActions.changeViewType({ songId: this.songId, viewType: viewType }))
    }
    songSimplificationChanged(songSimplificationVersion: number) {
        this.mainStore.dispatch(SongPanelPageActions.selectSongSimplification({ songId: this.songId, songSimplificationVersion: songSimplificationVersion }))
    }
    songSliderPositionChanged(songSliderPosition: number) {
        this.mainStore.dispatch(SongPanelPageActions.songSliderPositionChange({ songId: this.songId, songSliderPosition: songSliderPosition }))
    }
}