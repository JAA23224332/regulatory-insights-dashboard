
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecomendacoesRegulacao from '@/components/RecomendacoesRegulacao';

// Definição de cores para os gráficos
const COLORS_FORTALEZAS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#9c6ade', '#7447ba', '#542b8a'];
const COLORS_FRAGILIDADES = ['#E63946', '#9D4EDD', '#FFB703', '#FB8500', '#023E8A', '#0077B6', '#0096C7', '#8B2431'];

// Dados de exemplo (substituir pelos dados reais)
const dadosReais = [
  { categoria: 'Sistema de Informação', fortalezas: 120, fragilidades: 80 },
  { categoria: 'Recursos Humanos', fortalezas: 90, fragilidades: 110 },
  { categoria: 'Infraestrutura', fortalezas: 70, fragilidades: 90 },
  { categoria: 'Financiamento', fortalezas: 100, fragilidades: 60 },
  { categoria: 'Gestão', fortalezas: 80, fragilidades: 70 },
];

const termosFrequentesFortalezas = [
  { termo: 'Integração', frequencia: 25, classificacao: 'Muito relevante' },
  { termo: 'Sistema', frequencia: 20, classificacao: 'Relevante' },
  { termo: 'Informação', frequencia: 18, classificacao: 'Relevante' },
  { termo: 'Recursos', frequencia: 15, classificacao: 'Moderado' },
  { termo: 'Equipe', frequencia: 12, classificacao: 'Moderado' },
  { termo: 'Acesso', frequencia: 10, classificacao: 'Baixa relevância' },
];

const termosFrequentesFragilidades = [
  { termo: 'Falta', frequencia: 14, classificacao: 'Crítico' },
  { termo: 'Ausência', frequencia: 12, classificacao: 'Crítico' },
  { termo: 'Recursos humanos', frequencia: 10, classificacao: 'Muito relevante' },
  { termo: 'Interoperabilidade', frequencia: 8, classificacao: 'Relevante' },
  { termo: 'Acesso', frequencia: 7, classificacao: 'Relevante' },
  { termo: 'Regionalização', frequencia: 6, classificacao: 'Moderado' },
];

const termosCompartilhados = [
  { termo: 'Sistema', freqFortalezas: 15, freqFragilidades: 8, diferenca: 7 },
  { termo: 'Regulação', freqFortalezas: 12, freqFragilidades: 5, diferenca: 7 },
  { termo: 'Municípios', freqFortalezas: 7, freqFragilidades: 7, diferenca: 0 },
  { termo: 'Equipe', freqFortalezas: 5, freqFragilidades: 9, diferenca: -4 },
  { termo: 'Especialidades', freqFortalezas: 3, freqFragilidades: 6, diferenca: -3 },
];

const dadosIntensidade = [
  { categoria: 'Sistema de Informação', intensidade: 0.8 },
  { categoria: 'Recursos Humanos', intensidade: 0.9 },
  { categoria: 'Infraestrutura', intensidade: 0.7 },
  { categoria: 'Financiamento', intensidade: 0.6 },
  { categoria: 'Gestão', intensidade: 0.75 },
];

const estatisticasGerais = {
  totalEstados: 27,
  totalFortalezas: 1250,
  totalFragilidades: 980,
};

const dadosDistribuicao = [
  { nome: 'Atendimento Primário', valor: 35 },
  { nome: 'Média Complexidade', valor: 45 },
  { nome: 'Alta Complexidade', valor: 20 },
];

// Funções utilitárias
const abreviarNomeCategoria = (nome: string) => {
  if (nome === 'Sistema de Informação') return 'SIS';
  if (nome === 'Recursos Humanos') return 'RH';
  return nome;
};

const prepareDadosPieFortalezas = dadosReais.map(item => ({
  name: abreviarNomeCategoria(item.categoria),
  value: item.fortalezas,
}));

const prepareDadosPieFragilidades = dadosReais.map(item => ({
  name: abreviarNomeCategoria(item.categoria),
  value: item.fragilidades,
  percentage: ((item.fragilidades / estatisticasGerais.totalFragilidades) * 100).toFixed(1),
}));

interface CustomLabelProps {
  x: number;
  y: number;
  value: number;
  index: number;
  name: string;
  width: number;
  height: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  fill: string;
  percent: number;
  cx?: number;
  cy?: number;
}

const renderCustomLabel = (props: CustomLabelProps) => {
  const RADIAN = Math.PI / 180;
  const { cx = 0, cy = 0, midAngle, innerRadius, outerRadius, percent, index, name } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Componente para a tabela de distribuição
const TabelaDistribuicao = ({ dados, titulo, tipo }: { dados: any[], titulo: string, tipo: 'fortalezas' | 'fragilidades' }) => (
  <div className="overflow-x-auto shadow-md sm:rounded-lg print:shadow-none">
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHeader className="bg-gray-50 print:bg-gray-100">
        <TableRow>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
            Categoria
          </TableHead>
          <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
            Porcentagem
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white divide-y divide-gray-200">
        {dados.map((item, index) => (
          <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 print:bg-gray-100'}>
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:text-black">
              {item.name}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right print:text-black">
              {item.percentage ? `${item.percentage}%` : `${((item.value / (tipo === 'fortalezas' ? estatisticasGerais.totalFortalezas : estatisticasGerais.totalFragilidades)) * 100).toFixed(1)}%`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

// Componente para a tabela de termos frequentes
const TabelaTermosFrequentes = ({ termos, titulo, tipo }: { termos: any[], titulo: string, tipo: 'fortalezas' | 'fragilidades' }) => (
  <div className="overflow-x-auto shadow-md sm:rounded-lg print:shadow-none">
    <Table className="min-w-full divide-y divide-gray-200 termo-table">
      <TableHeader className="bg-gray-50 print:bg-gray-100">
        <TableRow>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
            Termo
          </TableHead>
          <TableHead className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
            Frequência
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
            Classificação
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white divide-y divide-gray-200">
        {termos.map((item, index) => (
          <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 print:bg-gray-100'}>
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:text-black">
              {item.termo}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-center">
              <span className={`px-2 py-1 rounded font-semibold termo-${tipo === 'fortalezas' ? 'positive' : tipo === 'fragilidades' ? 'negative' : 'neutral'}`}>
                {item.frequencia}
              </span>
            </TableCell>
            <TableCell className="px-6 py-4 text-sm text-gray-500 print:text-black">
              {item.classificacao}
              <span className="term-classification-description">({item.classificacao})</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const ExportableView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const documentRef = useRef(null);

  const exportarPDF = async () => {
    try {
      // Importa dinamicamente as dependências do jsPDF
      const { jsPDF } = await import("jspdf");
      await import("html2canvas");

      // Obtém o elemento do documento
      const element = documentRef.current;

      if (!element) {
        toast({
          title: "Erro",
          description: "Não foi possível encontrar o conteúdo para exportar.",
          variant: "destructive",
        });
        return;
      }

      // Configurações do jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // Renderiza o conteúdo HTML como uma imagem
      const canvas = await html2canvas(element, {
        scale: 2, // Aumenta a escala para melhor resolução
        useCORS: true, // Habilita o CORS para carregar imagens de outros domínios
      });
      const imgData = canvas.toDataURL('image/png');

      // Calcula a altura da página
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 0;
      const heightLeft = pdfHeight;

      // Adiciona a imagem ao PDF
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);

      // Salva o PDF
      pdf.save("regulacao-sus.pdf");

      toast({
        title: "Sucesso",
        description: "PDF exportado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      toast({
        title: "Erro",
        description: "Houve um erro ao exportar o PDF.",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const voltarPrincipal = () => {
    navigate("/");
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
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-1">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">1. Visão Geral</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <p className="text-gray-600 print:text-black">
                Esta seção apresenta uma visão geral das principais fortalezas e fragilidades identificadas nas respostas das Secretarias Estaduais de Saúde.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h3 className="font-medium text-xl mb-4 text-blue-700 print:text-black">Distribuição por Categoria</h3>
                  <ul className="list-disc list-inside text-gray-600 print:text-black space-y-2">
                    {dadosReais.map((item, index) => (
                      <li key={index}>
                        {item.categoria}: {item.fortalezas} fortalezas e {item.fragilidades} fragilidades
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-xl mb-4 text-green-700 print:text-black">Estatísticas Gerais</h3>
                  <ul className="list-disc list-inside text-gray-600 print:text-black space-y-2">
                    <li>Total de Secretarias Estaduais de Saúde: {estatisticasGerais.totalEstados}</li>
                    <li>Total de Fortalezas Identificadas: {estatisticasGerais.totalFortalezas}</li>
                    <li>Total de Fragilidades Identificadas: {estatisticasGerais.totalFragilidades}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 2: Comparativo por Categoria */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-2">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">2. Comparativo por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <p className="text-gray-600 print:text-black">
                Este gráfico apresenta um comparativo entre as fortalezas e fragilidades por categoria.
              </p>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dadosReais}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="fortalezas" fill="#82ca9d" />
                    <Bar dataKey="fragilidades" fill="#e45858" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Análise Detalhada das Fortalezas */}
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
                          data={prepareDadosPieFortalezas}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomLabel}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {prepareDadosPieFortalezas.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_FORTALEZAS[index % COLORS_FORTALEZAS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Tabela para versão impressa */}
                  <TabelaDistribuicao 
                    dados={prepareDadosPieFortalezas} 
                    titulo="Distribuição das Fortalezas por Categoria" 
                    tipo="fortalezas"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-xl mb-4 text-green-700 print:text-black">Principais fortalezas:</h3>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-green-600 print:text-black mb-1">Sistema de Informação</div>
                      <p className="text-gray-700 print:text-black">Implementação de sistemas de informação robustos e integrados.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-green-600 print:text-black mb-1">Recursos Humanos</div>
                      <p className="text-gray-700 print:text-black">Disponibilidade de profissionais qualificados e engajados.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-green-600 print:text-black mb-1">Infraestrutura</div>
                      <p className="text-gray-700 print:text-black">Infraestrutura adequada para a prestação de serviços de saúde.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-green-600 print:text-black mb-1">Financiamento</div>
                      <p className="text-gray-700 print:text-black">Alocação de recursos financeiros adequados para a saúde.</p>
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
              
              <div className="mt-8 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Observações críticas:</h3>
                <ul className="list-disc list-inside text-gray-600 print:text-black space-y-3">
                  <li>
                    <strong>Integração</strong> é o termo mais mencionado (25 menções), indicando uma forte ênfase na coordenação entre diferentes níveis de atenção.
                  </li>
                  <li>
                    <strong>Sistema e informação</strong> aparecem como elementos-chave, com 20 e 18 menções respectivamente, refletindo a importância da tecnologia.
                  </li>
                  <li>
                    <strong>Recursos</strong> também são destacados (15 menções), sugerindo que a disponibilidade de recursos é vista como um ponto forte.
                  </li>
                  <li>
                    <strong>Equipe e acesso</strong>, embora importantes, têm menor frequência (12 e 10 menções), indicando áreas que podem precisar de mais atenção.
                  </li>
                </ul>
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
                  {/* Gráfico visível apenas em tela */}
                  <div className="h-[400px] print:hidden">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prepareDadosPieFragilidades}
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          innerRadius={60}
                          paddingAngle={2}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {prepareDadosPieFragilidades.map((entry, index) => (
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
                    dados={prepareDadosPieFragilidades} 
                    titulo="Distribuição das Fragilidades por Categoria" 
                    tipo="fragilidades"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-xl mb-4 text-red-700 print:text-black">Principais fragilidades:</h3>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-red-600 print:text-black mb-1">Tec. Informação</div>
                      <p className="text-gray-700 print:text-black">Dificuldades de interoperabilidade, sistemas fragmentados e falta de integração.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-purple-600 print:text-black mb-1">Recursos Humanos</div>
                      <p className="text-gray-700 print:text-black">Escassez de profissionais qualificados, alta rotatividade e falta de capacitação continuada.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-yellow-600 print:text-black mb-1">Acesso e equidade</div>
                      <p className="text-gray-700 print:text-black">Barreiras geográficas, desigualdades regionais e filas de espera para procedimentos especializados.</p>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:border-none">
                      <div className="font-medium text-blue-600 print:text-black mb-1">Regionalização</div>
                      <p className="text-gray-700 print:text-black">Dificuldades na pactuação intermunicipal, concentração de serviços e baixa adesão de municípios-polo.</p>
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
              
              <div className="mt-8 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Observações críticas:</h3>
                <ul className="list-disc list-inside text-gray-600 print:text-black space-y-3">
                  <li>
                    <strong>Falta e ausência</strong> são os termos mais mencionados (14 e 12 menções respectivamente), indicando carências estruturais no sistema regulatório.
                  </li>
                  <li>
                    <strong>Recursos humanos</strong> aparece como uma fragilidade crítica, com problemas que vão desde a falta de profissionais até deficiências na capacitação.
                  </li>
                  <li>
                    <strong>Interoperabilidade</strong> e integração entre diferentes sistemas são desafios recorrentes, prejudicando a eficiência da regulação.
                  </li>
                  <li>
                    <strong>Acesso e regionalização</strong> estão frequentemente associados às dificuldades de pactuação entre municípios e à concentração de serviços nos polos regionais.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seção 5: Análise Comparativa de Termos */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-5">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">5. Análise Comparativa de Termos</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              <div className="overflow-hidden rounded-lg border print:border-none mb-6">
                <Table>
                  <TableHeader className="bg-gray-50 print:bg-gray-100">
                    <TableRow>
                      <TableHead className="w-[25%] text-left font-semibold">Termo</TableHead>
                      <TableHead className="w-[20%] text-center font-semibold">Frequência<br/>em Fortalezas</TableHead>
                      <TableHead className="w-[20%] text-center font-semibold">Frequência<br/>em Fragilidades</TableHead>
                      <TableHead className="w-[20%] text-center font-semibold">Diferença</TableHead>
                      <TableHead className="w-[15%] text-center font-semibold">Tendência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {termosCompartilhados.map((item, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <TableCell className="font-medium">{item.termo}</TableCell>
                        <TableCell className="text-center text-green-600 print:text-black font-semibold">{item.freqFortalezas}</TableCell>
                        <TableCell className="text-center text-red-600 print:text-black font-semibold">{item.freqFragilidades}</TableCell>
                        <TableCell className="text-center font-semibold">
                          <span className={item.diferenca > 0 ? 'text-green-600 print:text-black' : item.diferenca < 0 ? 'text-red-600 print:text-black' : 'text-gray-600 print:text-black'}>
                            {item.diferenca > 0 ? '+' : ''}{item.diferenca}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.diferenca > 3 ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Fortaleza muito relevante</span>
                          ) : item.diferenca > 0 ? (
                            <span className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs">Fortaleza</span>
                          ) : item.diferenca < -3 ? (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Fragilidade muito relevante</span>
                          ) : item.diferenca < 0 ? (
                            <span className="bg-red-50 text-red-800 px-2 py-1 rounded text-xs">Fragilidade</span>
                          ) : (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Equilibrado</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-8 bg-gray-50 print:bg-gray-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-gray-800 print:text-black">Principais insights da análise comparativa:</h3>
                <ul className="list-disc list-inside text-gray-600 print:text-black space-y-3">
                  <li>
                    <strong>Sistema e Regulação</strong> apresentam um saldo positivo significativo (+7 cada), indicando que são mais frequentemente mencionados como fortalezas do que como fragilidades.
                  </li>
                  <li>
                    <strong>Municípios</strong> tem uma frequência igual entre fortalezas e fragilidades (diferença 0), sugerindo que a relação com os municípios apresenta tanto aspectos positivos quanto desafios.
                  </li>
                  <li>
                    <strong>Equipe e Especialidades</strong> têm um saldo negativo (-4 e -3 respectivamente), aparecendo mais como fragilidades, o que indica áreas críticas que precisam de atenção.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seção 6: Recomendações para Melhoria da Regulação do SUS */}
          <Card className="mb-10 shadow-md print:shadow-none print:border-none card-section-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 print:bg-white border-b">
              <CardTitle className="text-2xl print:text-black">6. Recomendações para Melhoria da Regulação do SUS</CardTitle>
            </CardHeader>
            <CardContent className="p-6 print:p-4">
              {/* Versão com Tabs apenas para visualização na tela */}
              <div className="print:hidden">
                <Tabs defaultValue="sistemas" className="mt-4">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="sistemas">Sistemas</TabsTrigger>
                    <TabsTrigger value="recursos">Recursos Humanos</TabsTrigger>
                    <TabsTrigger value="governanca">Governança</TabsTrigger>
                  </TabsList>
                  <TabsContent value="sistemas">
                    <RecomendacoesRegulacao categoria="sistemas" />
                  </TabsContent>
                  <TabsContent value="recursos">
                    <RecomendacoesRegulacao categoria="recursos" />
                  </TabsContent>
                  <TabsContent value="governanca">
                    <RecomendacoesRegulacao categoria="governanca" />
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Versão corrida para PDF e impressão */}
              <div className="hidden print:block">
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-blue-700 mb-4 print:text-black">Sistemas e Tecnologia da Informação</h3>
                  <RecomendacoesRegulacao categoria="sistemas" formatoExportacao={true} />
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-purple-700 mb-4 print:text-black">Recursos Humanos</h3>
                  <RecomendacoesRegulacao categoria="recursos" formatoExportacao={true} />
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-indigo-700 mb-4 print:text-black">Governança e Gestão</h3>
                  <RecomendacoesRegulacao categoria="governanca" formatoExportacao={true} />
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 print:bg-blue-100 p-5 rounded-lg">
                <h3 className="font-medium text-xl mb-4 text-blue-800 print:text-black">Próximos passos sugeridos:</h3>
                <ol className="list-decimal list-inside text-gray-600 print:text-black space-y-3">
                  <li>Fortalecer a integração dos sistemas de informação para melhorar a coordenação entre diferentes níveis de atenção à saúde.</li>
                  <li>Investir na capacitação continuada dos profissionais envolvidos na regulação, especialmente em relação ao uso de novas tecnologias.</li>
                  <li>Estabelecer protocolos clínicos e fluxos regulatórios padronizados para garantir equidade no acesso aos serviços de saúde.</li>
                  <li>Promover a cooperação intermunicipal e regional para otimizar recursos e melhorar o acesso da população a serviços especializados.</li>
                  <li>Implementar mecanismos de monitoramento e avaliação contínua do processo regulatório para identificar oportunidades de melhoria.</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExportableView;
