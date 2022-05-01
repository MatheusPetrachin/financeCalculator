import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Marca, modelAnoModelo, resultadoFipe } from './app.model';
import { AppService } from './app.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild("valorTotal") valorTotal: ElementRef;
  @ViewChild("entrada") entrada: ElementRef;
  @ViewChild("numParcelas") numParcelas: ElementRef;
  @ViewChild("taxaJuros") taxaJuros: ElementRef;
  @ViewChild("parcelaTotal") parcelaTotal: ElementRef;

  myForm: FormBuilder;

  marcas: Marca[] = [];  
  modelos: modelAnoModelo[] = [];
  anos: modelAnoModelo[] = [];
  resultadoFipe: resultadoFipe;

  codigoVeiculo: string;
  codigoMarca: string;
  codigoModelo: string;
  codigoAno: string;
  parcelaTotalResult: string;
  valorFIPE: string;
  
  constructor(private appService:AppService) { }

  ngOnInit(): void {
  }

  getMarcas(value: string){
    this.codigoVeiculo = value;
    this.appService.getMarcas(this.codigoVeiculo).subscribe(data => {this.marcas = data});
  }

  getModelos(value: string){
    this.codigoMarca = value;
    this.appService.getModelos(this.codigoVeiculo, this.codigoMarca).subscribe(data => {this.modelos = data.modelos});
  }

  getAnos(value: string){
    this.codigoModelo = value;
    this.appService.getAnos(this.codigoVeiculo, this.codigoMarca, this.codigoModelo).subscribe(data => {this.anos = data});
  }

  getResultado(value: string){
    this.codigoAno = value;
    this.appService.getResultado(this.codigoVeiculo, this.codigoMarca, this.codigoModelo, this.codigoAno).subscribe(data => {
      this.resultadoFipe = data;
      this.valorFIPE = this.resultadoFipe.Valor;
      
    });
  }

  calcular() {

    var valorTotal = this.valorTotal.nativeElement.value.replace("R$ ", "").replace(".", "").replace(",", ".");
    var entrada = this.entrada.nativeElement.value.replace("R$ ", "").replace(".", "").replace(",", ".");
        
    var numParcelas = this.numParcelas.nativeElement.value;
    var taxaJuros = this.taxaJuros.nativeElement.value/100;
    var valorFinanciado = valorTotal-entrada;
    var parcelaTotal = parseFloat(this.parcelaTotal.nativeElement.value.replace("R$ ", "").replace(".", "").replace(",", "."));    

    if (parcelaTotal)
    {
      taxaJuros = 0.000000;
      do
      {        
        taxaJuros += 0.000001;
        var calc = parseFloat(((valorFinanciado*taxaJuros)/(1-(1+taxaJuros) ** (- numParcelas))).toFixed(2));

        if (calc > parcelaTotal)
        {
          alert("Parcela ira resultar em uma taxa de Juros inválida... Por favor insira um valor maior para o calculo!" + taxaJuros);
          break;
        }
        
      }while(parcelaTotal != calc);  
      
      taxaJuros = taxaJuros*100;
      this.taxaJuros.nativeElement.value = taxaJuros.toFixed(2);
    }
    else if (taxaJuros)
    {
      this.parcelaTotal.nativeElement.value = "R$ " + ((valorFinanciado*taxaJuros)/(1-(1+taxaJuros) ** (- numParcelas))).toFixed(2).replace(".", ",");
    }        
  }

  printCalc(taxaJuros: number, parcelaTotal: any, calc: string)
  {    
    console.log(taxaJuros); 
    console.log(parcelaTotal + " - " + calc);  
  }
}
