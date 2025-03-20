
import React, { useEffect, useRef } from 'react';
import { dadosReais, dadosComparativoCategoria } from '@/data/regulacaoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { exportToPDF } from '@/utils/exportUtils';
import { ChartContainer } from '@/components/ui/chart';

const COLORS_BAR = {
  fortalezas: '#4CAF50',
  fragilidades: '#F44336'
};

const Export = () => {
  useEffect(() => {
    const forceRender = () => {
      const chart = document.querySelector('.chart-container');
      if (chart) {
        const chartElem = chart as HTMLElement;
        chartElem.style.display = 'block';
        chartElem.style.visibility = 'visible';
        chartElem.style.opacity = '1';
        chartElem.style.height = '700px'; // Ensure chart is tall enough
      }
    };

    forceRender();

    const timer = setTimeout(forceRender, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          exportToPDF();
        });
      });
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="exportable-document print-layout pb-20">
      <div className="print-title">
        Comparativo por Categoria na Regulação do SUS
      </div>
      <div className="print-subtitle">
        Baseado em respostas de 12 Secretarias Estaduais de Saúde | 45 fortalezas e 63 fragilidades identificadas
      </div>
      
      <div className="card card-section-2">
        <div className="comparativo-titulo">
          Comparativo por Categoria
        </div>
        
        <div className="chart-container mb-6" style={{ height: '850px' }}>
          <ChartContainer 
            className="h-[850px] w-full" 
            config={{
              fortalezas: { color: "#4CAF50" },
              fragilidades: { color: "#F44336" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dadosComparativoCategoria}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 250, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 18 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="categoria" 
                  tick={{ fontSize: 18 }} 
                  width={250} 
                />
                <Tooltip />
                <Legend 
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: '20px', fontSize: '18px' }}
                />
                <Bar dataKey="fortalezas" name="Fortalezas" fill={COLORS_BAR.fortalezas} barSize={50} />
                <Bar dataKey="fragilidades" name="Fragilidades" fill={COLORS_BAR.fragilidades} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
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
      
      <div className="mt-8 text-sm text-center text-gray-500">
        <p>Documento gerado com base na análise de respostas de 12 Secretarias Estaduais de Saúde.</p>
        <p>Data da geração: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Export;
