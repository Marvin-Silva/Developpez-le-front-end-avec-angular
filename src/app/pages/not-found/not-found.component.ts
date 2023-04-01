import { Component, OnInit } from '@angular/core';
import { GlobalError } from 'src/app/core/services/global-error-service/error.component';

/*
  Ce composant sert à afficher la page d'erreur appellé lors du fetch 
  TODO: personnaliser et adapter pour l'experience utilisateur
*/
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  error: any;

  constructor(private globalError: GlobalError) {}

  ngOnInit(): void {this.error = this.globalError.handleError;}
}
