import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GetStylesResponse } from './responses-format/get-styles-response';
import { GetBandsResponse } from './responses-format/get-bands-response';
import { GetSongsResponse } from './responses-format/get-songs-response';
import { GetPatternsResponse } from './responses-format/get-patterns-response';
import { GetSongResponse } from './responses-format/get-song-response';
import { PaginationData } from '../../models/pagination-data';
import { MusicStyle } from '../../models/music-style';
import { Band } from '../../models/band';
import { PatternsFilter } from '../../models/patterns-filter';

@Injectable({
    providedIn: 'root'
})



export class SongsRepositoryService {
    get songLibraryUrl(): string {
        return environment.GetEnvironment().SinphinityBackend
    }


    constructor(private http: HttpClient) {
    }

    public postUploadFile(style: MusicStyle, band: Band, songName: string, file1: any) {
        const formData: FormData = new FormData();
        formData.append("Midi", file1, "Midi")
        formData.append("styleId", style.id)
        formData.append("styleName", style.name)
        formData.append("bandId", band.id)
        formData.append("bandName", band.name)
        formData.append("songName", songName)
        return this.http.post(this.songLibraryUrl + 'songs', formData)
    }

    getStyles(paginationData: PaginationData, contains: string): Observable<GetStylesResponse> {
        let url = this.songLibraryUrl + 'styles'
        url = this.addParameterToUrl(url, 'contains', contains)
        url = this.addPaginationParameters(url, paginationData)
        return this.http.get<GetStylesResponse>(url)
    }

    getBands(styleId: string, paginationData: PaginationData, contains: string): Observable<GetBandsResponse> {
        let url = this.songLibraryUrl + 'bands'
        url = this.addParameterToUrl(url, 'contains', contains)
        url = this.addParameterToUrl(url, 'styleId', styleId)
        url = this.addPaginationParameters(url, paginationData)
        return this.http.get<GetBandsResponse>(url)
    }

    getSongs(styleId: string, bandId: string, paginationData: PaginationData, contains: string): Observable<any> {
        let url = this.songLibraryUrl + 'songs'
        url = this.addParameterToUrl(url, 'contains', contains)
        url = this.addParameterToUrl(url, 'styleId', styleId)
        url = this.addParameterToUrl(url, 'bandId', bandId)
        url = this.addPaginationParameters(url, paginationData)
        return this.http.get<GetSongsResponse>(url)
    }

    getPatterns(styleId: string, bandId: string, songId: string, paginationData: PaginationData, patternsFilter: PatternsFilter): Observable<any> {
        let url = this.songLibraryUrl + 'phrases'
        url = this.addParameterToUrl(url, 'styleId', styleId)
        url = this.addParameterToUrl(url, 'bandId', bandId)
        url = this.addParameterToUrl(url, 'songId', songId)
        url = this.addPatternFilterParametersToUrl(url, patternsFilter)
        url = this.addPaginationParameters(url, paginationData)
        return this.http.get<GetPatternsResponse>(url);
    }


    getSongInfoById(id: string): Observable<GetSongResponse> {
        return this.http.get<GetSongResponse>(this.songLibraryUrl + 'song/' + id + '/info');
    }

    getSongById(id: string, simplificationVersion: number | null = null): Observable<GetSongResponse> {
        let url = this.songLibraryUrl + 'songs/' + id
        if (simplificationVersion) url += `?simplificationVersion=${simplificationVersion}`

        return this.http.get<GetSongResponse>(url);
    }

    addPaginationParameters(url: string, paginationData?: PaginationData): string {
        if (paginationData) {
            url += (url.includes('?')) ? '&pageNo=' + paginationData.pageNo : '?pageNo=' + paginationData.pageNo
            url += '&pageSize=' + paginationData.pageSize
        }
        return url
    }

    addParameterToUrl(url: string, paramName: string, paramValue: any): string {
        if (paramValue != null) {
            url += (url.includes('?')) ? `&${paramName}=${paramValue}` : `?${paramName}=${paramValue}`
        }
        return url
    }
    addPatternFilterParametersToUrl(url: string, filter: PatternsFilter): string {
        url = this.addParameterToUrl(url, 'numberOfNotes', filter?.numberOfNotes)
        url = this.addParameterToUrl(url, 'range', filter?.range)
        url = this.addParameterToUrl(url, 'step', filter?.step)
        url = this.addParameterToUrl(url, 'durationInTicks', filter?.durationInTicks)
        url = this.addParameterToUrl(url, 'contains', filter?.contains)
        url = this.addParameterToUrl(url, 'isMonotone', filter?.isMonotone)
        return url
    }

}
