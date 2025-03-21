
import React from 'react';
import { dadosReais } from '@/data/regulacaoData';

const ComparativeSection = () => {
  return (
    <div className="card card-section-2">
      <div className="comparativo-titulo">
        2. Comparativo por Categoria
      </div>
      
      <table className="print-table mb-4">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Fortalezas</th>
            <th>Fragilidades</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {dadosReais.map((item, index) => (
            <tr key={index}>
              <td><strong>{item.categoria}</strong></td>
              <td>{item.fortalezas}</td>
              <td>{item.fragilidades}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4">
        <h3 className="font-medium text-lg mb-3">Destaques da análise:</h3>
        <ul className="space-y-2">
          <li>• <strong>Sistemas de informação e tecnologia</strong>: aparece tanto como fortaleza (13 menções) quanto fragilidade (12 menções).</li>
          <li>• <strong>Protocolos e fluxos</strong>: mais frequentemente citado como fortaleza (8 menções) do que fragilidade (5 menções).</li>
          <li>• <strong>Recursos humanos</strong> e <strong>Acesso e equidade</strong>: mais frequentemente citados como fragilidades (7 menções cada) do que fortalezas (3 menções cada).</li>
          <li>• <strong>Regionalização</strong> e <strong>Financiamento</strong>: aparecem quase exclusivamente como fragilidades (4 e 1 menções respectivamente).</li>
        </ul>
      </div>
    </div>
  );
};

export default ComparativeSection;
