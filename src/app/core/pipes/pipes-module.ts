import { NgModule } from '@angular/core'
import { CellWidthLimitPipe } from './cell-width-limit.pipe'

@NgModule({
  declarations: [
    CellWidthLimitPipe
  ],
  exports: [
    CellWidthLimitPipe
  ]

})
export class PipesModule { }
