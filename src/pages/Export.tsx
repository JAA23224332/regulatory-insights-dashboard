
import React, { useEffect, useRef } from 'react';
import { dadosReais, dadosIntensidade, termosFrequentesFortalezas, termosFrequentesFragilidades, termosCompartilhados } from '@/data/regulacaoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from "@/components/ui/use-toast";
import { exportToPDF } from '@/utils/exportUtils';

// Cores para os gráficos
const COLORS_FORTALEZAS = ['#4CAF50']; // Verde
const COLORS_FRAGILIDADES = ['#F44336']; // Vermelho

// Dados para o gráfico de pizza de distribuição
const dadosDistribuicaoPie = [
  { name: 'Fortalezas', value: 45, percentage: 42 },
  { name: 'Fragilidades', value: 63, percentage: 58 },
];

const Export = () => {
  const { toast } = useToast();
  const recomendacoesRef = useRef<HTMLDivElement>(null);
  
  // Garantir que a seção de recomendações esteja visível
  useEffect(() => {
    if (recomendacoesRef.current) {
      const style = recomendacoesRef.current.style;
      style.setProperty('display', 'block', 'important');
      style.setProperty('visibility', 'visible', 'important');
      style.setProperty('opacity', '1', 'important');
      style.setProperty('page-break-before', 'always', 'important');
      style.setProperty('break-before', 'page', 'important');
      style.setProperty('border', '2px solid #000', 'important');
      style.setProperty('background-color', '#f9f9f9', 'important');
      style.setProperty('padding', '20px', 'important');
      style.setProperty('margin-top', '30px', 'important');
      style.setProperty('margin-bottom', '30px', 'important');
      style.setProperty('z-index', '9999', 'important');

      // Força visibilidade para todos os elementos filhos
      const children = recomendacoesRef.current.querySelectorAll('*');
      children.forEach(child => {
        const childElement = child as HTMLElement;
        childElement.style.setProperty('display', child.tagName.toLowerCase() === 'strong' ? 'inline' : 'block', 'important');
        childElement.style.setProperty('visibility', 'visible', 'important');
        childElement.style.setProperty('opacity', '1', 'important');
      });
    }
  }, []);

  // Trigger print dialog with delay to ensure everything renders
  useEffect(() => {
    toast({
      title: "Preparando documento para impressão",
      description: "O diálogo de impressão abrirá automaticamente em alguns segundos",
    });
    
    // Increased timeout to ensure full rendering before printing
    const timer = setTimeout(() => {
      if (recomendacoesRef.current) {
        // Verifica novamente a visibilidade antes de imprimir
        const style = recomendacoesRef.current.style;
        style.setProperty('display', 'block', 'important');
        style.setProperty('visibility', 'visible', 'important');
        style.setProperty('opacity', '1', 'important');
      }
      
      // Força atualização do DOM antes de imprimir
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          exportToPDF();
        });
      });
    }, 2500); // Tempo aumentado para garantir renderização completa
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="exportable-document print-layout">
      {/* Cabeçalho para impressão */}
      <div className="print-title">
        Análise de <span>Fortalezas e Fragilidades</span> na Regulação do SUS
      </div>
      <div className="print-subtitle">
        Baseado em respostas de 12 Secretarias Estaduais de Saúde | 45 fortalezas e 63 fragilidades identificadas
      </div>
      
      {/* Seção 1: Visão Geral */}
      <div className="card card-section-1">
        <div className="grid grid-cols-1 gap-2 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-lg font-semibold text-blue-600">12</p>
            <p className="text-sm">Estados participantes</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-lg font-semibold text-green-600">45</p>
            <p className="text-sm">Fortalezas identificadas</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-lg font-semibold text-red-600">63</p>
            <p className="text-sm">Fragilidades identificadas</p>
          </div>
        </div>
        
        {/* Gráfico de pizza para a distribuição de fortalezas e fragilidades */}
        <div className="pie-chart-container mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dadosDistribuicaoPie}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={0}
                fill="#8884d8"
                dataKey="value"
                label={false}
              >
                {dadosDistribuicaoPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#4CAF50' : '#F44336'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legendas abaixo do gráfico */}
          <div className="fortalezas-percent">Fortalezas: 42%</div>
          <div className="fragilidades-percent">Fragilidades: 58%</div>
        </div>
        
        {/* Área de principais constatações */}
        <div className="principais-constatacoes">
          <h3>Principais constatações:</h3>
          <ul>
            <li className="constatacao-red">52% dos temas aparecem com maior frequência como fragilidades</li>
            <li className="constatacao-green">38% dos temas aparecem com maior frequência como fortalezas</li>
            <li>10% dos temas apresentam equilíbrio entre fortalezas e fragilidades</li>
          </ul>
        </div>
      </div>
      
      {/* Seção 2: Comparativo */}
      <div className="card card-section-2">
        <div className="comparativo-titulo">
          2. Comparativo por Categoria
        </div>
        <div className="comparativo-notificacao">
          Exportação de PDF iniciada
          <br />
          Use a opção "Salvar como PDF" na janela de impressão para exportar o documento completo
        </div>
        
        {/* Tabela otimizada para impressão */}
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
        
        {/* Gráfico otimizado para tela, não para impressão */}
        <div className="chart-container h-[600px] display-screen-only">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dadosReais}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 180, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#333" fontSize={12} />
              <YAxis 
                type="category" 
                dataKey="categoria" 
                width={170}
                stroke="#333"
                fontSize={12}
                tickLine={false}
              />
              <Bar 
                dataKey="fortalezas" 
                name="Fortalezas" 
                fill="#4CAF50" 
                barSize={20} 
              />
              <Bar 
                dataKey="fragilidades" 
                name="Fragilidades" 
                fill="#F44336" 
                barSize={20} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Visualização simplificada para impressão */}
        <div className="display-print-only mb-3">
          <table className="print-table">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Visualização</th>
              </tr>
            </thead>
            <tbody>
              {dadosReais.map((item, index) => (
                <tr key={index}>
                  <td><strong>{item.categoria}</strong></td>
                  <td>
                    <div className="flex items-center">
                      <span style={{ 
                        display: 'inline-block',
                        width: `${item.fortalezas * 5}px`,
                        height: '10px',
                        backgroundColor: '#4CAF50',
                        marginRight: '3px'
                      }}></span>
                      <span style={{ 
                        display: 'inline-block',
                        width: `${item.fragilidades * 5}px`,
                        height: '10px',
                        backgroundColor: '#F44336'
                      }}></span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-gray-700 mt-1 mb-3">
            <span className="inline-block w-3 h-3 bg-green-600 mr-1"></span> Fortalezas
            <span className="inline-block w-3 h-3 bg-red-600 ml-3 mr-1"></span> Fragilidades
          </div>
        </div>
        
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
      
      {/* Seção 3: Fortalezas */}
      <div className="card card-section-3">
        <h2 className="text-xl font-semibold mb-4">Fortalezas por Categoria</h2>
        
        <table className="print-table mb-6">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Contagem</th>
              <th>Percentual</th>
            </tr>
          </thead>
          <tbody>
            {dadosReais
              .filter(item => item.fortalezas > 0)
              .sort((a, b) => b.fortalezas - a.fortalezas)
              .map((item, index) => {
                const percent = (item.fortalezas / 45 * 100).toFixed(1);
                return (
                  <tr key={index}>
                    <td>{item.categoria}</td>
                    <td>{item.fortalezas}</td>
                    <td>{percent}%</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        
        <h3 className="font-medium text-lg mb-4">Principais fortalezas identificadas:</h3>
        <ul className="space-y-2">
          <li>• <strong>Sistemas e tecnologia</strong>: Uso do SISREG e outros sistemas de regulação, telemedicina e telessaúde.</li>
          <li>• <strong>Protocolos e fluxos</strong>: Padronização de processos, classificação de risco e priorização de atendimentos.</li>
          <li>• <strong>Governança e gestão</strong>: Estruturação de complexos reguladores e monitoramento de ações.</li>
          <li>• <strong>Integração de níveis</strong>: Articulação entre atenção primária e especializada.</li>
        </ul>
      </div>
      
      {/* Seção 4: Fragilidades */}
      <div className="card card-section-4">
        <h2 className="text-xl font-semibold mb-4">Fragilidades por Categoria</h2>
        
        <table className="print-table mb-6">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Contagem</th>
              <th>Percentual</th>
            </tr>
          </thead>
          <tbody>
            {dadosReais
              .filter(item => item.fragilidades > 0)
              .sort((a, b) => b.fragilidades - a.fragilidades)
              .map((item, index) => {
                const percent = (item.fragilidades / 63 * 100).toFixed(1);
                return (
                  <tr key={index}>
                    <td>{item.categoria}</td>
                    <td>{item.fragilidades}</td>
                    <td>{percent}%</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        
        <h3 className="font-medium text-lg mb-4">Principais fragilidades identificadas:</h3>
        <ul className="space-y-2">
          <li>• <strong>Recursos humanos</strong>: Falta de profissionais qualificados e capacitação inadequada.</li>
          <li>• <strong>Acesso e equidade</strong>: Desigualdades no acesso entre regiões e municípios.</li>
          <li>• <strong>Sistemas e tecnologia</strong>: Limitações dos sistemas existentes, falta de interoperabilidade.</li>
          <li>• <strong>Integração de níveis</strong>: Falta de articulação entre os diferentes níveis de atenção.</li>
          <li>• <strong>Regionalização</strong>: Dificuldades na implementação da regionalização da saúde.</li>
        </ul>
      </div>
      
      {/* Seção 5: Intensidade das categorias */}
      <div className="card card-section-5">
        <h2 className="text-xl font-semibold mb-4">Intensidade por Categoria</h2>
        
        <table className="print-table mb-6">
          <thead>
            <tr>
              <th>Tema</th>
              <th>Intensidade Fortalezas</th>
              <th>Intensidade Fragilidades</th>
              <th>Diferença</th>
            </tr>
          </thead>
          <tbody>
            {dadosIntensidade
              .sort((a, b) => b.intensidadeFortalezas - a.intensidadeFortalezas)
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.tema}</td>
                  <td>{item.intensidadeFortalezas.toFixed(1)}</td>
                  <td>{item.intensidadeFragilidades.toFixed(1)}</td>
                  <td className={item.diferenca > 0 ? 'text-green-700' : 'text-red-700'}>
                    {item.diferenca.toFixed(1)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        
        <p className="text-sm mb-4">
          <em>Nota: A intensidade é calculada como a média ponderada da frequência de menções pelo número de estados participantes.</em>
        </p>
      </div>
      
      {/* Seção 6: Termos frequentes */}
      <div className="card card-section-6">
        <h2 className="text-xl font-semibold mb-4">Termos mais Frequentes</h2>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-4 text-green-700">Em Fortalezas:</h3>
            <table className="print-table">
              <thead>
                <tr>
                  <th>Termo</th>
                  <th>Frequência</th>
                </tr>
              </thead>
              <tbody>
                {termosFrequentesFortalezas.map((item, index) => (
                  <tr key={index}>
                    <td>{item.termo}</td>
                    <td>{item.frequencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 text-red-700">Em Fragilidades:</h3>
            <table className="print-table">
              <thead>
                <tr>
                  <th>Termo</th>
                  <th>Frequência</th>
                </tr>
              </thead>
              <tbody>
                {termosFrequentesFragilidades.map((item, index) => (
                  <tr key={index}>
                    <td>{item.termo}</td>
                    <td>{item.frequencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Seção 7: Termos compartilhados */}
      <div className="card card-section-7">
        <h2 className="text-xl font-semibold mb-4">Termos comuns entre Fortalezas e Fragilidades</h2>
        
        <table className="print-table">
          <thead>
            <tr>
              <th>Termo</th>
              <th>Freq. Fortalezas</th>
              <th>Freq. Fragilidades</th>
              <th>Diferença</th>
            </tr>
          </thead>
          <tbody>
            {termosCompartilhados.map((item, index) => (
              <tr key={index}>
                <td>{item.termo}</td>
                <td>{item.freqFortalezas}</td>
                <td>{item.freqFragilidades}</td>
                <td className={item.diferenca > 0 ? 'text-green-700' : (item.diferenca < 0 ? 'text-red-700' : '')}>
                  {item.diferenca > 0 ? '+' : ''}{item.diferenca}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Seção 8: Recomendações - COMPLETAMENTE REESCRITA E REFORÇADA */}
      <div 
        id="recomendacoes-section" 
        ref={recomendacoesRef}
        className="card card-section-8 recomendacoes-section"
        style={{
          display: 'block',
          visibility: 'visible',
          pageBreakBefore: 'always',
          breakBefore: 'page',
          border: '2px solid #000',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          marginTop: '30px',
          marginBottom: '30px',
          zIndex: 9999,
          position: 'relative',
          opacity: 1
        }}
      >
        <h2 
          className="text-xl font-semibold mb-4 recomendacoes-title"
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            fontSize: '18pt',
            fontWeight: 700,
            marginBottom: '25px',
            borderBottom: '2px solid #000',
            paddingBottom: '10px',
            color: '#000'
          }}
        >
          Recomendações para Melhoria da Regulação no SUS
        </h2>
        
        <ul 
          className="space-y-4 recomendacoes-list"
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            listStyleType: 'disc',
            paddingLeft: '20px',
            margin: '20px 0'
          }}
        >
          <li 
            className="recomendacao-item"
            style={{
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              marginBottom: '20px',
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
          >
            <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
              Sistemas de informação e tecnologia:
            </strong> 
            <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
              Investir em tecnologias mais integradas e interoperáveis, modernizando sistemas existentes como o SISREG. Expandir o uso de telemedicina e telessaúde para ampliar o acesso nas regiões remotas.
            </p>
          </li>
          
          <li 
            className="recomendacao-item"
            style={{
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              marginBottom: '20px',
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
          >
            <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
              Protocolos e processos:
            </strong> 
            <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
              Padronizar nacionalmente protocolos de regulação e classificação de risco, construindo diretrizes que possam ser adaptadas às realidades locais.
            </p>
          </li>
          
          <li 
            className="recomendacao-item"
            style={{
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              marginBottom: '20px',
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
          >
            <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
              Recursos humanos:
            </strong> 
            <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
              Desenvolver programas de capacitação continuada e estabelecer carreiras específicas para profissionais de regulação, principalmente médicos reguladores.
            </p>
          </li>
          
          <li 
            className="recomendacao-item"
            style={{
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              marginBottom: '20px',
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
          >
            <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
              Integração entre níveis de atenção:
            </strong> 
            <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
              Fortalecer a comunicação entre a atenção primária e especializada, usando sistemas como referência e contrarreferência eletrônicas.
            </p>
          </li>
          
          <li 
            className="recomendacao-item"
            style={{
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              marginBottom: '20px',
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
          >
            <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
              Regionalização:
            </strong> 
            <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
              Fortalecer os processos de regionalização, garantindo que os municípios-polo cumpram seu papel assistencial conforme planejado nos PDRs.
            </p>
          </li>
          
          <li 
            className="recomendacao-item"
            style={{
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              marginBottom: '20px',
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
          >
            <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
              Política integrada:
            </strong> 
            <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
              Desenvolver uma política nacional de regulação integrada, com diretrizes claras e incentivos para implementação em todos os níveis.
            </p>
          </li>
        </ul>
      </div>
      
      {/* Rodapé com informações sobre o documento */}
      <div className="mt-8 text-sm text-center text-gray-500">
        <p>Documento gerado com base na análise de respostas de 12 Secretarias Estaduais de Saúde.</p>
        <p>Data da geração: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Export;
