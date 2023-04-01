import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineChartComponent } from './pages/dashboard/details-page/line-chart-component';
import { PieChartComponent } from './pages/dashboard/pie-chart/pie-chart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PieChartComponent,
  },
    
  {
    path: 'not-found', 
    component: NotFoundComponent,
  },
  {
    path: 'line-chart',
    component: LineChartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
