//Stocke les données attendu dans le graphique Line
export class Line{
    constructor(
        public id: number,
        public year: number,
        public city: string,
        public medalsCount: number,
        public athleteCount: number,
        public totalAthletes:number
    ){}
}