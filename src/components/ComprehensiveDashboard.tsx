
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import ExportButtons from './ExportButtons';
import { 
  dadosReais, 
  dadosIntensidade, 
  termosFrequentesFortalezas, 
  termosFrequentesFragilidades, 
  termosCompartilhados,
  estatisticasGerais,
  dadosDistribuicaoPie
} from '@/data/regulacaoData';

// Cores para os gráficos
const COLORS_FORTALEZAS = ['#0088FE', '#4CAF50', '#81C784'];
const COLORS_FRAGILIDADES = ['#FF8042', '#F44336', '#E57373'];
const COLORS_PIE = ['#4CAF50', '#F44336']; // Verde e Vermelho

const ComprehensiveDashboard = () => {
  // Preparar dados para o gráfico de pizza
  const dadosPieFortalezas = dadosReais
    .filter(item => item.fortalezas > 0)
    .map(item => ({
      name: item.categoria,
      value: item.fortalezas
    }));
  
  const dadosPieFragilidades = dadosReais
    .filter(item => item.fragilidades > 0)
    .map(item => ({
      name: item.categoria,
      value: item.fragilidades
    }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-8 space-y-8">
      <div className="flex justify-end mb-4">
        <ExportButtons />
      </div>
      
      <Card className="border shadow-sm mb-6 overflow-hidden">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-center text-2xl font-light">
            Análise de Fortalezas e Fragilidades na Regulação do SUS
          </CardTitle>
          <p className="text-center mt-2 text-gray-600 text-sm">
            Baseado nas respostas de {estatisticasGerais.totalEstados} Secretarias Estaduais de Saúde | {estatisticasGerais.totalFortalezas} fortalezas e {estatisticasGerais.totalFragilidades} fragilidades identificadas
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-none shadow-sm">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-blue-600">{estatisticasGerais.totalEstados}</p>
                <p className="text-sm text-gray-600">Estados participantes</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-none shadow-sm">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-green-600">{estatisticasGerais.totalFortalezas}</p>
                <p className="text-sm text-gray-600">Fortalezas identificadas</p>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-none shadow-sm">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-red-600">{estatisticasGerais.totalFragilidades}</p>
                <p className="text-sm text-gray-600">Fragilidades identificadas</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Distribuição Geral Pie Chart */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">1. Distribuição Geral</h2>
            <div className="h-[250px] md:w-2/3 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosDistribuicaoPie}
                    cx="50%" 
                    cy="50%"
                    labelLine={true}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosDistribuicaoPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Comparativo por Categoria */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">2. Comparativo por Categoria</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dadosReais}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 140, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#888" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="categoria" 
                    width={130}
                    stroke="#888"
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip />
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
            
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-3">Destaques da análise:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                  <span>
                    <span className="font-medium">Sistemas de informação e tecnologia</span>: 
                    <span className="text-gray-700"> aparece tanto como fortaleza ({dadosReais[0].fortalezas} menções) quanto fragilidade ({dadosReais[0].fragilidades} menções).</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                  <span>
                    <span className="font-medium">Protocolos e fluxos</span>: 
                    <span className="text-gray-700"> mais frequentemente citado como fortaleza ({dadosReais[1].fortalezas} menções) do que fragilidade ({dadosReais[1].fragilidades} menções).</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                  <span>
                    <span className="font-medium">Recursos humanos</span> e <span className="font-medium">Acesso e equidade</span>: 
                    <span className="text-gray-700"> mais frequentemente citados como fragilidades (7 menções cada) do que fortalezas (3 menções cada).</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                  <span>
                    <span className="font-medium">Regionalização</span> e <span className="font-medium">Financiamento</span>: 
                    <span className="text-gray-700"> aparecem quase exclusivamente como fragilidades (4 e 1 menções respectivamente).</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Fortalezas por Categoria */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">3. Fortalezas por Categoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosPieFortalezas}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosPieFortalezas.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS_FORTALEZAS[index % COLORS_FORTALEZAS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Principais fortalezas:</h3>
                <ul className="space-y-2">
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="font-medium text-blue-600 mb-1">Sistemas e tecnologia</div>
                    <p className="text-gray-700 text-sm">Uso do SISREG e outros sistemas de regulação, telemedicina e telessaúde.</p>
                  </li>
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="font-medium text-green-600 mb-1">Protocolos e fluxos</div>
                    <p className="text-gray-700 text-sm">Padronização de processos, classificação de risco e priorização de atendimentos.</p>
                  </li>
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="font-medium text-indigo-600 mb-1">Governança e gestão</div>
                    <p className="text-gray-700 text-sm">Estruturação de complexos reguladores e monitoramento de ações.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Fragilidades por Categoria */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">4. Fragilidades por Categoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosPieFragilidades}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosPieFragilidades.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS_FRAGILIDADES[index % COLORS_FRAGILIDADES.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Principais fragilidades:</h3>
                <ul className="space-y-2">
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="font-medium text-red-600 mb-1">Recursos humanos</div>
                    <p className="text-gray-700 text-sm">Falta de profissionais qualificados e capacitação inadequada.</p>
                  </li>
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="font-medium text-orange-600 mb-1">Acesso e equidade</div>
                    <p className="text-gray-700 text-sm">Desigualdades no acesso entre regiões e municípios.</p>
                  </li>
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="font-medium text-pink-600 mb-1">Sistemas e tecnologia</div>
                    <p className="text-gray-700 text-sm">Limitações dos sistemas existentes, falta de interoperabilidade.</p>
                  </li>
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="font-medium text-red-800 mb-1">Regionalização</div>
                    <p className="text-gray-700 text-sm">Dificuldades na implementação da regionalização da saúde.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Intensidade por Categoria */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">5. Intensidade por Categoria</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-4 py-2 text-left">Tema</th>
                    <th className="border px-4 py-2 text-left">Intensidade Fortalezas</th>
                    <th className="border px-4 py-2 text-left">Intensidade Fragilidades</th>
                    <th className="border px-4 py-2 text-left">Diferença</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosIntensidade
                    .sort((a, b) => b.intensidadeFortalezas - a.intensidadeFortalezas)
                    .map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border px-4 py-2">{item.tema}</td>
                        <td className="border px-4 py-2">{item.intensidadeFortalezas.toFixed(1)}</td>
                        <td className="border px-4 py-2">{item.intensidadeFragilidades.toFixed(1)}</td>
                        <td className={`border px-4 py-2 ${item.diferenca > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.diferenca.toFixed(1)}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <em>A intensidade é calculada como a média ponderada da frequência de menções pelo número de estados participantes.</em>
            </p>
          </div>
          
          {/* Termos mais Frequentes */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">6. Termos mais Frequentes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="font-medium text-lg mb-3 text-green-700">Em Fortalezas:</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={termosFrequentesFortalezas}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" stroke="#888" fontSize={12} />
                      <YAxis 
                        type="category" 
                        dataKey="termo" 
                        width={75}
                        stroke="#888"
                        fontSize={12}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Bar 
                        dataKey="frequencia" 
                        name="Frequência" 
                        fill="#4CAF50" 
                        barSize={16} 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3 text-red-700">Em Fragilidades:</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={termosFrequentesFragilidades}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" stroke="#888" fontSize={12} />
                      <YAxis 
                        type="category" 
                        dataKey="termo" 
                        width={75}
                        stroke="#888"
                        fontSize={12}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Bar 
                        dataKey="frequencia" 
                        name="Frequência" 
                        fill="#F44336" 
                        barSize={16} 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3 text-purple-700">Termos compartilhados entre Fortalezas e Fragilidades</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={termosCompartilhados}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="termo" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="freqFortalezas" 
                      name="Fortalezas" 
                      fill="#4CAF50" 
                      barSize={20} 
                    />
                    <Bar 
                      dataKey="freqFragilidades" 
                      name="Fragilidades" 
                      fill="#F44336" 
                      barSize={20} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Recomendações */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">7. Recomendações para Melhoria da Regulação no SUS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-base mb-2 text-blue-700">Sistemas de informação e tecnologia</h3>
                <p className="text-gray-700 text-sm">Investir em tecnologias mais integradas e interoperáveis, modernizando sistemas existentes como o SISREG. Expandir o uso de telemedicina e telessaúde.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-base mb-2 text-green-700">Protocolos e processos</h3>
                <p className="text-gray-700 text-sm">Padronizar nacionalmente protocolos de regulação e classificação de risco, construindo diretrizes adaptáveis às realidades locais.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-base mb-2 text-red-700">Recursos humanos</h3>
                <p className="text-gray-700 text-sm">Desenvolver programas de capacitação continuada e estabelecer carreiras específicas para profissionais de regulação.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-base mb-2 text-purple-700">Integração entre níveis</h3>
                <p className="text-gray-700 text-sm">Fortalecer a comunicação entre a atenção primária e especializada, usando sistemas como referência e contrarreferência eletrônicas.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-base mb-2 text-orange-700">Regionalização</h3>
                <p className="text-gray-700 text-sm">Fortalecer os processos de regionalização, garantindo que os municípios-polo cumpram seu papel assistencial conforme planejado nos PDRs.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-base mb-2 text-indigo-700">Política integrada</h3>
                <p className="text-gray-700 text-sm">Desenvolver uma política nacional de regulação integrada, com diretrizes claras e incentivos para implementação em todos os níveis.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500">
        <p>Documento baseado na análise de respostas de 12 Secretarias Estaduais de Saúde.</p>
        <p>Data da geração: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;
