import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class FileUploadComponent implements OnInit {
    @Input() styles: MusicStyle[]
    @Input() bands: Band[] 
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

    ngOnInit() {
    }


    setSongFile(event) {
        this.songFile = event.target.files[0]
    }


    submitFiles() {
        let that = this
        this.storeService.postUploadFile(this.selectedStyle.id, this.selectedBand.id, this.songName.value,  this.songFile).subscribe({
            error(err) { that.uploadProgress = "There was an error importing the data" },
            complete() {
                that.uploadProgress = "Finished importing data."
            },
        })
    }
    showHourGlassIcon() {
        return (this.uploadProgress != null && this.uploadProgress != "Finished importing data.")
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
        this.selectedStyle=style
        this.styleSelectedChanged.emit(style)
    }
    selectBand(band: Band) {
        this.selectedBand=band
    }
}