import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { SongsRepositoryService } from '../../core/services/songs-repository/songs-repository.service'
import { MaterialModule } from '../../core/material.module'
import { PipesModule } from '../../core/pipes/pipes-module'
import { PatternsLibraryShellComponent } from './patterns-library-shell.component'
import { PatternsLibraryComponent } from './patterns-library.component'
import { PatternComponent } from 'src/app/modules/patterns-library/pattern/pattern.component'
import { patternsLibraryFeatureKey } from './state'
import { patternsLibraryReducer } from './state/patterns-library.reducer'
import { PatternsLibraryEffects } from './state/patterns-library.effects'
import { PatternSearchService } from './services/pattern-search.service'
import { DrawingMusicalNotationGlobalService } from '../../core/services/songs-display/drawing-musical-notation-global.service'
import { InstrumentCodeToNamePipe } from 'src/app/core/pipes/instrumentCode2Name'

@NgModule({
  declarations: [
    PatternsLibraryShellComponent,
    PatternsLibraryComponent,
    PatternComponent,
    InstrumentCodeToNamePipe
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild([
      { path: 'patterns-library', component: PatternsLibraryShellComponent },
    ]),
    StoreModule.forFeature(patternsLibraryFeatureKey, patternsLibraryReducer),
    EffectsModule.forFeature([PatternsLibraryEffects])
  ],

  providers: [
    SongsRepositoryService,
    PatternSearchService,
    DrawingMusicalNotationGlobalService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatternsLibraryModule { }
