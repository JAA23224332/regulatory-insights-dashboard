
import React from 'react';
import { termosCompartilhados } from '@/data/regulacaoData';

const SharedTermsSection = () => {
  return (
    <div className="card card-section-7">
      <h2 className="text-xl font-semibold mb-4">Termos comuns entre Fortalezas e Fragilidades</h2>
      
      <table className="print-table">
        <thead>
          <tr>
            <th>Termo</th>
            <th>Freq. Fortalezas</th>
            <th>Freq. Fragilidades</th>
            <th>Diferença</th>
          </tr>
        </thead>
        <tbody>
          {termosCompartilhados.map((item, index) => (
            <tr key={index}>
              <td>{item.termo}</td>
              <td>{item.freqFortalezas}</td>
              <td>{item.freqFragilidades}</td>
              <td className={item.diferenca > 0 ? 'text-green-700' : (item.diferenca < 0 ? 'text-red-700' : '')}>
                {item.diferenca > 0 ? '+' : ''}{item.diferenca}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SharedTermsSection;
