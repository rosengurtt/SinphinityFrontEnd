import { Component, OnInit } from '@angular/core'
import { MusicStyle } from '../../core/models/music-style'
import { Observable } from 'rxjs'
import { Band } from '../../core/models/band'
import { FileUploadState, getBands, getStyles, getStylesLoaded } from './state'
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
    stylesLoaded$: Observable<boolean>

    constructor(private fileUploadStore: Store<FileUploadState>) { }


    ngOnInit(): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.loadStyles())
        this.styles$ = this.fileUploadStore.select(getStyles)
        this.bands$ = this.fileUploadStore.select(getBands)
        this.stylesLoaded$ = this.fileUploadStore.select(getStylesLoaded)
    }

    styleSelectedChange(style: MusicStyle): void {
        this.fileUploadStore.dispatch(FileUploadPageActions.styleSelectedChange({ selectedStyle: style }))
    }
}

function getSelectedStyle(getSelectedStyle: any): any {
    throw new Error('Function not implemented.')
}

