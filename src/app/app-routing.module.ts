import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '#menu',
    loadChildren: () => import('./folder/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: '#dishdetail',
    loadChildren: () => import('./folder/dishdetail/dishdetail.module').then( m => m.DishdetailPageModule)
  },
  {
    path: '#about',
    loadChildren: () => import('./folder/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: '#contact',
    loadChildren: () => import('./folder/contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: '#favorites',
    loadChildren: () => import('./folder/favorites/favorites.module').then(m => m.FavoritesPageModule)
  },
  {
    path: '#revervation',
    loadChildren: () => import('./folder/revervation/revervation.module').then(m => m.RevervationPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
