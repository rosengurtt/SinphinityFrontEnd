import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {FileUploadComponent} from './file-upload.component'
import {FileUploadShellComponent} from './file-upload-shell.component'
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { fileUploadReducer } from "./state/file-upload.reducer";
import { fileUploadFeatureKey } from "./state";
import { EffectsModule } from "@ngrx/effects";
import { FileUploadEffects } from "./state/file-upload.effects";
import { SongsRepositoryService } from "../../core/services/songs-repository/songs-repository.service";
import { MaterialModule } from '../../core/material.module'

@NgModule({
  declarations: [
    FileUploadShellComponent,
    FileUploadComponent   
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'upload', component: FileUploadShellComponent },
    ]),
    StoreModule.forFeature(fileUploadFeatureKey, fileUploadReducer),
    EffectsModule.forFeature([FileUploadEffects])
  ],
  providers: [
    SongsRepositoryService
  ],
  schemas:  [CUSTOM_ELEMENTS_SCHEMA]
})
export class FileUploadModule { }
