import { Participation } from "./Participation";

/*
    Parametre pour le transport des données afin de les stocker dans l'objet Pie
    Responsable: data-pie-service
*/
export interface Country{
    id: number,
    country: string,
    participations: Participation[]
}