
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Cores para os gráficos
const COLORS_FORTALEZAS = ['#0088FE', '#4CAF50', '#81C784'];
const COLORS_FRAGILIDADES = ['#FF8042', '#F44336', '#E57373'];

// Dados reais baseados nas informações fornecidas
const dadosReais = [
  { categoria: 'Sistemas e tecnologia', fortalezas: 13, fragilidades: 12, total: 25 },
  { categoria: 'Protocolos e fluxos', fortalezas: 8, fragilidades: 5, total: 13 },
  { categoria: 'Governança e gestão', fortalezas: 6, fragilidades: 5, total: 11 },
  { categoria: 'Integração de níveis', fortalezas: 4, fragilidades: 5, total: 9 },
  { categoria: 'Recursos humanos', fortalezas: 3, fragilidades: 7, total: 10 },
  { categoria: 'Acesso e equidade', fortalezas: 3, fragilidades: 7, total: 10 },
  { categoria: 'Regionalização', fortalezas: 0, fragilidades: 4, total: 4 },
  { categoria: 'Financiamento', fortalezas: 0, fragilidades: 1, total: 1 },
  { categoria: 'Outros', fortalezas: 8, fragilidades: 17, total: 25 },
];

// Termos mais frequentes
const termosFrequentesFortalezas = [
  { termo: 'sistema', frequencia: 18 },
  { termo: 'regulação', frequencia: 15 },
  { termo: 'SISREG', frequencia: 11 },
  { termo: 'municípios', frequencia: 9 },
  { termo: 'acesso', frequencia: 8 },
  { termo: 'teleconsulta', frequencia: 7 },
  { termo: 'protocolos', frequencia: 6 },
  { termo: 'risco', frequencia: 6 },
  { termo: 'telessaúde', frequencia: 5 },
  { termo: 'classificação', frequencia: 5 },
];

const termosFrequentesFragilidades = [
  { termo: 'falta', frequencia: 14 },
  { termo: 'ausência', frequencia: 12 },
  { termo: 'sistema', frequencia: 11 },
  { termo: 'regulação', frequencia: 10 },
  { termo: 'municípios', frequencia: 9 },
  { termo: 'dificuldade', frequencia: 8 },
  { termo: 'acesso', frequencia: 7 },
  { termo: 'interoperabilidade', frequencia: 6 },
  { termo: 'recursos humanos', frequencia: 6 },
  { termo: 'protocolos', frequencia: 5 },
];

// Dados de intensidade
const dadosIntensidade = [
  { tema: 'Sistemas e tecnologia', intensidadeFortalezas: 1.8, intensidadeFragilidades: 1.5, diferenca: 0.3 },
  { tema: 'Protocolos e fluxos', intensidadeFortalezas: 1.2, intensidadeFragilidades: 0.7, diferenca: 0.5 },
  { tema: 'Recursos humanos', intensidadeFortalezas: 0.4, intensidadeFragilidades: 0.9, diferenca: -0.5 },
  { tema: 'Governança e gestão', intensidadeFortalezas: 0.8, intensidadeFragilidades: 0.7, diferenca: 0.1 },
  { tema: 'Acesso e equidade', intensidadeFortalezas: 0.5, intensidadeFragilidades: 0.9, diferenca: -0.4 },
  { tema: 'Regionalização', intensidadeFortalezas: 0.0, intensidadeFragilidades: 0.6, diferenca: -0.6 },
  { tema: 'Integração de níveis', intensidadeFortalezas: 0.6, intensidadeFragilidades: 0.7, diferenca: -0.1 },
  { tema: 'Financiamento', intensidadeFortalezas: 0.0, intensidadeFragilidades: 0.1, diferenca: -0.1 },
];

// Estatísticas gerais
const estatisticasGerais = {
  totalEstados: 12,
  totalFortalezas: 45,
  totalFragilidades: 63,
  temasMaisFortalezas: 38, // %
  temasMaisFragilidades: 52, // %
  temasEquilibrados: 10, // %
};

const ExportableView = () => {
  const navigate = useNavigate();
  
  const handlePrint = () => {
    window.print();
  };
  
  // Função para exportar dados como PDF usando janela de impressão com CSS específico
  const exportarPDF = () => {
    window.print();
  };
  
  // Voltar para a página principal
  const voltarPrincipal = () => {
    navigate('/');
  };

  return (
    <div className="print:bg-white min-h-screen bg-gradient-to-br from-white to-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho não imprimível com botões de ação */}
        <div className="print:hidden flex justify-between items-center mb-8">
          <Button variant="outline" onClick={voltarPrincipal}>
            Voltar ao Dashboard
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="default" onClick={exportarPDF}>
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Cabeçalho do documento */}
        <div className="text-center mb-12 page-break-before">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Regulação <span className="text-blue-600">SUS</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-500">
            Análise de Fortalezas e Fragilidades
          </p>
          <p className="mt-4 text-base text-gray-600">
            Baseado em respostas de {estatisticasGerais.totalEstados} Secretarias Estaduais de Saúde | {estatisticasGerais.totalFortalezas} fortalezas e {estatisticasGerais.totalFragilidades} fragilidades identificadas
          </p>
        </div>

        {/* Seção 1: Visão Geral */}
        <Card className="mb-10 shadow-md print:shadow-none">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
            <CardTitle className="text-2xl">1. Visão Geral da Regulação do SUS</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-blue-50 print:bg-blue-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-semibold text-blue-600">{estatisticasGerais.totalEstados}</p>
                  <p className="text-sm text-gray-600">Estados participantes</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 print:bg-green-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-semibold text-green-600">{estatisticasGerais.totalFortalezas}</p>
                  <p className="text-sm text-gray-600">Fortalezas identificadas</p>
                </CardContent>
              </Card>
              <Card className="bg-red-50 print:bg-red-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-semibold text-red-600">{estatisticasGerais.totalFragilidades}</p>
                  <p className="text-sm text-gray-600">Fragilidades identificadas</p>
                </CardContent>
              </Card>
            </div>
            <div className="bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
              <h3 className="font-medium text-xl mb-4 text-gray-800">Principais constatações:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                  <span>{estatisticasGerais.temasMaisFragilidades}% dos temas aparecem com maior frequência como fragilidades</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                  <span>{estatisticasGerais.temasMaisFortalezas}% dos temas aparecem com maior frequência como fortalezas</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-gray-500 rounded-full mt-2 mr-2"></span>
                  <span>{estatisticasGerais.temasEquilibrados}% dos temas apresentam equilíbrio entre fortalezas e fragilidades</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Seção 2: Comparativo por Categoria */}
        <Card className="mb-10 shadow-md print:shadow-none page-break-before">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
            <CardTitle className="text-2xl">2. Comparativo por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[500px] print:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dadosReais}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#888" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="categoria" 
                    width={110}
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
            <div className="mt-8 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
              <h3 className="font-medium text-xl mb-4 text-gray-800">Destaques por categoria:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                  <span><strong>Sistemas e tecnologia:</strong> categoria mais mencionada, com equilíbrio entre fortalezas ({dadosReais[0].fortalezas}) e fragilidades ({dadosReais[0].fragilidades})</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                  <span><strong>Protocolos e fluxos:</strong> mais frequentemente citados como fortaleza ({dadosReais[1].fortalezas} menções) do que fragilidade ({dadosReais[1].fragilidades})</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                  <span><strong>Recursos humanos e Acesso/equidade:</strong> mais frequentemente citados como fragilidades (7 menções cada) do que fortalezas (3 menções cada)</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Seção 3: Intensidade dos Temas */}
        <Card className="mb-10 shadow-md print:shadow-none page-break-before">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
            <CardTitle className="text-2xl">3. Intensidade dos Temas por Estado</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4 text-gray-600">Média de intensidade (escala 0-3) para os principais temas:</p>
            <div className="h-[400px] print:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dadosIntensidade}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tema" angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 3]} label={{ value: 'Intensidade média', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="intensidadeFortalezas" name="Fortalezas" fill="#4CAF50" />
                  <Bar dataKey="intensidadeFragilidades" name="Fragilidades" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
              <h3 className="font-medium text-xl mb-4 text-gray-800">Principais diferenças de intensidade:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                  <span><strong>Protocolos e fluxos:</strong> maior diferença positiva (+0.5), indicando maior efetividade como fortaleza</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                  <span><strong>Regionalização:</strong> maior diferença negativa (-0.6), sendo percebida principalmente como fragilidade</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Seção 4: Análise de Termos */}
        <Card className="mb-10 shadow-md print:shadow-none page-break-before">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
            <CardTitle className="text-2xl">4. Análise dos Termos mais Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-medium text-xl mb-4 text-green-700">Fortalezas</h3>
                <div className="h-[300px] print:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={termosFrequentesFortalezas}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" stroke="#888" fontSize={12} />
                      <YAxis 
                        type="category" 
                        dataKey="termo" 
                        width={90}
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
                <h3 className="font-medium text-xl mb-4 text-red-700">Fragilidades</h3>
                <div className="h-[300px] print:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={termosFrequentesFragilidades}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" stroke="#888" fontSize={12} />
                      <YAxis 
                        type="category" 
                        dataKey="termo" 
                        width={90}
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
            
            <div className="bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
              <h3 className="font-medium text-xl mb-4 text-gray-800">Insights sobre a terminologia:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                  <span>Termos como "sistema" e "regulação" são frequentes tanto em fortalezas quanto fragilidades, indicando sua centralidade nos desafios regulatórios</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                  <span>Termos negativos como "falta" e "ausência" dominam o vocabulário das fragilidades, sinalizando carências estruturais</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                  <span>"SISREG", "teleconsulta" e "telessaúde" aparecem predominantemente como fortalezas, demonstrando o impacto positivo das soluções tecnológicas</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Seção 5: Recomendações */}
        <Card className="mb-10 shadow-md print:shadow-none page-break-before">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 print:bg-white border-b">
            <CardTitle className="text-2xl">5. Recomendações para Melhoria da Regulação no SUS</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none">
                <h3 className="font-medium text-lg mb-3 text-blue-700">Sistemas de informação</h3>
                <p className="text-gray-700">Investir em tecnologias mais integradas e interoperáveis, modernizando sistemas existentes como o SISREG. Expandir o uso de telemedicina e telessaúde.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none">
                <h3 className="font-medium text-lg mb-3 text-green-700">Protocolos e processos</h3>
                <p className="text-gray-700">Padronizar nacionalmente protocolos de regulação e classificação de risco, construindo diretrizes adaptáveis às realidades locais.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none">
                <h3 className="font-medium text-lg mb-3 text-red-700">Recursos humanos</h3>
                <p className="text-gray-700">Desenvolver programas de capacitação continuada e estabelecer carreiras específicas para profissionais de regulação.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none">
                <h3 className="font-medium text-lg mb-3 text-purple-700">Integração entre níveis</h3>
                <p className="text-gray-700">Fortalecer a comunicação entre a atenção primária e especializada, usando sistemas de referência e contrarreferência eletrônicas.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none">
                <h3 className="font-medium text-lg mb-3 text-orange-700">Regionalização</h3>
                <p className="text-gray-700">Fortalecer os processos de regionalização, garantindo que os municípios-polo cumpram seu papel assistencial conforme os PDRs.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none">
                <h3 className="font-medium text-lg mb-3 text-indigo-700">Política nacional</h3>
                <p className="text-gray-700">Desenvolver uma política nacional de regulação integrada, com diretrizes claras e incentivos para implementação.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rodapé */}
        <div className="text-center mt-8 mb-12 text-gray-500 text-sm">
          <p>Regulação SUS - Análise de Fortalezas e Fragilidades</p>
          <p>Documento gerado em {new Date().toLocaleDateString()}</p>
        </div>
        
        {/* Estilos específicos para impressão */}
        <style jsx="true">{`
          @media print {
            body {
              font-size: 12pt;
              color: #000;
              background-color: #fff;
            }
            
            .page-break-before {
              page-break-before: always;
            }
            
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            
            .print\\:bg-white {
              background-color: white !important;
            }
            
            .print\\:bg-gray-100 {
              background-color: #f8f9fa !important;
            }
            
            .print\\:hidden {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ExportableView;
