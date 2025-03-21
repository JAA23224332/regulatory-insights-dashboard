
import React from 'react';
import { dadosReais } from '@/data/regulacaoData';

const StrengthsSection = () => {
  return (
    <div className="card card-section-3">
      <h2 className="text-xl font-semibold mb-4">Fortalezas por Categoria</h2>
      
      <table className="print-table mb-6">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Contagem</th>
            <th>Percentual</th>
          </tr>
        </thead>
        <tbody>
          {dadosReais
            .filter(item => item.fortalezas > 0)
            .sort((a, b) => b.fortalezas - a.fortalezas)
            .map((item, index) => {
              const percent = (item.fortalezas / 45 * 100).toFixed(1);
              return (
                <tr key={index}>
                  <td>{item.categoria}</td>
                  <td>{item.fortalezas}</td>
                  <td>{percent}%</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      
      <h3 className="font-medium text-lg mb-4">Principais fortalezas identificadas:</h3>
      <ul className="space-y-2">
        <li>• <strong>Sistemas e tecnologia</strong>: Uso do SISREG e outros sistemas de regulação, telemedicina e telessaúde.</li>
        <li>• <strong>Protocolos e fluxos</strong>: Padronização de processos, classificação de risco e priorização de atendimentos.</li>
        <li>• <strong>Governança e gestão</strong>: Estruturação de complexos reguladores e monitoramento de ações.</li>
        <li>• <strong>Integração de níveis</strong>: Articulação entre atenção primária e especializada.</li>
      </ul>
    </div>
  );
};

export default StrengthsSection;
