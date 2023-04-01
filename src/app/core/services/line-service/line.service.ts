import {Injectable} from '@angular/core';

/*
Set les données à partir du clique dans le composant pie-chart
Expose les données dans le composant Line
*/
@Injectable({
    providedIn: 'root'
})
export class LineService{

    private myMedalsNumber:number[]=[];
    private myEntries!:number;
    private totalMedalsNumber!:number;
    private athletes!:number;
    private years:number[]=[];

    constructor(){}

    setTotalNumberOfMedals(medals:number){
        this.totalMedalsNumber = medals;
    }

    setMedalsNumber(data:any){
        data.map((el:number) => {this.myMedalsNumber.push(el)})
    }

    setEntries(medals:number){
        this.myEntries = medals;
    }

    setTotalNumberOfAthletes(athletes:number){
        this.athletes = athletes;
    }

    setYears(years:number[]){
        this.years = years;
    }

    getYears(){
        return this.years;
    }
    getTotalNumberOfAthletes(){
        return this.athletes;
    }
    getTotalMedalsNumber(){
        return this.totalMedalsNumber;
    }
    getMedalsNumber(){
        return this.myMedalsNumber;
    }

    getEntries(){
        return this.myEntries;
    }
}