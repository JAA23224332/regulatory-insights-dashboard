
import React, { useEffect } from 'react';
import { dadosReais, dadosComparativoCategoria } from '@/data/regulacaoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { exportToPDF } from '@/utils/exportUtils';
import { ChartContainer } from '@/components/ui/chart';

// Cores mais contrastantes para o gráfico
const COLORS_BAR = {
  fortalezas: '#00A020', // Verde mais intenso
  fragilidades: '#E01010'  // Vermelho mais intenso
};

const Export = () => {
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
      {/* Seção do gráfico de comparativo por categoria */}
      <div className="card card-section-2">
        <div className="comparativo-titulo">
          Comparativo por Categoria
        </div>
        
        <div className="chart-container mb-6" style={{ height: '900px' }}>
          <ChartContainer 
            className="h-[900px] w-full" 
            config={{
              fortalezas: { color: COLORS_BAR.fortalezas },
              fragilidades: { color: COLORS_BAR.fragilidades }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dadosComparativoCategoria}
                layout="horizontal"
                margin={{ top: 30, right: 50, left: 30, bottom: 160 }}
                barSize={40}
                barGap={10}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="categoria" 
                  tick={{ fontSize: 16, fontWeight: 'bold', angle: -45, textAnchor: 'end' }}
                  height={120}
                  interval={0}
                />
                <YAxis 
                  type="number" 
                  tick={{ fontSize: 16, fontWeight: 'bold' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    backgroundColor: '#fff',
                    border: '2px solid #ccc'
                  }}
                  itemStyle={{ color: '#000' }}
                />
                <Legend 
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ 
                    paddingTop: '30px', 
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '50px'
                  }}
                />
                <Bar 
                  dataKey="fortalezas" 
                  name="Fortalezas" 
                  fill={COLORS_BAR.fortalezas} 
                  stroke="#007010"
                  strokeWidth={1}
                />
                <Bar 
                  dataKey="fragilidades" 
                  name="Fragilidades" 
                  fill={COLORS_BAR.fragilidades} 
                  stroke="#B00000"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Legenda personalizada para garantir boa visualização na impressão */}
          <div className="custom-print-chart-legend">
            <div className="custom-print-legend-item">
              <span className="custom-print-legend-color fortalezas-color"></span>
              <span>Fortalezas</span>
            </div>
            <div className="custom-print-legend-item">
              <span className="custom-print-legend-color fragilidades-color"></span>
              <span>Fragilidades</span>
            </div>
          </div>
        </div>
        
        {/* A tabela e outros detalhes serão ocultados na impressão */}
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
    </div>
  );
};

export default Export;
