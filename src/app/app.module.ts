import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalError } from './core/services/global-error-service/error.component';
import { LineChartComponent } from './pages/dashboard/details-page/line-chart-component';
import { PieChartComponent } from './pages/dashboard/pie-chart/pie-chart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

Chart.register(...registerables);

@NgModule({
  declarations: [AppComponent,NotFoundComponent, PieChartComponent, LineChartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {provide: GlobalError},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
