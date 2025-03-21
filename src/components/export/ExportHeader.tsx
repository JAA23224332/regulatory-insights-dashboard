
import React from 'react';
import { estatisticasGerais } from '@/data/regulacaoData';

const ExportHeader = () => {
  return (
    <>
      <div className="print-title">
        Análise de <span>Fortalezas e Fragilidades</span> na Regulação do SUS
      </div>
      <div className="print-subtitle">
        Baseado em respostas de 12 Secretarias Estaduais de Saúde | {estatisticasGerais.totalFortalezas} fortalezas e {estatisticasGerais.totalFragilidades} fragilidades identificadas
      </div>
    </>
  );
};

export default ExportHeader;
