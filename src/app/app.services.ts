import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Marca, modelAnoModelo, Modelo, resultadoFipe } from "./app.model";


@Injectable({
    providedIn: 'root'
})
export class AppService {

    API: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getMarcas(codigoVeiculo){
        return this.http.get<Marca[]>(this.API + codigoVeiculo + '/marcas');        
    }

    getModelos(codigoVeiculo: string, codigoMarca: string){
        return this.http.get<Modelo>(this.API + codigoVeiculo + '/marcas/' + codigoMarca + '/modelos');
    }

    getAnos(codigoVeiculo: string, codigoMarca: string, codigoModelo: string){
        return this.http.get<modelAnoModelo[]>(this.API + codigoVeiculo + '/marcas/' + codigoMarca + '/modelos/' + codigoModelo + '/anos' );
    }

    getResultado(codigoVeiculo: string, codigoMarca: string, codigoModelo: string, codigoAno: string){
        return this.http.get<resultadoFipe>(this.API + codigoVeiculo + '/marcas/' + codigoMarca + '/modelos/' + codigoModelo + '/anos/' + codigoAno);
    }

}