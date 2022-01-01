import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FileNameToSongNamePipe } from '../../core/pipes/filename2songname.pipe'
import { SongsRepositoryService } from '../../core/services/songs-repository/songs-repository.service'
import { MaterialModule } from '../../core/material.module'
import { PatternsLibraryShellComponent } from './patterns-library-shell.component'
import { PatternsLibraryComponent } from './patterns-library.component'
import { patternsLibraryFeatureKey } from './state'
import { patternsLibraryReducer } from './state/songs-library.reducer'
import { PatternsLibraryEffects } from './state/songs-library.effects'
import { PatternSearchService } from './services/pattern-search.service'

@NgModule({
  declarations: [
    PatternsLibraryShellComponent,
    PatternsLibraryComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'patterns-library', component: PatternsLibraryShellComponent },
    ]),
    StoreModule.forFeature(patternsLibraryFeatureKey, patternsLibraryReducer),
    EffectsModule.forFeature([PatternsLibraryEffects])
  ],




  providers: [
    SongsRepositoryService,
    PatternSearchService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatternsLibraryModule { }
