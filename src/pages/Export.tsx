
import React from 'react';
import { dadosReais, dadosComparativoCategoria } from '@/data/regulacaoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import ExportButtons from '@/components/ExportButtons';

// Cores mais contrastantes para o gráfico
const COLORS_BAR = {
  fortalezas: '#00A020', // Verde mais intenso
  fragilidades: '#E01010'  // Vermelho mais intenso
};

// Componente personalizado para o tick do eixo X com ângulo rotacionado
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={16} 
        textAnchor="end" 
        fill="#666"
        fontSize={12}
        fontWeight="bold"
        transform="rotate(-45)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const Export = () => {
  // Ordenar dados para melhor visualização
  const dadosOrdenados = [...dadosComparativoCategoria].sort((a, b) => b.total - a.total);

  return (
    <div className="exportable-document print-layout pb-20">
      {/* Botões de exportação */}
      <div className="mb-6 flex justify-end">
        <ExportButtons />
      </div>
      
      {/* Seção do gráfico de comparativo por categoria */}
      <div className="card card-section-2">
        <div className="comparativo-titulo">
          Comparativo por Categoria
        </div>
        
        <div className="chart-container mb-6" style={{ height: '600px' }}>
          <ChartContainer 
            className="h-[600px] w-full" 
            config={{
              fortalezas: { color: COLORS_BAR.fortalezas },
              fragilidades: { color: COLORS_BAR.fragilidades }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dadosOrdenados}
                layout="vertical"
                margin={{ top: 20, right: 50, left: 160, bottom: 40 }}
                barSize={25}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12, fontWeight: 'bold' }}
                  domain={[0, 'dataMax + 2']}
                />
                <YAxis 
                  dataKey="categoria"
                  type="category" 
                  tick={{ fontSize: 12, fontWeight: 'bold' }}
                  width={150}
                />
                <Tooltip 
                  contentStyle={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    backgroundColor: '#fff',
                    border: '2px solid #ccc'
                  }}
                  itemStyle={{ color: '#000' }}
                  formatter={(value, name) => [`${value} menções`, name === 'fortalezas' ? 'Fortalezas' : 'Fragilidades']}
                />
                <Legend 
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ 
                    paddingTop: '20px', 
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
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
