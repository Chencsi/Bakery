import { Routes } from '@angular/router';
import { HomeComponent } from './app/views/home/home.component';

export const routes: Routes = [
    {path: "", pathMatch: "full", component: HomeComponent},
    {path: "**", pathMatch: "full", component: HomeComponent}
];
