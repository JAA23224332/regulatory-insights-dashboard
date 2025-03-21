
import React from 'react';
import { dadosIntensidade } from '@/data/regulacaoData';

const IntensitySection = () => {
  return (
    <div className="card card-section-5">
      <h2 className="text-xl font-semibold mb-4">Intensidade por Categoria</h2>
      
      <table className="print-table mb-6">
        <thead>
          <tr>
            <th>Tema</th>
            <th>Intensidade Fortalezas</th>
            <th>Intensidade Fragilidades</th>
            <th>Diferença</th>
          </tr>
        </thead>
        <tbody>
          {dadosIntensidade
            .sort((a, b) => b.intensidadeFortalezas - a.intensidadeFortalezas)
            .map((item, index) => (
              <tr key={index}>
                <td>{item.tema}</td>
                <td>{item.intensidadeFortalezas.toFixed(1)}</td>
                <td>{item.intensidadeFragilidades.toFixed(1)}</td>
                <td className={item.diferenca > 0 ? 'text-green-700' : 'text-red-700'}>
                  {item.diferenca.toFixed(1)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
      <p className="text-sm mb-4">
        <em>Nota: A intensidade é calculada como a média ponderada da frequência de menções pelo número de estados participantes.</em>
      </p>
    </div>
  );
};

export default IntensitySection;
