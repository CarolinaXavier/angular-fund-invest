export interface InvestimentoDados {
    nome: string;
    objetivo: string;
    saldoTotalDisponivel: number;
    indicadorCarencia: string;
    acoes:InvestimentoAcoes[];
  }

  export interface InvestimentoAcoes{
    id: string;
    nome: string;
    percentual: number;
  }
  