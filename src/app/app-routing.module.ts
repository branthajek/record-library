import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { InputComponent } from './input/input.component';
import { LibraryComponent } from './library/library.component';
import { SortComponent } from './sort/sort.component';

const routes: Routes = [
  { path: '', redirectTo: '/library', pathMatch: 'full' },
  // { path: '**', redirectTo: '/library', pathMatch: 'full' },
  { path: 'library', component: LibraryComponent, children: [
    { path: 'input', component: InputComponent },
    { path: 'sort', component: SortComponent },
  ] },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
