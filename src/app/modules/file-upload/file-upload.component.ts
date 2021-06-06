import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Band } from 'src/app/core/models/band';
import { MusicStyle } from 'src/app/core/models/music-style';
import { SongsRepositoryService } from '../../core/services/songs-repository/songs-repository.service'

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnChanges {
    @Input() styles: MusicStyle[]
    @Input() bands: Band[]
    @Input() stylesLoaded: boolean
    @Output() styleSelectedChanged = new EventEmitter<MusicStyle>()
    selectedStyle: MusicStyle
    selectedBand: Band
    songUploadForm: FormGroup
    songFile: any
    uploadProgress: string

    constructor(private storeService: SongsRepositoryService, fb: FormBuilder, private router: Router) {
        this.songUploadForm = fb.group({
            SongFileControl: [],
            StylesList: [],
            BandsList: [],
            songName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        for (const propName in changes) {
            if (propName == "stylesLoaded" && this.stylesLoaded == true) {
                this.selectedStyle = this.styles[0]
                this.styleSelectedChanged.emit(this.styles[0])
                console.log(this.songUploadForm.controls['StylesList'])
            }
        }
    }

    ngOnInit() {
    }


    setSongFile(event) {
        this.songFile = event.target.files[0]
    }


    submitFiles() {
        this.uploadProgress = ""
        let that = this
        this.storeService.postUploadFile(this.selectedStyle, this.selectedBand, this.songName.value, this.songFile).subscribe({
            error(err) {
                that.uploadProgress = `There was an error importing the data. ${err.error?.message}`
            },
            complete() {
                that.uploadProgress = "Finished importing data."
            },
        })
    }
    showHourGlassIcon() {
        return (this.uploadProgress != null && this.uploadProgress != "Finished importing data." && !this.uploadProgress.includes("There was an error"))
    }


    isStyleSelected(style: string) {
        return this.selectedStyle.name === style
    }
    isBandSelected(band: string) {
        return this.selectedBand.name === band
    }
    get songName() {
        return this.songUploadForm.get('songName')
    }

    getErrorSongName() {
        return this.songName.hasError('minlength') ? 'Minimum lenght is 4' :
            this.songName.hasError('maxlength') ? 'Maximum lenght is 200' : ''
    }
    selectStyle(style: MusicStyle) {
        this.selectedStyle = style
        this.styleSelectedChanged.emit(style)
    }
    selectBand(band: Band) {
        this.selectedBand = band
    }
}