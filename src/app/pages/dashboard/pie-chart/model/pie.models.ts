import { Participation } from 'src/app/core/models/Participation';

// Objet du rendu du graphique Pie
export class Pie {
  constructor(
    public id: number,
    public country: string,
    public totalmedals: number,
    public participations: Participation[]
  ) {}
}
