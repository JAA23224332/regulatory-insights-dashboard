
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Cores atualizadas para análise mais precisa
// Cores para fortalezas - tons de azul e verde
const COLORS_FORTALEZAS = ['#0066CC', '#009933', '#57bc6c', '#81C784', '#A5D6A7'];
// Cores variadas para fragilidades - melhor diferenciação visual
const COLORS_FRAGILIDADES = [
  '#E63946', // Vermelho vibrante para sistemas
  '#9D4EDD', // Roxo para protocolos
  '#FFB703', // Amarelo âmbar para outros
  '#FB8500', // Laranja para governança
  '#023E8A', // Azul escuro para integração
  '#0077B6', // Azul médio para recursos
  '#0096C7', // Ciano para acesso
  '#8B2431', // Bordô para regionalização
  '#588157'  // Verde escuro para financiamento
];

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

// Função auxiliar para abreviar nomes de categorias
const abreviarNomeCategoria = (nome) => {
  switch(nome) {
    case 'Sistemas e tecnologia': return 'Sistemas';
    case 'Protocolos e fluxos': return 'Protocolos';
    case 'Governança e gestão': return 'Governança';
    case 'Integração de níveis': return 'Integração';
    case 'Recursos humanos': return 'RH';
    case 'Acesso e equidade': return 'Acesso';
    default: return nome.length > 10 ? nome.substring(0, 10) + '..' : nome;
  }
};

// Preparar dados para o gráfico de pizza com porcentagens
const prepareDadosPieFortalezas = () => {
  const total = dadosReais.reduce((acc, item) => acc + item.fortalezas, 0);
  return dadosReais
    .filter(item => item.fortalezas > 0)
    .map(item => ({
      name: item.categoria,
      value: item.fortalezas,
      percentage: Math.round((item.fortalezas / total) * 100),
      shortName: abreviarNomeCategoria(item.categoria)
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
      percentage: Math.round((item.fragilidades / total) * 100),
      shortName: abreviarNomeCategoria(item.categoria)
    }))
    .sort((a, b) => b.value - a.value);
};

const dadosPieFortalezas = prepareDadosPieFortalezas();
const dadosPieFragilidades = prepareDadosPieFragilidades();

// Interface para as propriedades do rótulo personalizado
interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
  value: number;
  percentage: number;
  shortName: string;
  x: number;
  y: number;
}

// Função personalizada para renderizar os rótulos exatamente como na imagem
const renderCustomLabel = (props: CustomLabelProps) => {
  const { name, percentage, shortName } = props;
  
  // Simplificar os nomes das categorias para exibição nos rótulos
  let displayName = '';
  
  if (name === 'Sistemas e tecnologia') displayName = 'Tec. Informação';
  else if (name === 'Protocolos e fluxos') displayName = 'Protocolos';
  else if (name === 'Governança e gestão') displayName = 'Governança';
  else if (name === 'Integração de níveis') displayName = 'Integração';
  else if (name === 'Recursos humanos') displayName = 'RH';
  else if (name === 'Acesso e equidade') displayName = 'Acesso';
  else if (name === 'Regionalização') displayName = 'Regionalização';
  else if (name === 'Financiamento') displayName = 'Financiamento';
  else if (name === 'Outros') displayName = 'Outros';
  else displayName = shortName || name;
  
  return `${displayName}: ${percentage}%`;
};

// Componente de tabela para substituir os gráficos de pizza nas versões impressas
const TabelaDistribuicao = ({ dados, titulo, tipo }) => {
  return (
    <div className="mt-4 print:block hidden">
      <h4 className="font-medium text-lg mb-3">{titulo}</h4>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-2">Categoria</th>
            <th className="text-right p-2">Menções</th>
            <th className="text-right p-2">%</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="p-2 flex items-center">
                <span 
                  className="inline-block w-3 h-3 rounded-full mr-2" 
                  style={{ 
                    backgroundColor: tipo === 'fortalezas' ? 
                      COLORS_FORTALEZAS[index % COLORS_FORTALEZAS.length] : 
                      COLORS_FRAGILIDADES[index % COLORS_FRAGILIDADES.length]
                  }}
                ></span>
                {item.name}
              </td>
              <td className="p-2 text-right">{item.value}</td>
              <td className="p-2 text-right">{item.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Componente para exibir termos mais frequentes com classificação
const TabelaTermosFrequentes = ({ termos, titulo, tipo }) => {
  const getClasseCSS = () => {
    if (tipo === 'fortalezas') return 'termo-positive';
    if (tipo === 'fragilidades') return 'termo-negative';
    return 'termo-neutral';
  };

  const getRelevanceClass = (index) => {
    if (index < 3) return 'bg-green-50 dark:bg-green-900/20';
    if (index < 6) return 'bg-blue-50 dark:bg-blue-900/20'; 
    return 'bg-gray-50 dark:bg-gray-900/20';
  };

  const getRelevanceText = (index) => {
    if (index < 3) return 'Alta relevância';
    if (index < 6) return 'Média relevância'; 
    return 'Baixa relevância';
  };

  return (
    <div className="mt-6 print:block">
      <h4 className="font-medium text-lg mb-3">{titulo}</h4>
      <div className="overflow-hidden rounded-lg border print:border-none">
        <Table className="termo-table">
          <TableHeader className="bg-gray-50 print:bg-gray-100">
            <TableRow>
              <TableHead className="w-[35%] text-left font-semibold">Termo</TableHead>
              <TableHead className="w-[20%] text-center font-semibold">Frequência</TableHead>
              <TableHead className="w-[45%] text-left font-semibold">Classificação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {termos.map((item, index) => (
              <TableRow key={index} className={getRelevanceClass(index)}>
                <TableCell className="font-medium">{item.termo}</TableCell>
                <TableCell className={`text-center ${getClasseCSS()}`}>
                  <span className="px-2 py-1 rounded-full bg-white print:bg-transparent inline-block min-w-10 font-semibold">
                    {item.frequencia}
                  </span>
                </TableCell>
                <TableCell className="text-left">
                  <span className="termo-classificacao">
                    {getRelevanceText(index)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const ExportableView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const documentRef = useRef(null);
  
  useEffect(() => {
    // Apply style fixes when component mounts
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        .card {
          page-break-before: always !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          display: block !important;
        }
        .card:first-of-type {
          page-break-before: auto !important;
        }
        .recharts-wrapper {
          overflow: visible !important;
        }
        .recharts-legend-wrapper {
          padding-right: 20px !important;
        }
        .recharts-legend-item {
          margin-bottom: 10px !important;
        }
        .recharts-legend-item-text {
          font-size: 12px !important;
          font-weight: 600 !important;
          color: black !important;
        }
        .tabela-distribuicao {
          display: block !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Função para exportar dados como PDF usando janela de impressão com CSS específico
  const exportarPDF = () => {
    setTimeout(() => {
      window.print();
      
      toast({
        title: "Exportação de PDF iniciada",
        description: "Use a opção 'Salvar como PDF' na janela de impressão",
      });
    }, 2000);
  };
  
  const handlePrint = () => {
    setTimeout(() => {
      window.print();
      
      toast({
        title: "Impressão iniciada",
        description: "O documento está sendo enviado para impressão",
      });
    }, 2000);
  };
  
  const voltarPrincipal = () => {
    navigate('/');
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
            <Button 
              variant="default" 
              onClick={exportarPDF} 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
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
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 print:text-black">{estatisticasGerais.totalEstados}</div>
                  <div className="text-sm text-gray-500 print:text-black">Estados Participantes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 print:text-black">{estatisticasGerais.totalFortalezas}</div>
                  <div className="text-sm text-gray-500 print:text-black">Fortalezas Identificadas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 print:text-black">{estatisticasGerais.totalFragilidades}</div>
                  <div className="text-sm text-gray-500 print:text-black">Fragilidades Identificadas</div>
                </div>
              </div>
              
              {/* Gráfico de distribuição */}
              <div className="mb-6 h-[250px] print:h-[300px] print:hidden">
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
              
              {/* Tabela para versão impressa */}
              <div className="hidden print:block mb-6">
                <h4 className="font-medium text-lg mb-3">Distribuição de Menções</h4>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-2">Tipo</th>
                      <th className="text-right p-2">Menções</th>
                      <th className="text-right p-2">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosDistribuicao.map((item, index) => {
                      const total = dadosDistribuicao.reduce((acc, curr) => acc + curr.value, 0);
                      const percentage = Math.round((item.value / total) * 100);
                      return (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-2 flex items-center">
                            <span 
                              className="inline-block w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: index === 0 ? '#4CAF50' : '#F44336' }}
                            ></span>
                            {item.name}
                          </td>
                          <td className="p-2 text-right">{item.value}</td>
                          <td className="p-2 text-right">{percentage}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Constatações gerais:</h3>
                <ul className="list-disc list-inside text-gray-600 print:text-black">
                  <li>A maioria dos estados compartilham desafios similares na regulação do SUS.</li>
                  <li>A integração de sistemas e a gestão de recursos são pontos críticos.</li>
                  <li>A necessidade de equilibrar fortalezas e fragilidades é evidente para melhorias contínuas.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seção 2: Comparativo por Categoria */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-2">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">2. Comparativo por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="h-[500px] print:h-[400px] print:hidden">
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
              
              {/* Tabela para versão impressa */}
              <div className="hidden print:block mb-6">
                <h4 className="font-medium text-lg mb-3">Comparativo de Menções por Categoria</h4>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-2">Categoria</th>
                      <th className="text-right p-2">Fortalezas</th>
                      <th className="text-right p-2">Fragilidades</th>
                      <th className="text-right p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosReais.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-2">{item.categoria}</td>
                        <td className="p-2 text-right">{item.fortalezas}</td>
                        <td className="p-2 text-right">{item.fragilidades}</td>
                        <td className="p-2 text-right">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Destaques da análise:</h3>
                <ul className="list-disc list-inside text-gray-600 print:text-black space-y-3">
                  <li className="print:mb-3">
                    <strong>Sistemas e tecnologia:</strong> Aparece tanto como fortaleza (13 menções) quanto fragilidade (12 menções), indicando que alguns estados avançaram neste tema enquanto outros ainda têm desafios significativos com sistemas de informação.
                  </li>
                  <li className="print:mb-3">
                    <strong>Protocolos e fluxos:</strong> Mais frequentemente citado como fortaleza (8 menções) do que fragilidade (5 menções), sugerindo avanços na padronização de processos regulatórios entre os estados.
                  </li>
                  <li className="print:mb-3">
                    <strong>Recursos humanos e Acesso e equidade:</strong> Ambos mais frequentemente citados como fragilidades (7 menções cada) do que fortalezas (3 menções cada), apontando para desafios persistentes em capacitação de profissionais e garantia de acesso equitativo aos serviços.
                  </li>
                  <li className="print:mb-3">
                    <strong>Regionalização e Financiamento:</strong> Aparecem quase exclusivamente como fragilidades (4 e 1 menções respectivamente), indicando áreas críticas que precisam de atenção prioritária nas políticas públicas de saúde.
                  </li>
                  <li className="print:mb-3">
                    <strong>Integração de níveis:</strong> Apresenta equilíbrio relativo entre fortalezas (4) e fragilidades (5), demonstrando progresso parcial na articulação entre níveis de atenção, mas com desafios remanescentes.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Fortalezas */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-3">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">3. Análise Detalhada das Fortalezas</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 section-fortalezas">
                <div>
                  {/* Gráfico visível apenas em tela */}
                  <div className="h-[400px] print:hidden">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dadosPieFortalezas}
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          innerRadius={60}
                          paddingAngle={2}
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
                        <Tooltip formatter={(value, name, props) => [`${value} menções (${props.payload.percentage}%)`, 'Quantidade']} />
                        <Legend 
                          layout="vertical"
                          align="center"
                          verticalAlign="bottom"
                          formatter={(value, entry) => {
                            // @ts-ignore - necessário porque a tipagem do Recharts não inclui percentage
                            const percentage = entry.payload.percentage;
                            return `${value}: ${percentage}%`;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Tabela para versão impressa */}
                  <TabelaDistribuicao 
                    dados={dadosPieFortalezas} 
                    titulo="Distribuição das Fortalezas por Categoria" 
                    tipo="fortalezas"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-xl mb-4 text-green-700 print:text-black">Principais fortalezas:</h3>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-blue-600 print:text-black mb-1">Tec. Informação</div>
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
              
              {/* Tabela de termos mais frequentes para fortalezas com classificação aprimorada */}
              <TabelaTermosFrequentes 
                termos={termosFrequentesFortalezas} 
                titulo="Termos mais frequentes em fortalezas com classificação de relevância"
                tipo="fortalezas"
              />
            </CardContent>
          </Card>
          
          {/* Seção 4: Fragilidades */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-4">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">4. Análise Detalhada das Fragilidades</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 section-fragilidades">
                <div>
                  {/* Gráfico visível apenas em tela */}
                  <div className="h-[400px] print:hidden">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dadosPieFragilidades}
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          innerRadius={60}
                          paddingAngle={2}
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
                        <Tooltip formatter={(value, name, props) => [`${value} menções (${props.payload.percentage}%)`, 'Quantidade']} />
                        <Legend 
                          layout="vertical"
                          align="center"
                          verticalAlign="bottom"
                          formatter={(value, entry) => {
                            // @ts-ignore - necessário porque a tipagem do Recharts não inclui percentage
                            const percentage = entry.payload.percentage;
                            return `${value}: ${percentage}%`;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Tabela para versão impressa */}
                  <TabelaDistribuicao 
                    dados={dadosPieFragilidades} 
                    titulo="Distribuição das Fragilidades por Categoria" 
                    tipo="fragilidades"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-xl mb-4 text-red-700 print:text-black">Principais fragilidades:</h3>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-red-600 print:text-black mb-1">Sistemas e tecnologia</div>
                      <p className="text-gray-700 print:text-black">Interoperabilidade entre sistemas, infraestrutura limitada e conectividade.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-pink-600 print:text-black mb-1">Recursos humanos</div>
                      <p className="text-gray-700 print:text-black">Falta de profissionais qualificados e alta rotatividade.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-orange-600 print:text-black mb-1">Acesso e equidade</div>
                      <p className="text-gray-700 print:text-black">Dificuldades de acesso em áreas remotas e desigualdades regionais.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-purple-600 print:text-black mb-1">Integração de níveis</div>
                      <p className="text-gray-700 print:text-black">Falhas na comunicação entre níveis de atenção e referência-contrarreferência.</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Tabela de termos mais frequentes para fragilidades com classificação aprimorada */}
              <TabelaTermosFrequentes 
                termos={termosFrequentesFragilidades} 
                titulo="Termos mais frequentes em fragilidades com classificação de relevância"
                tipo="fragilidades"
              />
            </CardContent>
          </Card>

          {/* Seção 5: Termos Compartilhados */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-5">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">5. Análise Comparativa de Termos</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="mb-6">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Termos compartilhados entre fortalezas e fragilidades:</h3>
                <p className="text-gray-600 print:text-black mb-4">Análise dos termos que aparecem tanto como fortalezas quanto fragilidades, indicando áreas de transição ou desenvolvimento heterogêneo entre estados.</p>
                
                <div className="overflow-hidden rounded-lg border print:border-none">
                  <Table>
                    <TableHeader className="bg-gray-50 print:bg-gray-100">
                      <TableRow>
                        <TableHead className="w-[30%] text-left font-semibold">Termo</TableHead>
                        <TableHead className="w-[20%] text-center font-semibold">Freq. Fortalezas</TableHead>
                        <TableHead className="w-[20%] text-center font-semibold">Freq. Fragilidades</TableHead>
                        <TableHead className="w-[30%] text-center font-semibold">Diferença</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {termosCompartilhados.map((item, index) => (
                        <TableRow key={index} className="border-b border-gray-100">
                          <TableCell className="font-medium">{item.termo}</TableCell>
                          <TableCell className="text-center text-green-600 print:text-black font-semibold">{item.freqFortalezas}</TableCell>
                          <TableCell className="text-center text-red-600 print:text-black font-semibold">{item.freqFragilidades}</TableCell>
                          <TableCell className="text-center">
                            <span className={`px-3 py-1 rounded-full inline-block ${
                              item.diferenca > 0 ? 'bg-green-100 text-green-800' : 
                              item.diferenca < 0 ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'
                            } print:bg-transparent print:text-black font-semibold`}>
                              {item.diferenca > 0 ? '+' : ''}{item.diferenca}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="bg-gray-50 print:bg-gray-100 p-5 rounded-lg mt-6">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Insights da análise de termos:</h3>
                <ul className="list-disc list-inside text-gray-600 print:text-black space-y-2">
                  <li>Termos como "sistema" e "regulação" aparecem tanto como fortalezas quanto fragilidades, indicando desenvolvimento heterogêneo entre os estados.</li>
                  <li>O SISREG é predominantemente citado como fortaleza, demonstrando sua importância para a regulação.</li>
                  <li>Termos relacionados a recursos humanos e acesso aparecem mais frequentemente como fragilidades.</li>
                  <li>A interoperabilidade entre sistemas é um dos principais desafios mencionados.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Seção 6: Recomendações */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-6">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">6. Recomendações para Melhoria da Regulação do SUS</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <p className="text-center mb-6 print:mb-4">Baseado na análise das fortalezas e fragilidades reportadas pelas Secretarias Estaduais de Saúde</p>
              
              {/* Versão tabbed para tela */}
              <div className="print:hidden">
                <Tabs defaultValue="curto">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="curto">Curto Prazo</TabsTrigger>
                    <TabsTrigger value="medio">Médio Prazo</TabsTrigger>
                    <TabsTrigger value="longo">Longo Prazo</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="curto" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-blue-800">Padronização de Protocolos</h3>
                          <p>Desenvolver e disseminar protocolos de regulação padronizados, adaptáveis às realidades locais, começando pelas condições mais prevalentes.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Protocolos clínicos</span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Classificação de risco</span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Priorização</span>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-green-800">Capacitação das Equipes</h3>
                          <p>Implementar programas de capacitação continuada para profissionais da regulação, com foco em uso de sistemas e aplicação de protocolos.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Treinamento online</span>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Uso do SISREG</span>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Teleconsultoria</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-purple-800">Expansão da Telessaúde</h3>
                          <p>Expandir a cobertura dos serviços de telessaúde e telediagnóstico para os municípios que ainda não contam com essa tecnologia.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Municípios remotos</span>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Teleconsulta</span>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Telediagnóstico</span>
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-yellow-800">Transparência da Fila</h3>
                          <p>Implementar painéis públicos de monitoramento das filas de espera para procedimentos regulados, melhorando a transparência do processo.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Dashboards</span>
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Acesso público</span>
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Tempo de espera</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="medio" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-indigo-800">Interoperabilidade de Sistemas</h3>
                          <p>Desenvolver soluções para integração entre os diversos sistemas de informação em saúde, incluindo SISREG, SUSfácilMG e sistemas municipais.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">API de integração</span>
                            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Sistemas legados</span>
                            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">FHIR</span>
                          </div>
                        </div>
                        
                        <div className="bg-red-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-red-800">Fortalecimento da Governança Regional</h3>
                          <p>Fortalecer as instâncias de pactuação regional, como as CIRs e CIBs, com foco na responsabilização dos municípios-polo.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Comissões Intergestores</span>
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Contratualização</span>
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Metas regionais</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-emerald-800">Regulação Ambulatorial</h3>
                          <p>Desenvolver e implementar sistemas de regulação ambulatorial integrados, com uso de inteligência artificial para apoio à decisão.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">Especialidades</span>
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">IA para suporte</span>
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">Priorização automática</span>
                          </div>
                        </div>
                        
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-pink-800">Carreira de Regulador</h3>
                          <p>Estruturar carreiras para médicos reguladores e profissionais de regulação, com planos de carreira e incentivos para fixação.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Concursos específicos</span>
                            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Remuneração adequada</span>
                            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Educação permanente</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="longo" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-cyan-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-cyan-800">Modernização Tecnológica</h3>
                          <p>Desenvolver uma nova geração de sistemas de regulação com uso de inteligência artificial, big data e interoperabilidade plena.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">IA avançada</span>
                            <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">Interoperabilidade total</span>
                            <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">Análise preditiva</span>
                          </div>
                        </div>
                        
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-amber-800">Regulação Proativa</h3>
                          <p>Mudar o modelo de regulação de reativo para proativo, identificando necessidades antes mesmo que se tornem demandas agudas.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Gestão de crônicos</span>
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Prevenção quaternária</span>
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Cuidado integrado</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-teal-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-teal-800">Regionalização Efetiva</h3>
                          <p>Redesenhar a regionalização da saúde baseada em análises demográficas, epidemiológicas e de fluxos assistenciais reais.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Novo PDR</span>
                            <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Fluxos reais</span>
                            <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Gestão regional</span>
                          </div>
                        </div>
                        
                        <div className="bg-rose-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 text-rose-800">Financiamento Integrado</h3>
                          <p>Reformular o modelo de financiamento para apoiar de forma mais efetiva a regulação do acesso, com incentivos para cumprimento de metas.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">Pagamento por desempenho</span>
                            <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">Nova PPI</span>
                            <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">Financiamento regional</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Versão contínua para impressão */}
              <div className="hidden print:block">
                <h3 className="font-semibold text-xl mb-4 text-blue-800 print:text-black">Recomendações de Curto Prazo</h3>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="bg-blue-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-blue-800 print:text-black">Padronização de Protocolos</h4>
                    <p className="text-gray-700 print:text-black">Desenvolver e disseminar protocolos de regulação padronizados, adaptáveis às realidades locais, começando pelas condições mais prevalentes.</p>
                  </div>
                  
                  <div className="bg-green-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-green-800 print:text-black">Capacitação das Equipes</h4>
                    <p className="text-gray-700 print:text-black">Implementar programas de capacitação continuada para profissionais da regulação, com foco em uso de sistemas e aplicação de protocolos.</p>
                  </div>
                  
                  <div className="bg-purple-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-purple-800 print:text-black">Expansão da Telessaúde</h4>
                    <p className="text-gray-700 print:text-black">Expandir a cobertura dos serviços de telessaúde e telediagnóstico para os municípios que ainda não contam com essa tecnologia.</p>
                  </div>
                  
                  <div className="bg-yellow-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-yellow-800 print:text-black">Transparência da Fila</h4>
                    <p className="text-gray-700 print:text-black">Implementar painéis públicos de monitoramento das filas de espera para procedimentos regulados, melhorando a transparência do processo.</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-xl mb-4 text-indigo-800 print:text-black">Recomendações de Médio Prazo</h3>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="bg-indigo-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-indigo-800 print:text-black">Interoperabilidade de Sistemas</h4>
                    <p className="text-gray-700 print:text-black">Desenvolver soluções para integração entre os diversos sistemas de informação em saúde, incluindo SISREG, SUSfácilMG e sistemas municipais.</p>
                  </div>
                  
                  <div className="bg-red-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-red-800 print:text-black">Fortalecimento da Governança Regional</h4>
                    <p className="text-gray-700 print:text-black">Fortalecer as instâncias de pactuação regional, como as CIRs e CIBs, com foco na responsabilização dos municípios-polo.</p>
                  </div>
                  
                  <div className="bg-emerald-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-emerald-800 print:text-black">Regulação Ambulatorial</h4>
                    <p className="text-gray-700 print:text-black">Desenvolver e implementar sistemas de regulação ambulatorial integrados, com uso de inteligência artificial para apoio à decisão.</p>
                  </div>
                  
                  <div className="bg-pink-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-pink-800 print:text-black">Carreira de Regulador</h4>
                    <p className="text-gray-700 print:text-black">Estruturar carreiras para médicos reguladores e profissionais de regulação, com planos de carreira e incentivos para fixação.</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-xl mb-4 text-cyan-800 print:text-black">Recomendações de Longo Prazo</h3>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="bg-cyan-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-cyan-800 print:text-black">Modernização Tecnológica</h4>
                    <p className="text-gray-700 print:text-black">Desenvolver uma nova geração de sistemas de regulação com uso de inteligência artificial, big data e interoperabilidade plena.</p>
                  </div>
                  
                  <div className="bg-amber-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-amber-800 print:text-black">Regulação Proativa</h4>
                    <p className="text-gray-700 print:text-black">Mudar o modelo de regulação de reativo para proativo, identificando necessidades antes mesmo que se tornem demandas agudas.</p>
                  </div>
                  
                  <div className="bg-teal-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-teal-800 print:text-black">Regionalização Efetiva</h4>
                    <p className="text-gray-700 print:text-black">Redesenhar a regionalização da saúde baseada em análises demográficas, epidemiológicas e de fluxos assistenciais reais.</p>
                  </div>
                  
                  <div className="bg-rose-50 print:bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-rose-800 print:text-black">Financiamento Integrado</h4>
                    <p className="text-gray-700 print:text-black">Reformular o modelo de financiamento para apoiar de forma mais efetiva a regulação do acesso, com incentivos para cumprimento de metas.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 print:bg-gray-100 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 print:text-black">Pontos críticos para o sucesso:</h3>
                <ul className="list-disc pl-5 space-y-2 print:text-black">
                  <li><span className="font-medium">Integração entre entes federativos</span>: As recomendações dependem de coordenação efetiva entre União, estados e municípios.</li>
                  <li><span className="font-medium">Sustentabilidade financeira</span>: Muitas das propostas exigem investimentos contínuos e previsíveis ao longo do tempo.</li>
                  <li><span className="font-medium">Desenvolvimento de recursos humanos</span>: A capacitação e fixação de profissionais qualificados é fundamental para qualquer avanço na regulação.</li>
                  <li><span className="font-medium">Participação social</span>: Os usuários precisam estar envolvidos no processo para garantir transparência e adequação das soluções.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExportableView;
