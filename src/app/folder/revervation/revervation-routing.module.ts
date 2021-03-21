import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevervationPage } from './revervation.page';

const routes: Routes = [
  {
    path: '',
    component: RevervationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevervationPageRoutingModule {}
