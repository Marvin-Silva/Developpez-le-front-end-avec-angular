import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { LineService } from 'src/app/core/services/line-service/line.service';

// Composant pour la page de details 
@Component({
  selector: 'line-chart',
  templateUrl: 'line-chart-component.html',
  styleUrls: ['./line-chart-component.scss'],
})
export class LineChartComponent {
  @ViewChild('myChartRef') myChartRef!: ElementRef;

  //Données bind declaré dans le composant HTML pour le rendu DOM
  public numberOfEntries!: number;
  public myData: number[] = [];
  public totalMedals!:number;
  public totalAthletes!:number;
  public years:number[]=[];

  constructor(private lineService: LineService, private router:Router) {
    this.myData = lineService.getMedalsNumber();
    this.numberOfEntries = lineService.getEntries();
    this.totalMedals = lineService?.getTotalMedalsNumber();
    this.totalAthletes = lineService?.getTotalNumberOfAthletes();
    this.years = lineService.getYears();
  }
  
  //Initialization du graphique Line et insertion des données venue du clique: Composant Pie
  ngAfterViewInit() {
    const myChartRef = this.myChartRef.nativeElement;
    const ctx = myChartRef.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            data: this.myData, 
          },
        
        ],
        
        labels: this.years,
        
      },
      
      options: {
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
        responsive:true,
      },
    });
    console.log('MyData', this.myData);
  }
// Button de Retour à la page d'accueill
  btnBack(){
    this.router.navigate(['']);
  }

}
