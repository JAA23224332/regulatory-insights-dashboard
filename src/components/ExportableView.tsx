
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Cores para os gráficos com melhor contraste para impressão
const COLORS_FORTALEZAS = ['#0062cc', '#00994c', '#57bc6c', '#81C784', '#A5D6A7'];
const COLORS_FRAGILIDADES = ['#cc4125', '#d32f2f', '#e35353', '#EF5350', '#E57373'];

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

// Dados compartilhados entre fortalezas e fragilidades
const termosCompartilhados = [
  { termo: 'sistema', freqFortalezas: 18, freqFragilidades: 11, diferenca: 7 },
  { termo: 'regulação', freqFortalezas: 15, freqFragilidades: 10, diferenca: 5 },
  { termo: 'municípios', freqFortalezas: 9, freqFragilidades: 9, diferenca: 0 },
  { termo: 'acesso', freqFortalezas: 8, freqFragilidades: 7, diferenca: 1 },
  { termo: 'protocolos', freqFortalezas: 6, freqFragilidades: 5, diferenca: 1 },
  { termo: 'SISREG', freqFortalezas: 11, freqFragilidades: 3, diferenca: 8 },
  { termo: 'equipe', freqFortalezas: 4, freqFragilidades: 6, diferenca: -2 },
  { termo: 'especialidades', freqFortalezas: 4, freqFragilidades: 6, diferenca: -2 },
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

// Dados para o gráfico de distribuição
const dadosDistribuicao = [
  { name: 'Fortalezas', value: estatisticasGerais.totalFortalezas },
  { name: 'Fragilidades', value: estatisticasGerais.totalFragilidades },
];

// Preparar dados para o gráfico de pizza com porcentagens
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

const ExportableView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const documentRef = useRef(null);
  
  const handlePrint = () => {
    window.print();
    toast({
      title: "Impressão iniciada",
      description: "O documento está sendo enviado para impressão",
    });
  };
  
  // Função para exportar dados como PDF usando janela de impressão com CSS específico
  const exportarPDF = () => {
    window.print();
    toast({
      title: "Exportação de PDF iniciada",
      description: "Use a opção 'Salvar como PDF' na janela de impressão",
    });
  };
  
  // Voltar para a página principal
  const voltarPrincipal = () => {
    navigate('/');
  };

  // Custom label for pie charts that includes percentage
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#333" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name}: ${percentage}%`}
      </text>
    );
  };

  return (
    <div className="print:bg-white min-h-screen bg-gradient-to-br from-white to-gray-50 py-8 exportable-document">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:p-0 exportable-page">
        {/* Cabeçalho não imprimível com botões de ação */}
        <div className="print:hidden flex justify-between items-center mb-8 sticky top-0 z-10 bg-white py-4 border-b">
          <Button variant="outline" onClick={voltarPrincipal} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="default" onClick={exportarPDF} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Conteúdo do documento para impressão */}
        <div ref={documentRef} className="print:m-0">
          {/* Cabeçalho do documento */}
          <div className="text-center mb-12">
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
              
              {/* Gráfico de distribuição */}
              <div className="mb-6 h-[250px] print:h-[200px]">
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

          {/* Seção 2: Comparativo por Categoria */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none page-break-before">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">2. Comparativo por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
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

          {/* Seção 3: Fortalezas (Nova seção mais detalhada) */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none page-break-before">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">3. Análise Detalhada das Fortalezas</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[400px] print:h-[350px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dadosPieFortalezas}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={renderCustomLabel}
                        outerRadius={130}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dadosPieFortalezas.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS_FORTALEZAS[index % COLORS_FORTALEZAS.length]} 
                            strokeWidth={1}
                            stroke="#fff"
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => {
                          if (name === "value") {
                            return [`${value} menções (${props.payload.percentage}%)`, 'Quantidade'];
                          }
                          return [value, name];
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-xl mb-4 text-green-700 print:text-black">Principais fortalezas:</h3>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-blue-600 print:text-black mb-1">Sistemas e tecnologia</div>
                      <p className="text-gray-700 print:text-black">Uso do SISREG e outros sistemas de regulação, telemedicina e telessaúde.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-green-600 print:text-black mb-1">Protocolos e fluxos</div>
                      <p className="text-gray-700 print:text-black">Padronização de processos, classificação de risco e priorização de atendimentos.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-indigo-600 print:text-black mb-1">Governança e gestão</div>
                      <p className="text-gray-700 print:text-black">Estruturação de complexos reguladores e monitoramento de ações.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-purple-600 print:text-black mb-1">Integração de níveis</div>
                      <p className="text-gray-700 print:text-black">Articulação entre atenção primária e especializada.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 4: Fragilidades (Nova seção mais detalhada) */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none page-break-before">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">4. Análise Detalhada das Fragilidades</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[400px] print:h-[350px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dadosPieFragilidades}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={renderCustomLabel}
                        outerRadius={130}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dadosPieFragilidades.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS_FRAGILIDADES[index % COLORS_FRAGILIDADES.length]} 
                            strokeWidth={1}
                            stroke="#fff"
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => {
                          if (name === "value") {
                            return [`${value} menções (${props.payload.percentage}%)`, 'Quantidade'];
                          }
                          return [value, name];
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-xl mb-4 text-red-700 print:text-black">Principais fragilidades:</h3>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-orange-600 print:text-black mb-1">Recursos humanos</div>
                      <p className="text-gray-700 print:text-black">Falta de profissionais qualificados e capacitação inadequada.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-red-600 print:text-black mb-1">Acesso e equidade</div>
                      <p className="text-gray-700 print:text-black">Desigualdades no acesso entre regiões e municípios.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-pink-600 print:text-black mb-1">Sistemas e tecnologia</div>
                      <p className="text-gray-700 print:text-black">Limitações dos sistemas existentes, falta de interoperabilidade.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-red-800 print:text-black mb-1">Integração de níveis</div>
                      <p className="text-gray-700 print:text-black">Falta de articulação entre os diferentes níveis de atenção.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-red-500 print:text-black mb-1">Regionalização</div>
                      <p className="text-gray-700 print:text-black">Dificuldades na implementação da regionalização da saúde.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 5: Intensidade dos Temas */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none page-break-before">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">5. Intensidade dos Temas por Estado</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <p className="mb-4 text-gray-600 print:text-black">Média de intensidade (escala 0-3) para os principais temas:</p>
              <div className="h-[400px] print:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dadosIntensidade}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tema" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 3]} label={{ value: 'Intensidade média', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value) => {
                        // Fix: Check if value is a number before using toFixed
                        if (typeof value === 'number') {
                          return [`${value.toFixed(1)}`, 'Intensidade'];
                        }
                        return [value, 'Intensidade'];
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="intensidadeFortalezas" name="Fortalezas" fill="#4CAF50" />
                    <Bar dataKey="intensidadeFragilidades" name="Fragilidades" fill="#F44336" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Principais diferenças de intensidade:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black"><strong>Protocolos e fluxos:</strong> maior diferença positiva (+0.5), indicando maior efetividade como fortaleza</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black"><strong>Regionalização:</strong> maior diferença negativa (-0.6), sendo percebida principalmente como fragilidade</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seção 6: Análise de Termos */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none page-break-before">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">6. Análise dos Termos mais Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-medium text-xl mb-4 text-green-700 print:text-black">Fortalezas</h3>
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
                        <Tooltip formatter={(value) => [`${value} menções`, '']} />
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
                  <h3 className="font-medium text-xl mb-4 text-red-700 print:text-black">Fragilidades</h3>
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
                        <Tooltip formatter={(value) => [`${value} menções`, '']} />
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
              
              {/* Nova seção: Termos compartilhados */}
              <div className="mt-8 mb-8">
                <h3 className="font-medium text-xl mb-4 text-purple-700 print:text-black">Termos compartilhados entre Fortalezas e Fragilidades</h3>
                <div className="h-[300px] print:h-[250px]">
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
              
              <div className="bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Insights sobre a terminologia:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black">Termos como "sistema" e "regulação" são frequentes tanto em fortalezas quanto fragilidades, indicando sua centralidade nos desafios regulatórios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black">Termos negativos como "falta" e "ausência" dominam o vocabulário das fragilidades, sinalizando carências estruturais</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black">"SISREG", "teleconsulta" e "telessaúde" aparecem predominantemente como fortalezas, demonstrando o impacto positivo das soluções tecnológicas</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seção 7: Recomendações */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none page-break-before">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">7. Recomendações para Melhoria da Regulação no SUS</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none">
                  <h3 className="font-medium text-lg mb-3 text-blue-700 print:text-black">Sistemas de informação</h3>
                  <p className="text-gray-700 print:text-black">Investir em tecnologias mais integradas e interoperáveis, modernizando sistemas existentes como o SISREG. Expandir o uso de telemedicina e telessaúde.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none">
                  <h3 className="font-medium text-lg mb-3 text-green-700 print:text-black">Protocolos e processos</h3>
                  <p className="text-gray-700 print:text-black">Padronizar nacionalmente protocolos de regulação e classificação de risco, construindo diretrizes adaptáveis às realidades locais.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none">
                  <h3 className="font-medium text-lg mb-3 text-red-700 print:text-black">Recursos humanos</h3>
                  <p className="text-gray-700 print:text-black">Desenvolver programas de capacitação continuada e estabelecer carreiras específicas para profissionais de regulação.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none">
                  <h3 className="font-medium text-lg mb-3 text-purple-700 print:text-black">Integração entre níveis</h3>
                  <p className="text-gray-700 print:text-black">Fortalecer a comunicação entre a atenção primária e especializada, usando sistemas de referência e contrarreferência eletrônicas.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none">
                  <h3 className="font-medium text-lg mb-3 text-orange-700 print:text-black">Regionalização</h3>
                  <p className="text-gray-700 print:text-black">Fortalecer os processos de regionalização, garantindo que os municípios-polo cumpram seu papel assistencial conforme os PDRs.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none">
                  <h3 className="font-medium text-lg mb-3 text-indigo-700 print:text-black">Política nacional</h3>
                  <p className="text-gray-700 print:text-black">Desenvolver uma política nacional de regulação integrada, com diretrizes claras e incentivos para implementação.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rodapé */}
          <div className="text-center mt-8 mb-12 text-gray-500 text-sm">
            <p className="print:text-black">Regulação SUS - Análise de Fortalezas e Fragilidades</p>
            <p className="print:text-black">Documento gerado em {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportableView;
