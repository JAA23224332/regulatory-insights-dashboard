import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import ExportButtons from './ExportButtons';
import { 
  dadosReais, 
  dadosIntensidade, 
  termosFrequentesFortalezas, 
  termosFrequentesFragilidades, 
  termosCompartilhados 
} from '@/data/regulacaoData';

const COLORS_FORTALEZAS = ['#0062cc', '#00994c', '#57bc6c', '#81C784', '#A5D6A7', '#4CBB17', '#3F704D', '#138808'];
const COLORS_FRAGILIDADES = ['#cc4125', '#d32f2f', '#e35353', '#EF5350', '#E57373', '#DD2C00', '#B71C1C', '#FF8A65'];

const estatisticasGerais = {
  totalEstados: 12,
  totalFortalezas: 45,
  totalFragilidades: 63,
  temasMaisFortalezas: 38, // %
  temasMaisFragilidades: 52, // %
  temasEquilibrados: 10, // %
};

const dadosDistribuicao = [
  { name: 'Fortalezas', value: estatisticasGerais.totalFortalezas },
  { name: 'Fragilidades', value: estatisticasGerais.totalFragilidades },
];

const prepareDadosPieFortalezas = () => {
  const total = dadosReais.reduce((acc, item) => acc + item.fortalezas, 0);
  return dadosReais
    .filter(item => item.fortalezas > 0)
    .map(item => ({
      name: item.categoria,
      value: item.fortalezas,
      percentage: Math.round((item.fortalezas / total) * 100)
    }))
    .sort((a, b) => b.value - a.value);
};

const prepareDadosPieFragilidades = () => {
  const total = dadosReais.reduce((acc, item) => acc + item.fragilidades, 0);
  return dadosReais
    .filter(item => item.fragilidades > 0)
    .map(item => ({
      name: item.categoria,
      value: item.fragilidades,
      percentage: Math.round((item.fragilidades / total) * 100)
    }))
    .sort((a, b) => b.value - a.value);
};

const dadosPieFortalezas = prepareDadosPieFortalezas();
const dadosPieFragilidades = prepareDadosPieFragilidades();

const SimpleCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, percentage }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text 
      x={x} 
      y={y} 
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ fontWeight: 'bold', fontSize: '12px' }}
    >
      {percentage}%
    </text>
  );
};

const ExportableView = () => {
  const navigate = useNavigate();
  const documentRef = useRef(null);
  
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body { background-color: white !important; }
        .display-screen-only { display: none !important; }
        .display-print-only { display: block !important; }
        
        /* Force all content to be visible */
        .exportable-document {
          display: block !important;
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }
        
        /* Make sure all charts are visible in print */
        .recharts-wrapper {
          page-break-inside: avoid !important;
          height: auto !important;
          min-height: 400px !important;
        }
        
        /* Improve chart text readability */
        .recharts-cartesian-axis-tick text {
          font-size: 12px !important;
          fill: black !important;
        }
        
        /* Fix for bar chart text overlap */
        .card-section-2 .recharts-cartesian-axis.recharts-yAxis .recharts-cartesian-axis-tick {
          font-size: 12px !important;
          font-weight: normal !important;
        }
        
        /* Ensure tables break properly */
        table {
          page-break-inside: auto !important;
        }
        
        tr {
          page-break-inside: avoid !important;
          page-break-after: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const voltarPrincipal = () => {
    navigate('/');
  };

  return (
    <div className="print:bg-white min-h-screen bg-gradient-to-br from-white to-gray-50 py-8 exportable-document">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:p-0 exportable-page">
        <div className="print:hidden flex justify-between items-center mb-8 sticky top-0 z-10 bg-white py-4 border-b">
          <Button variant="outline" onClick={voltarPrincipal} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>
          <ExportButtons />
        </div>

        <div ref={documentRef} className="print:m-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4 print:text-black">
              Análise de Fortalezas e Fragilidades
            </h1>
            <p className="mt-4 text-base text-gray-600 print:text-black">
              Baseado em respostas de {estatisticasGerais.totalEstados} Secretarias Estaduais de Saúde | {estatisticasGerais.totalFortalezas} fortalezas e {estatisticasGerais.totalFragilidades} fragilidades identificadas
            </p>
          </div>

          <Card className="mb-10 shadow-md print:shadow-none print:border-none">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">1. Visão Geral da Regulação do SUS</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-blue-50 print:bg-blue-50 border-none">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-semibold text-blue-600 print:text-black">{estatisticasGerais.totalEstados}</p>
                    <p className="text-sm text-gray-600 print:text-black">Estados participantes</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 print:bg-green-50 border-none">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-semibold text-green-600 print:text-black">{estatisticasGerais.totalFortalezas}</p>
                    <p className="text-sm text-gray-600 print:text-black">Fortalezas identificadas</p>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 print:bg-red-50 border-none">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-semibold text-red-600 print:text-black">{estatisticasGerais.totalFragilidades}</p>
                    <p className="text-sm text-gray-600 print:text-black">Fragilidades identificadas</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-6 h-[250px] print:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosDistribuicao}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosDistribuicao.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#4CAF50' : '#F44336'} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} menções`, 'Quantidade']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Principais constatações:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black">{estatisticasGerais.temasMaisFragilidades}% dos temas aparecem com maior frequência como fragilidades</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black">{estatisticasGerais.temasMaisFortalezas}% dos temas aparecem com maior frequência como fortalezas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black">{estatisticasGerais.temasEquilibrados}% dos temas apresentam equilíbrio entre fortalezas e fragilidades</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-2">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">2. Comparativo por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="h-[500px] print:h-[600px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dadosReais}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" stroke="#888" fontSize={12} />
                    <YAxis 
                      type="category" 
                      dataKey="categoria" 
                      width={150}
                      stroke="#888"
                      fontSize={12}
                      tickLine={false}
                    />
                    <Tooltip formatter={(value) => [`${value} menções`, '']} />
                    <Legend />
                    <Bar 
                      dataKey="fortalezas" 
                      name="Fortalezas" 
                      fill="#4CAF50" 
                      barSize={20} 
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar 
                      dataKey="fragilidades" 
                      name="Fragilidades" 
                      fill="#F44336" 
                      barSize={20} 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="display-print-only mt-6">
                <table className="print-table">
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
                        <td>
                          <div className="flex items-center">
                            <div 
                              className="h-3 mr-2 rounded-sm" 
                              style={{
                                backgroundColor: '#4CAF50',
                                width: `${(item.fortalezas / 20) * 100}%`,
                                maxWidth: '100px',
                                minWidth: '5px'
                              }}
                            ></div>
                            {item.fortalezas}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <div 
                              className="h-3 mr-2 rounded-sm" 
                              style={{
                                backgroundColor: '#F44336',
                                width: `${(item.fragilidades / 20) * 100}%`,
                                maxWidth: '100px',
                                minWidth: '5px'
                              }}
                            ></div>
                            {item.fragilidades}
                          </div>
                        </td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Destaques por categoria:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black"><strong>Sistemas e tecnologia:</strong> categoria mais mencionada, com equilíbrio entre fortalezas ({dadosReais[0].fortalezas}) e fragilidades ({dadosReais[0].fragilidades})</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black"><strong>Protocolos e fluxos:</strong> mais frequentemente citados como fortaleza ({dadosReais[1].fortalezas} menções) do que fragilidade ({dadosReais[1].fragilidades})</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black"><strong>Recursos humanos e Acesso/equidade:</strong> mais frequentemente citados como fragilidades (7 menções cada) do que fortalezas (3 menções cada)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-3">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">3. Análise Detalhada das Fortalezas</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="display-print-only print-section-34">
                <h3 className="font-medium text-xl mb-4 text-green-700 print:text-black">Distribuição por Categoria:</h3>
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>Categoria</th>
                      <th>Menções</th>
                      <th>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosPieFortalezas.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <span className={`category-indicator category-color-fortaleza-${index % 8}`}></span>
                          {item.name}
                        </td>
                        <td>{item.value}</td>
                        <td>{item.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="display-screen-only print:hidden">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2">
                    <h3 className="font-medium text-xl mb-4 text-green-700">Distribuição das Fortalezas</h3>
                    <div className="h-[500px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={dadosPieFortalezas}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis type="number" stroke="#888" fontSize={12} />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            width={120}
                            stroke="#888"
                            fontSize={12}
                            tickLine={false}
                          />
                          <Tooltip 
                            formatter={(value, name, props) => {
                              if (name === "value") {
                                return [`${value} menções (${props.payload.percentage}%)`, 'Quantidade'];
                              }
                              return [value, name];
                            }}
                          />
                          <Bar 
                            dataKey="value" 
                            name="Menções" 
                            fill="#4CAF50" 
                            barSize={25} 
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <h3 className="font-medium text-xl mb-4 text-green-700">Principais fortalezas:</h3>
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="font-medium text-blue-600 mb-1">Sistemas e tecnologia</div>
                        <p className="text-gray-700">Uso do SISREG e outros sistemas de regulação, telemedicina e telessaúde.</p>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="font-medium text-green-600 mb-1">Protocolos e fluxos</div>
                        <p className="text-gray-700">Padronização de processos, classificação de risco e priorização de atendimentos.</p>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="font-medium text-indigo-600 mb-1">Governança e gestão</div>
                        <p className="text-gray-700">Estruturação de complexos reguladores e monitoramento de ações.</p>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="font-medium text-purple-600 mb-1">Integração de níveis</div>
                        <p className="text-gray-700">Articulação entre atenção primária e especializada.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-4">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">4. Análise Detalhada das Fragilidades</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="display-print-only print-section-34">
                <h3 className="font-medium text-xl mb-4 text-red-700 print:text-black">Distribuição por Categoria:</h3>
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>Categoria</th>
                      <th>Menções</th>
                      <th>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosPieFragilidades.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <span className={`category-indicator category-color-fragilidade-${index % 8}`}></span>
                          {item.name}
                        </td>
                        <td>{item.value}</td>
                        <td>{item.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="display-screen-only print:hidden">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2">
                    <h3 className="font-medium text-xl mb-4 text-red-700">Distribuição das Fragilidades</h3>
                    <div className="h-[500px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={dadosPieFragilidades}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis type="number" stroke="#888" fontSize={12} />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            width={120}
                            stroke="#888"
                            fontSize={12}
                            tickLine={false}
                          />
                          <Tooltip 
                            formatter={(value, name, props) => {
                              if (name === "value") {
                                return [`${value} menções (${props.payload.percentage}%)`, 'Quantidade'];
                              }
                              return [value, name];
                            }}
                          />
                          <Bar 
                            dataKey="value" 
                            name="Menções" 
                            fill="#F44336" 
                            barSize={25} 
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <h3 className="font-medium text-xl mb-4 text-red-700">Principais fragilidades:</h3>
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="font-medium text-orange-600 mb-1">Recursos humanos</div>
                        <p className="text-gray-700">Falta de profissionais qualificados e capacitação inadequada.</p>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="font-medium text-red-600 mb-1">Acesso e equidade</div>
                        <p className="text-gray-700">Desigualdades no acesso entre regiões e municípios.</p>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="font-medium text-pink-600 mb-1">Sistemas e tecnologia</div>
                        <p className="text-gray-700">Limitações dos sistemas existentes, falta de interoperabilidade.</p>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="font-medium text-red-800 mb-1">Integração de níveis</div>
                        <p className="text-gray-700">Falta de articulação entre os diferentes níveis de atenção.</p>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="font-medium text-red-500 mb-1">Regionalização</div>
                        <p className="text-gray-700">Dificuldades na implementação da regionalização da saúde.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-5">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">5. Intensidade dos Temas por Estado</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <p className="mb-4 text-gray-600 print:text-black">Média de intensidade (escala 0-3) para os principais temas:</p>
              
              <div className="display-screen-only h-[450px] print:hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dadosIntensidade}
                    margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="tema" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100} 
                      tick={{ fontSize: 12, fontWeight: 500 }}
                      tickMargin={10}
                    />
                    <YAxis 
                      domain={[0, 3]} 
                      label={{ 
                        value: 'Intensidade média', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fontSize: 13, fontWeight: 500 }
                      }} 
                      tickCount={7}
                    />
                    <Tooltip 
                      formatter={(value) => {
                        if (typeof value === 'number') {
                          return [`${value.toFixed(1)}`, 'Intensidade'];
                        }
                        return [value, 'Intensidade'];
                      }}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '10px'
                      }}
                      labelStyle={{
                        fontWeight: 'bold',
                        marginBottom: '5px'
                      }}
                    />
                    <Legend 
                      verticalAlign="top" 
                      align="center"
                      wrapperStyle={{ paddingBottom: '20px' }}
                    />
                    <Bar 
                      dataKey="intensidadeFortalezas" 
                      name="Fortalezas" 
                      fill="#4CAF50" 
                      radius={[4, 4, 0, 0]}
                      barSize={35}
                    />
                    <Bar 
                      dataKey="intensidadeFragilidades" 
                      name="Fragilidades" 
                      fill="#F44336" 
                      radius={[4, 4, 0, 0]}
                      barSize={35}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="display-print-only print-section-34">
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>Tema</th>
                      <th>Fortalezas</th>
                      <th>Fragilidades</th>
                      <th>Diferença</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosIntensidade
                      .sort((a, b) => b.intensidadeFortalezas - a.intensidadeFortalezas)
                      .map((item, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{item.tema}</strong>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <div 
                              className="h-3 mr-2 rounded-sm" 
                              style={{
                                backgroundColor: '#4CAF50',
                                width: `${(item.intensidadeFortalezas / 3) * 100}%`,
                                maxWidth: '100px',
                                minWidth: '5px'
                              }}
                            ></div>
                            {item.intensidadeFortalezas.toFixed(1)}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <div 
                              className="h-3 mr-2 rounded-sm" 
                              style={{
                                backgroundColor: '#F44336',
                                width: `${(item.intensidadeFragilidades / 3) * 100}%`,
                                maxWidth: '100px',
                                minWidth: '5px'
                              }}
                            ></div>
                            {item.intensidadeFragilidades.toFixed(1)}
                          </div>
                        </td>
                        <td className={item.diferenca > 0 ? 'text-green-700' : item.diferenca < 0 ? 'text-red-700' : 'text-gray-700'}>
                          {item.diferenca > 0 ? '+' : ''}{item.diferenca.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Insights sobre intensidade:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black"><strong>Sistemas e tecnologia:</strong> apresenta a maior intensidade tanto em fortalezas (1.8) quanto em fragilidades (1.5)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black"><strong>Protocolos e fluxos:</strong> segunda maior intensidade em fortalezas (1.2), indicando área de bom desenvolvimento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black"><strong>Regionalização:</strong> apresenta diferença negativa significativa (-0.6), indicando área de maior preocupação</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black"><strong>Recursos humanos:</strong> mostra intensidade maior em fragilidades (0.9) do que em fortalezas (0.4), sugerindo área para melhoria</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-6">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">6. Termos mais frequentes em Fortalezas</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <p className="mb-4 text-gray-600 print:text-black">Principais termos mencionados nas fortalezas por frequência:</p>
              
              <div className="display-screen-only h-[400px] print:hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={termosFrequentesFortalezas}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="termo" 
                      type="category" 
                      width={120}
                      tick={{ fill: '#4CAF50' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} menções`, 'Frequência']}
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '8px' 
                      }}
                    />
                    <Bar 
                      dataKey="frequencia" 
                      fill="#4CAF50" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="display-print-only">
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>Termo</th>
                      <th>Frequência</th>
                      <th>Visualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {termosFrequentesFortalezas.map((item, index) => (
                      <tr key={index}>
                        <td><strong>{item.termo}</strong></td>
                        <td>{item.frequencia}</td>
                        <td>
                          <div className="flex items-center">
                            <div 
                              className="h-3 mr-2 rounded-sm" 
                              style={{
                                backgroundColor: '#4CAF50',
                                width: `${(item.frequencia / 20) * 100}%`,
                                maxWidth: '150px',
                                minWidth: '5px'
                              }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Insights sobre termos frequentes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">O termo "<strong>sistema</strong>" é o mais frequente (18 menções), seguido por "<strong>regulação</strong>" (15) e "<strong>SISREG</strong>" (11)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">Termos relacionados à tecnologia como "<strong>teleconsulta</strong>" e "<strong>telessaúde</strong>" aparecem com frequência significativa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-teal-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">A menção a "<strong>protocolos</strong>" e "<strong>classificação de risco</strong>" indica foco em processos organizados</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-7">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">7. Termos mais frequentes em Fragilidades</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <p className="mb-4 text-gray-600 print:text-black">Principais termos mencionados nas fragilidades por frequência:</p>
              
              <div className="display-screen-only h-[400px] print:hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={termosFrequentesFragilidades}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="termo" 
                      type="category" 
                      width={120}
                      tick={{ fill: '#F44336' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} menções`, 'Frequência']}
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '8px' 
                      }}
                    />
                    <Bar 
                      dataKey="frequencia" 
                      fill="#F44336" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="display-print-only">
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>Termo</th>
                      <th>Frequência</th>
                      <th>Visualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {termosFrequentesFragilidades.map((item, index) => (
                      <tr key={index}>
                        <td><strong>{item.termo}</strong></td>
                        <td>{item.frequencia}</td>
                        <td>
                          <div className="flex items-center">
                            <div 
                              className="h-3 mr-2 rounded-sm" 
                              style={{
                                backgroundColor: '#F44336',
                                width: `${(item.frequencia / 15) * 100}%`,
                                maxWidth: '150px',
                                minWidth: '5px'
                              }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Insights sobre termos frequentes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">Os termos "<strong>falta</strong>" (14) e "<strong>ausência</strong>" (12) são os mais frequentes, indicando deficiências percebidas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">O termo "<strong>sistema</strong>" (11) também é frequente nas fragilidades, revelando desafios tecnológicos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">"<strong>Dificuldade</strong>" (8) e problemas de "<strong>interoperabilidade</strong>" (6) são obstáculos significativos</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-8">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">8. Termos compartilhados entre Fortalezas e Fragilidades</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <p className="mb-4 text-gray-600 print:text-black">Termos mencionados tanto nas fortalezas quanto nas fragilidades:</p>
              
              <div className="display-screen-only h-[400px] print:hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={termosCompartilhados}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="termo" 
                      type="category" 
                      width={120}
                      tick={{ fill: '#6B7280' }}
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        return [`${value} menções`, name === 'freqFortalezas' ? 'Fortalezas' : 'Fragilidades'];
                      }}
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '8px' 
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="freqFortalezas" 
                      name="Fortalezas" 
                      fill="#4CAF50" 
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar 
                      dataKey="freqFragilidades" 
                      name="Fragilidades" 
                      fill="#F44336" 
                      radius={[0, 0, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="display-print-only">
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>Termo</th>
                      <th>Fortalezas</th>
                      <th>Fragilidades</th>
                      <th>Diferença</th>
                    </tr>
                  </thead>
                  <tbody>
                    {termosCompartilhados.map((item, index) => (
                      <tr key={index}>
                        <td><strong>{item.termo}</strong></td>
                        <td>
                          <div className="flex items-center">
                            <div 
                              className="h-3 mr-2 rounded-sm" 
                              style={{
                                backgroundColor: '#4CAF50',
                                width: `${(item.freqFortalezas / 20) * 100}%`,
                                maxWidth: '70px',
                                minWidth: '5px'
                              }}
                            ></div>
                            {item.freqFortalezas}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <div 
                              className="h-3 mr-2 rounded-sm" 
                              style={{
                                backgroundColor: '#F44336',
                                width: `${(item.freqFragilidades / 15) * 100}%`,
                                maxWidth: '70px',
                                minWidth: '5px'
                              }}
                            ></div>
                            {item.freqFragilidades}
                          </div>
                        </td>
                        <td className={item.diferenca > 0 ? 'text-green-700' : item.diferenca < 0 ? 'text-red-700' : 'text-gray-700'}>
                          {item.diferenca > 0 ? '+' : ''}{item.diferenca}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Insights sobre termos compartilhados:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">"<strong>SISREG</strong>" tem a maior diferença positiva (+8), indicando que é visto predominantemente como fortaleza</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">"<strong>Sistema</strong>" e "<strong>regulação</strong>" aparecem com alta frequência tanto em fortalezas quanto em fragilidades</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">"<strong>Equipe</strong>" e "<strong>especialidades</strong>" têm diferença negativa (-2), sendo mais frequentemente citados como fragilidades</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-gray-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="print:text-black">"<strong>Municípios</strong>" tem frequência igual (9) em fortalezas e fragilidades, sugerindo perspectivas mistas</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-9">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">9. Sugestões para Melhoria da Regulação no SUS</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <p className="mb-4 text-gray-600 print:text-black">Com base na análise das fortalezas e fragilidades:</p>
              
              <ul className="space-y-4">
                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:shadow-none print:border-black print:border-t">
                  <div className="font-medium text-teal-700 mb-1 print:text-black print:font-bold">Sistemas de informação e tecnologia</div>
                  <p className="text-gray-700 print:text-black">
                    Investir em tecnologias mais integradas e interoperáveis, modernizando sistemas existentes como o SISREG. 
                    Expandir o uso de telemedicina e telessaúde para ampliar o acesso nas regiões remotas.
                  </p>
                </li>
                
                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:shadow-none print:border-black print:border-t">
                  <div className="font-medium text-teal-700 mb-1 print:text-black print:font-bold">Protocolos e processos</div>
                  <p className="text-gray-700 print:text-black">
                    Padronizar nacionalmente protocolos de regulação e classificação de risco, 
                    construindo diretrizes que possam ser adaptadas às realidades locais.
                  </p>
                </li>
                
                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:shadow-none print:border-black print:border-t">
                  <div className="font-medium text-teal-700 mb-1 print:text-black print:font-bold">Recursos humanos</div>
                  <p className="text-gray-700 print:text-black">
                    Desenvolver programas de capacitação continuada e estabelecer carreiras específicas 
                    para profissionais de regulação, principalmente médicos reguladores.
                  </p>
                </li>
                
                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:shadow-none print:border-black print:border-t">
                  <div className="font-medium text-teal-700 mb-1 print:text-black print:font-bold">Integração entre níveis de atenção</div>
                  <p className="text-gray-700 print:text-black">
                    Fortalecer a comunicação entre a atenção primária e especializada, 
                    usando sistemas como referência e contrarreferência eletrônicas.
                  </p>
                </li>
                
                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:shadow-none print:border-black print:border-t">
                  <div className="font-medium text-teal-700 mb-1 print:text-black print:font-bold">Regionalização</div>
                  <p className="text-gray-700 print:text-black">
                    Fortalecer os processos de regionalização, garantindo que os municípios-polo 
                    cumpram seu papel assistencial conforme planejado nos PDRs.
                  </p>
                </li>
                
                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:shadow-none print:border-black print:border-t">
                  <div className="font-medium text-teal-700 mb-1 print:text-black print:font-bold">Política integrada</div>
                  <p className="text-gray-700 print:text-black">
                    Desenvolver uma política nacional de regulação integrada, com diretrizes claras 
                    e incentivos para implementação em todos os níveis.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="text-center mb-8 mt-12 text-sm text-gray-500 print:text-black">
            <p>Relatório gerado em {new Date().toLocaleDateString()}</p>
            <p>Análise de Fortalezas e Fragilidades</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportableView;
