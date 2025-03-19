import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Cores atualizadas para análise mais precisa
// Cores para fortalezas - tons de azul e verde
const COLORS_FORTALEZAS = ['#0066CC', '#009933', '#57bc6c', '#81C784', '#A5D6A7'];
// Cores para fragilidades - paleta de vermelhos melhorada
const COLORS_FRAGILIDADES = ['#C9184A', '#E5383B', '#D62828', '#A4161A', '#BA181B'];

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
  
  if (name === 'Sistemas e tecnologia') displayName = 'Sistemas';
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
const TabelaDistribuicao = ({ dados, titulo, corIcone }) => {
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
                  style={{ backgroundColor: index < 5 ? 
                    (titulo.includes("Fortalezas") ? COLORS_FORTALEZAS[index] : COLORS_FRAGILIDADES[index]) : 
                    '#888' 
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
              {/* ... keep existing code (cards e indicadores) */}
              
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
                {/* ... keep existing code (constatações) */}
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
                {/* ... keep existing code (destaques) */}
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
                    corIcone="#4CAF50" 
                  />
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

          {/* Seção 4: Fragilidades */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-4">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">4. Análise Detalhada das Fragilidades</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 section-fragilidades">
                <div>
                  {/* Gráfico visível apenas em tela - com cores melhoradas */}
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
                  
                  {/* Legenda de cores para melhor visualização */}
                  <div className="mt-4 print:hidden">
                    <h4 className="font-medium text-lg mb-3">Legenda de Cores</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {dadosPieFragilidades.slice(0, 6).map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span 
                            className="inline-block w-4 h-4 rounded-full" 
                            style={{ backgroundColor: COLORS_FRAGILIDADES[index % COLORS_FRAGILIDADES.length] }}
                          ></span>
                          <span className="text-sm">{abreviarNomeCategoria(item.name)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tabela para versão impressa - com cores melhoradas */}
                  <TabelaDistribuicao 
                    dados={dadosPieFragilidades} 
                    titulo="Distribuição das Fragilidades por Categoria" 
                    corIcone="#C9184A" 
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-xl mb-4 text-red-700 print:text-black">Principais fragilidades:</h3>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-[#A4161A] print:text-black mb-1">Recursos humanos</div>
                      <p className="text-gray-700 print:text-black">Falta de profissionais qualificados e capacitação inadequada.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-[#E5383B] print:text-black mb-1">Acesso e equidade</div>
                      <p className="text-gray-700 print:text-black">Desigualdades no acesso entre regiões e municípios.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-[#C9184A] print:text-black mb-1">Sistemas e tecnologia</div>
                      <p className="text-gray-700 print:text-black">Limitações dos sistemas existentes, falta de interoperabilidade.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-[#D62828] print:text-black mb-1">Integração de níveis</div>
                      <p className="text-gray-700 print:text-black">Falta de articulação entre os diferentes níveis de atenção.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-[#BA181B] print:text-black mb-1">Regionalização</div>
                      <p className="text-gray-700 print:text-black">Dificuldades na implementação da regionalização da saúde.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 5: Intensidade dos Temas */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-5">
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
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Insights sobre intensidade:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black"><strong>Sistemas e tecnologia:</strong> apresenta a maior intensidade tanto em fortalezas (1.8) quanto em fragilidades (1.5)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black"><strong>Protocolos e fluxos:</strong> segunda maior intensidade em fortalezas (1.2), indicando área de bom desenvolvimento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                    <span className="print:text-black"><strong>Regionalização:</strong> apresenta diferença negativa significativa (-0.6), indicando área de maior preocupação</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Rodapé do documento */}
          <div className="text-center mb-8 mt-12 text-sm text-gray-500 print:text-black">
            <p>Relatório gerado em {new Date().toLocaleDateString()}</p>
            <p>Regulação SUS - Análise de Fortalezas e Fragilidades</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportableView;

