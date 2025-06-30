import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Marca, modelAnoModelo, Modelo, resultadoFipe, TaxaJuros, ResultadoTaxaJuros, PeriodosDisponiveis } from "./app.model";
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AppService {

    APIFipeUrl: string = environment.apiFipeUrl;
    APIBCBUrl: string = environment.apiBCBUrl;
    APIBCBPeriodosUrl: string = environment.apiBCBPeriodosUrl;

    constructor(private http: HttpClient) { }

    getMarcas(codigoVeiculo){
        return this.http.get<Marca[]>(this.APIFipeUrl + codigoVeiculo + '/marcas');        
    }

    getModelos(codigoVeiculo: string, codigoMarca: string){
        return this.http.get<Modelo>(this.APIFipeUrl + codigoVeiculo + '/marcas/' + codigoMarca + '/modelos');
    }

    getAnos(codigoVeiculo: string, codigoMarca: string, codigoModelo: string){
        return this.http.get<modelAnoModelo[]>(this.APIFipeUrl + codigoVeiculo + '/marcas/' + codigoMarca + '/modelos/' + codigoModelo + '/anos' );
    }

    getResultado(codigoVeiculo: string, codigoMarca: string, codigoModelo: string, codigoAno: string){
        return this.http.get<resultadoFipe>(this.APIFipeUrl + codigoVeiculo + '/marcas/' + codigoMarca + '/modelos/' + codigoModelo + '/anos/' + codigoAno);
    }

    getTaxasJuros(): Observable<ResultadoTaxaJuros> {
        return this.getPeriodosDisponiveis().pipe(
            switchMap(periodos => {
                // Pega o primeiro período (mais recente)
                const periodoMaisRecente = periodos.value[0];
                const dataInicio = periodoMaisRecente.inicioPeriodo;
                
                const url = this.APIBCBUrl + `atual?filtro=(codigoSegmento%20eq%20%271%27)%20and%20(codigoModalidade%20eq%20%27401101%27)%20and%20(InicioPeriodo%20eq%20%27${dataInicio}%27)`;
                return this.http.get<ResultadoTaxaJuros>(url);
            })
        );
    }

    getPeriodosDisponiveis(): Observable<PeriodosDisponiveis> {
        const url = this.APIBCBPeriodosUrl + 'PeriodosDisponiveis';
        return this.http.get<PeriodosDisponiveis>(url);
    }

    getTaxasJurosFallback(): Observable<ResultadoTaxaJuros> {
        const url = this.APIBCBUrl + `atual?filtro=(codigoSegmento%20eq%20%271%27)%20and%20(codigoModalidade%20eq%20%27401101%27)%20and%20(InicioPeriodo%20eq%20%272025-06-06%27)`;
        return this.http.get<ResultadoTaxaJuros>(url);
    }

}