export class Marca{
    public nome: string;
    public codigo: string;
}

export class Modelo{
    public modelos: modelAnoModelo[];
    public anos: modelAnoModelo[];
}

export class modelAnoModelo{    
    public nome: string;
    public codigo: string;
}

export class resultadoFipe{
    Valor: string;
    Marca: string;
    Modelo: string;
    AnoModelo: string;
    Combustivel: string;
    CodigoFipe: string;
    MesReferencia: string;
    TipoVeiculo: number;
    SiglaCombustivel: string
}

export class TaxaJuros {
    Posicao: number;
    InstituicaoFinanceira: string;
    TaxaJurosAoMes: string;
    TaxaJurosAoAno: string;
}

export class ResultadoTaxaJuros {
    conteudo: TaxaJuros[];
}

export class PeriodoDisponivel {
    inicioPeriodo: string;
    fimPeriodo: string;
}

export class PeriodosDisponiveis {
    "@odata.context": string;
    value: PeriodoDisponivel[];
}