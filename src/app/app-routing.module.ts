import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RedirectGuard} from './redirect/redirect.guard';
import {StubComponent} from './stub/stub.component';

const appRoutes: Routes = [
  {
    path: '',
    component: StubComponent,
    canActivate: [RedirectGuard],
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
