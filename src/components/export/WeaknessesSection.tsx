
import React from 'react';
import { dadosReais } from '@/data/regulacaoData';

const WeaknessesSection = () => {
  return (
    <div className="card card-section-4">
      <h2 className="text-xl font-semibold mb-4">Fragilidades por Categoria</h2>
      
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
            .filter(item => item.fragilidades > 0)
            .sort((a, b) => b.fragilidades - a.fragilidades)
            .map((item, index) => {
              const percent = (item.fragilidades / 63 * 100).toFixed(1);
              return (
                <tr key={index}>
                  <td>{item.categoria}</td>
                  <td>{item.fragilidades}</td>
                  <td>{percent}%</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      
      <h3 className="font-medium text-lg mb-4">Principais fragilidades identificadas:</h3>
      <ul className="space-y-2">
        <li>• <strong>Recursos humanos</strong>: Falta de profissionais qualificados e capacitação inadequada.</li>
        <li>• <strong>Acesso e equidade</strong>: Desigualdades no acesso entre regiões e municípios.</li>
        <li>• <strong>Sistemas e tecnologia</strong>: Limitações dos sistemas existentes, falta de interoperabilidade.</li>
        <li>• <strong>Integração de níveis</strong>: Falta de articulação entre os diferentes níveis de atenção.</li>
        <li>• <strong>Regionalização</strong>: Dificuldades na implementação da regionalização da saúde.</li>
      </ul>
    </div>
  );
};

export default WeaknessesSection;
