import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Band } from 'src/app/core/models/band';
import { MusicStyle } from 'src/app/core/models/music-style';
import { PaginationData } from 'src/app/core/models/pagination-data';
import { SongsRepositoryService } from '../../core/services/songs-repository/songs-repository.service'

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
    @Input() stylesDataSource: MatTableDataSource<MusicStyle>
    @Input() bandsDataSource: MatTableDataSource<Band>
    @Input() styleSelected: MusicStyle
    @Input() bandSelected: Band
    @Input() stylesPageNo: number
    @Input() bandsPageNo: number
    @Input() stylesPageSize: number
    @Input() bandsPageSize: number
    @Input() totalStyles: number | null
    @Input() totalBands: number | null
    @Output() styleSelectedChanged = new EventEmitter<MusicStyle>()
    @Output() bandSelectedChanged = new EventEmitter<Band>()
    @Output() stylesPageChanged = new EventEmitter<PaginationData>()
    @Output() bandsPageChanged = new EventEmitter<PaginationData>()
    @Output() stylesTermChanged = new EventEmitter<string>()
    @Output() bandsTermChanged = new EventEmitter<string>()
    @Output() songsTermChanged = new EventEmitter<string>()
    subscriptionSearchTerms: Subscription[] = []
    styleTerm = new FormControl()
    bandTerm = new FormControl()
    songUploadForm: FormGroup
    songFile: any
    uploadProgress: string
    displayedColumns: string[] = ['name']

    constructor(private storeService: SongsRepositoryService, fb: FormBuilder, private router: Router) {
        this.songUploadForm = fb.group({
            SongFileControl: [],
            StylesList: ['', [Validators.required]],
            BandsList: ['', [Validators.required]],
            songName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
        });
    }

    ngOnInit() {
        this.subscriptionSearchTerms.push(this.styleTerm.valueChanges.subscribe(value => this.stylesTermChanged.emit(value)))
        this.subscriptionSearchTerms.push(this.bandTerm.valueChanges.subscribe(value => this.bandsTermChanged.emit(value)))
    }

    public getStylesPage(event?: PageEvent) {
        if (event) this.stylesPageChanged.emit({ pageNo: event.pageIndex, pageSize: event.pageSize })
        return event
    }

    public getBandsPage(event?: PageEvent) {
        if (event) this.bandsPageChanged.emit({ pageNo: event.pageIndex, pageSize: event.pageSize })
        return event
    }

    selectStyle(style: MusicStyle) {
        this.songUploadForm.controls['StylesList'].setValue(style)
        this.styleSelectedChanged.emit(style)
    }
    selectBand(band: Band) {
        this.songUploadForm.controls['BandsList'].setValue(band)
        this.bandSelectedChanged.emit(band)
    }
    newStyleTerm(newTerm: string) {
        this.stylesTermChanged.emit(newTerm)
    }
    newBandTerm(newTerm: string) {
        this.bandsTermChanged.emit(newTerm)
    }

    setSongFile(event) {
        this.songFile = event.target.files[0]
    }


    submitFiles() {
        this.uploadProgress = ""
        let that = this
        this.storeService.postUploadFile(this.styleSelected, this.bandSelected, this.songName.value, this.songFile).subscribe({
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


 
    get songName() {
        return this.songUploadForm.get('songName')
    }

    getErrorSongName() {
        return this.songName.hasError('minlength') ? 'Minimum lenght is 4' :
            this.songName.hasError('maxlength') ? 'Maximum lenght is 200' : ''
    }

}