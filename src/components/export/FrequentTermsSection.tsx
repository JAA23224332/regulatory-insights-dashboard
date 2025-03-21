
import React from 'react';
import { termosFrequentesFortalezas, termosFrequentesFragilidades } from '@/data/regulacaoData';

const FrequentTermsSection = () => {
  return (
    <div className="card card-section-6">
      <h2 className="text-xl font-semibold mb-4">Termos mais Frequentes</h2>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium text-lg mb-4 text-green-700">Em Fortalezas:</h3>
          <table className="print-table">
            <thead>
              <tr>
                <th>Termo</th>
                <th>Frequência</th>
              </tr>
            </thead>
            <tbody>
              {termosFrequentesFortalezas.map((item, index) => (
                <tr key={index}>
                  <td>{item.termo}</td>
                  <td>{item.frequencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4 text-red-700">Em Fragilidades:</h3>
          <table className="print-table">
            <thead>
              <tr>
                <th>Termo</th>
                <th>Frequência</th>
              </tr>
            </thead>
            <tbody>
              {termosFrequentesFragilidades.map((item, index) => (
                <tr key={index}>
                  <td>{item.termo}</td>
                  <td>{item.frequencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FrequentTermsSection;
