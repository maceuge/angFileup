import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
    { path: 'fotos', component: HomeComponent },
    { path: 'upload', component: UploadComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'fotos'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

