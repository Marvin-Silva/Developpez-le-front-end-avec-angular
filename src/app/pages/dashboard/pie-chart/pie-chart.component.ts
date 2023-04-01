import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { LineService } from 'src/app/core/services/line-service/line.service';
import { PieService } from 'src/app/core/services/pie-service/pie.service';
import { Pie } from './model/pie.models';

// composant graphique Pie
@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  public pie: Pie[] = [];
  public participation!: number;

  constructor(
    private pieService: PieService,
    private router: Router,
    private lineService: LineService,
  ) {}

  // Initialization du graphique: Insertion des données
  ngOnInit() {
    this.pieService.pies.subscribe((pies) => {
      this.pie = pies; this.participation = pies.map(el =>el.participations.length).reduce((acc, val)=>acc+val, 0);
      if (this.pie.length > 0) {
        // instance de la chart
        let chart = new Chart('chart', {
          type: 'pie',
          data: {
            labels: this.pie.map((el) => el.country),
            datasets: [
              {
                label: '🥇',
                data: this.pie.map((el) => el.totalmedals),

                backgroundColor: [
                  'rgba(84, 17, 50,0.80)',
                  'rgba(93,119,186, 0.80)',
                  'rgba(102,51,102, 0.70)',
                  'rgba(148,196,209, 0.45)',
                  'rgba(137,168,209, 0.50)',
                ],
                borderColor: [
                  'rgba(84, 17, 50,0.80)',
                  'rgba(93,119,186, 0.80)',
                  'rgba(102,51,102, 0.70)',
                  'rgba(148,196,209, 0.45)',
                  'rgba(137,168,209, 0.50)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
          
        });
        // Ecoute les evenements du clique - recuperer les données - set les données pour la page de details
        chart.canvas.addEventListener('click', (evt)=>{
          //function callback permet de recuperer les données de la chart
          const points =chart.getElementsAtEventForMode(evt, 'index', {intersect:true}, true);
          
          /*
            recupere l'index de l'élement cliqué avec la variable firstPoint
            utilise cet index comme identité des données à recuperer
          */
          if(points.length) {
            const firstPoint = points[0]
            const myNumberOfMedals = this.pie[firstPoint.index].participations.map(el=>el.medalsCount)
            const myEntries = this.pie[firstPoint.index].participations.length
            const total_medals = this.pie[firstPoint.index].totalmedals
            const atheltes = this.pie[firstPoint.index].participations.map(el=>el.totalAthletes).reduce((acc, val)=>acc+val,0)
            const years = this.pie[firstPoint.index].participations.map(el=>el.year);

            // set les valeurs identifié ici pour l'exposition de la page de details
            this.lineService.setYears(years);
            this.lineService.setTotalNumberOfAthletes(atheltes);
            this.lineService.setTotalNumberOfMedals(total_medals);
            this.lineService.setEntries(myEntries);
            this.lineService.setMedalsNumber(myNumberOfMedals)
            this.router.navigate(['/line-chart']);
          }
        })
      }
    });

    // Apelle de la function qui charge les composant Pie et Line
    this.pieService.ToPie();
  }
}
