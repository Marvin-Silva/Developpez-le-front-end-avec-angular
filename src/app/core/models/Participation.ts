/*
Parametre typé pour les Participations, destinataire objet Line 
Responsable: couche service data-pie-service
*/
export interface Participation{
    id: number,
    year: number,
    city: string,
    medalsCount: number,
    athleteCount: number,
    totalAthletes:number
}