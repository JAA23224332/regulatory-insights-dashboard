
import React from 'react';
import { dadosDistribuicaoPie, estatisticasGerais } from '@/data/regulacaoData';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const COLORS_PIE = ['#4CAF50', '#F44336']; // Verde e Vermelho

const renderCustomizedPieLabel = () => {
  return null;
};

const OverviewSection = () => {
  return (
    <div className="card card-section-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-lg font-semibold text-blue-600">12</p>
          <p className="text-sm">Estados participantes</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-lg font-semibold text-green-600">{estatisticasGerais.totalFortalezas}</p>
          <p className="text-sm">Fortalezas identificadas</p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-lg font-semibold text-red-600">{estatisticasGerais.totalFragilidades}</p>
          <p className="text-sm">Fragilidades identificadas</p>
        </div>
      </div>
      
      <div className="chart-container mb-6">
        <div className="flex justify-center items-center flex-col">
          <ChartContainer 
            className="h-[300px] w-[400px]" 
            config={{
              fortalezas: { color: "#4CAF50" },
              fragilidades: { color: "#F44336" }
            }}
          >
            <PieChart>
              <Pie
                data={dadosDistribuicaoPie}
                cx="50%" 
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={renderCustomizedPieLabel}
              >
                {dadosDistribuicaoPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                ))}
              </Pie>
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ 
                  fontSize: '14px',
                  paddingTop: '20px',
                  width: '100%',
                  textAlign: 'center'
                }}
              />
            </PieChart>
          </ChartContainer>
          
          <div className="custom-print-pie-legend print:block">
            <div className="flex justify-center space-x-4">
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 bg-green-500 mr-2"></span>
                <span>Fortalezas: {dadosDistribuicaoPie[0].percentage}</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 bg-red-500 mr-2"></span>
                <span>Fragilidades: {dadosDistribuicaoPie[1].percentage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="principais-constatacoes border-t pt-4 mt-4">
        <h3 className="font-semibold text-lg mb-3">Principais constatações:</h3>
        <ul className="space-y-6">
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2 flex-shrink-0 mt-1">•</span>
            <span className="block w-[calc(100%-20px)] leading-normal text-sm">
              <strong>{estatisticasGerais.temasMaisFragilidades}%</strong> dos temas aparecem com maior frequência como fragilidades
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2 flex-shrink-0 mt-1">•</span>
            <span className="block w-[calc(100%-20px)] leading-normal text-sm">
              <strong>{estatisticasGerais.temasMaisFortalezas}%</strong> dos temas aparecem com maior frequência como fortalezas
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-gray-600 font-bold mr-2 flex-shrink-0 mt-1">•</span>
            <span className="block w-[calc(100%-20px)] leading-normal text-sm">
              <strong>{estatisticasGerais.temasEquilibrados}%</strong> dos temas apresentam equilíbrio entre fortalezas e fragilidades
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewSection;
