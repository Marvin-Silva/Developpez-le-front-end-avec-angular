import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalError implements ErrorHandler{

constructor(private errorHandle: ErrorHandler ){}
    
handleError(error: any): void {
if(error instanceof HttpErrorResponse){
    switch(error.status){
        case 400:
            console.log('Bad Request');
            break;
        case 401:
            console.log('Unauthorized');
            break;
        case 404:
            console.log('Not Found', error.message);
            break;
        default:
            console.log('Server Error');
            break;
    }
}else{
    console.log('An error occurred');
}
    return this.errorHandle.handleError(error);

    }

}