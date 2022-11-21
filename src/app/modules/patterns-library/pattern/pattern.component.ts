import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core'
import { Song } from '../../../core/models/song'
import { DrawingMusicalNotationTrackService } from '../../../core/services/songs-display/drawing-musical-notation-track.service'
import { DrawingMusicalNotationGlobalService } from '../../../core/services/songs-display/drawing-musical-notation-global.service'


@Component({
    selector: 'dc-pattern',
    templateUrl: './pattern.component.html',
    styleUrls: ['./pattern.component.scss'],
    providers: [
        DrawingMusicalNotationTrackService
    ]
})
export class PatternComponent implements AfterViewInit, OnChanges {

    @Input() phraseId: number
    @Input() song: Song
    @Input() svgBoxWidth: number
    @Input() svgBoxHeight: number

    svgBoxId: string
    viewBox: string = '0 0 800 300'
    svgBox: any
    isDragActive = false
    lastXrecorded: number | null
    lastYrecorded: number | null
    totalVoices: number
    totalWidthOfRythmDrawing: number
    mustRedrawSvgBox: boolean = false
    averageYofNotes: number = 0

    constructor(private drawingMusicalNotationTrackService: DrawingMusicalNotationTrackService,
        private drawingMusicalNotationGlobalService: DrawingMusicalNotationGlobalService) {

    }
    ngOnChanges(changes: SimpleChanges): void {
        for (const propName in changes) {
            if (propName == "song") {
                this.refreshDrawing()
            }
        }
    }
    ngAfterViewInit(): void {
        this.initializePage()
    }


    initializePage() {
        this.refreshDrawing()
    }
    refreshDrawing() {
        // the variable eventsToDraw is needed by all tracks and is expensive to compute, so we use a singleton service to
        // calculate it
        let eventsToDraw = this.drawingMusicalNotationGlobalService.getEventsToDrawForSong(this.song, 0);
        // if the svg box hasn't been created by the browser yet, we save that fact in the variable mustRedrawSvgBox
        // and the next times onChanges run, if the value is still set and the svg box has become available, it will draw
        //[this.totalWidthOfRythmDrawing, this.averageYofNotes] =
        this.drawingMusicalNotationTrackService.drawMusicNotationGraphic(0, "phraseSVGbox", this.song, 0, eventsToDraw)
    }





}


