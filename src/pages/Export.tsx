
import React, { useEffect } from 'react';
import { dadosComparativoCategoria } from '@/data/regulacaoData';
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
        chartElem.style.height = '100vh'; // Full viewport height
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
    <div className="exportable-document print-layout">
      <div className="print-title">
        Comparativo por Categoria na Regulação do SUS
      </div>
      
      <div className="full-page-chart-container">
        <div className="chart-container" style={{ height: '90vh', width: '100%' }}>
          <ChartContainer 
            className="h-full w-full" 
            config={{
              fortalezas: { color: "#4CAF50" },
              fragilidades: { color: "#F44336" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dadosComparativoCategoria}
                layout="vertical"
                margin={{ top: 30, right: 40, left: 280, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 20 }}
                  tickSize={10}
                  domain={[0, 'dataMax + 2']}
                />
                <YAxis 
                  type="category" 
                  dataKey="categoria" 
                  tick={{ fontSize: 20 }} 
                  width={280}
                  tickSize={10}
                />
                <Tooltip contentStyle={{ fontSize: '18px' }} />
                <Legend 
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ 
                    paddingTop: '30px', 
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                  }}
                />
                <Bar dataKey="fortalezas" name="Fortalezas" fill={COLORS_BAR.fortalezas} barSize={60} />
                <Bar dataKey="fragilidades" name="Fragilidades" fill={COLORS_BAR.fragilidades} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Export;
