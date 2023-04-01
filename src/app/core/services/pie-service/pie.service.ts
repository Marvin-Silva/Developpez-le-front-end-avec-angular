import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Line } from 'src/app/pages/dashboard/details-page/model/line.model';
import { Pie } from 'src/app/pages/dashboard/pie-chart/model/pie.models';
import { Country } from '../../models/Country';
import { Participation } from '../../models/Participation';
import { GlobalError } from '../global-error-service/error.component';

/*
  Set les données pour les composants Pie et Line
  Expose les données dans le composant Pie
*/
@Injectable({
  providedIn: 'root',
})
export class PieService {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(
    private http: HttpClient,
    private global: GlobalError,
    private router: Router
  ) {}

  
  //fetch les données mockées - stocke dans la variable olympics$ - gère les erreurs
  loadInitialData() {
    return this.http.get<[Country]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),

      catchError((error) => {
        this.global.handleError(error);
        this.olympics$.next(null);
        
        this.router.navigate(['/not-found']);
        // permet de ne pas plainter l'app il se peut que ça fasse une boucle infinit ici
        return of([]);
      })
    );
  }

  public getOlympics = this.olympics$.asObservable();
  // Ecoute les données chaque données de ToPie()
  public pie = new BehaviorSubject<Pie[]>([]);
  // recupere la données écouté: utilisé dans le composant Pie 
  readonly pies = this.pie.asObservable();
  
  // charge les données du composant Pie et Line et répond à l'écoute de la variable pie
  ToPie() {
    let pie: Pie[] = [];

    this.getOlympics.subscribe({
      next: (value) => {
        value?.forEach((values: Country) => {
          let totalMedals: number = 0;
          values.participations.forEach(
            (el) => (totalMedals += el.medalsCount)
          );
          
          pie.push(
            new Pie(
              values.id,
              values.country,
              totalMedals,
              values.participations.map((value:Participation) => {
                return new Line(
                  value.id,
                  value.year,
                  value.city,
                  value.medalsCount,
                  value.athleteCount,
                  value.totalAthletes = value.athleteCount
                );
              })
            )
          );
        });
        this.pie.next(pie);
      },
    });
  }
}
