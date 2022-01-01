import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppInitService } from './app.init'
import { HeaderComponent } from './core/header/header.component'
import { HeaderShellComponent } from './core/header/header-shell.component'
import { MaterialModule } from './core/material.module'
import { HomeComponent } from './modules/home/home.component'
import { SongsLibraryModule } from './modules/songs-library/songs-library.module'
import { PatternsLibraryModule } from './modules/patterns-library/patterns-library.module'
import { SongPanelModule } from './modules/song-panel/song-panel.module'
import { HttpClientModule } from '@angular/common/http'
import { SongsRepositoryService } from './core/services/songs-repository/songs-repository.service'
import { SongsLibraryEventsService } from './modules/songs-library/services/songs-library-events.service'
import { AppStateServiceService } from './core/services/app-state.service'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { FileUploadModule } from '../app/modules/file-upload/file-upload.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

export function init_app(appLoadService: AppInitService) {
  return () => appLoadService.init();
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderShellComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SongsLibraryModule,
    PatternsLibraryModule,
    SongPanelModule,
    FileUploadModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService],
      multi: true
    },
    SongsRepositoryService,
    SongsLibraryEventsService,
    AppStateServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
