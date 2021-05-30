import { Component, OnInit } from '@angular/core'
import { MusicStyle } from '../../core/models/music-style'
import { Observable } from 'rxjs'
import { Band } from '../../core/models/band'
import { FileUploadState, getBands, getStyles } from './state'
import { Store } from '@ngrx/store'
import { FileUploadPageActions } from './state/actions'

@Component({
    templateUrl: './file-upload-shell.component.html'
})
export class FileUploadShellComponent implements OnInit {
    styles$: Observable<MusicStyle[]>
    bands$: Observable<Band[]>
    errorMessage$: Observable<string>;
    saveResult$: Observable<string>

    constructor(private fileUploadStore: Store<FileUploadState>) { }


    ngOnInit(): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.loadStyles())
        this.fileUploadStore.dispatch(FileUploadPageActions.loadBands())
        this.styles$ = this.fileUploadStore.select(getStyles)
        this.bands$ = this.fileUploadStore.select(getBands)
    }

    styleSelectedChange(style: MusicStyle): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.styleSelectedChange({ selectedStyle: style }))
    }
}

