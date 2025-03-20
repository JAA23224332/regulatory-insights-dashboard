import React, { useEffect, useRef } from 'react';
import { dadosReais, dadosIntensidade, termosFrequentesFortalezas, termosFrequentesFragilidades, termosCompartilhados, dadosDistribuicaoPie, estatisticasGerais } from '@/data/regulacaoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { exportToPDF } from '@/utils/exportUtils';
import { ChartContainer } from '@/components/ui/chart';

const COLORS_FORTALEZAS = ['#4CAF50']; // Verde
const COLORS_FRAGILIDADES = ['#F44336']; // Vermelho
const COLORS_PIE = ['#4CAF50', '#F44336']; // Verde e Vermelho

const Export = () => {
  const recomendacoesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (recomendacoesRef.current) {
      const style = recomendacoesRef.current.style;
      style.display = 'block';
      style.visibility = 'visible';
      style.opacity = '1';
      style.pageBreakBefore = 'always';
      style.breakBefore = 'page';
      style.border = '2px solid #000';
      style.backgroundColor = '#f9f9f9';
      style.padding = '20px';
      style.marginTop = '30px';
      style.marginBottom = '30px';
      style.zIndex = '9999';
      style.position = 'relative';

      const children = recomendacoesRef.current.querySelectorAll('*');
      children.forEach(child => {
        const childElement = child as HTMLElement;
        childElement.style.display = child.tagName.toLowerCase() === 'strong' ? 'inline' : 'block';
        childElement.style.visibility = 'visible';
        childElement.style.opacity = '1';
      });
    }
  }, []);

  useEffect(() => {
    const forceRender = () => {
      const allSections = document.querySelectorAll('.card');
      allSections.forEach(section => {
        const sectionElem = section as HTMLElement;
        sectionElem.style.display = 'block';
        sectionElem.style.visibility = 'visible';
        sectionElem.style.opacity = '1';
      });

      if (recomendacoesRef.current) {
        recomendacoesRef.current.style.display = 'block';
        recomendacoesRef.current.style.visibility = 'visible';
        recomendacoesRef.current.style.opacity = '1';
      }
    };

    forceRender();

    const timer = setTimeout(forceRender, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (recomendacoesRef.current) {
        recomendacoesRef.current.style.display = 'block';
        recomendacoesRef.current.style.visibility = 'visible';
        recomendacoesRef.current.style.opacity = '1';
      }
      
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          exportToPDF();
        });
      });
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const renderRecomendacoes = () => {
    return (
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
    );
  };

  return (
    <div className="exportable-document print-layout pb-20">
      <div className="print-title">
        Análise de <span>Fortalezas e Fragilidades</span> na Regulação do SUS
      </div>
      <div className="print-subtitle">
        Baseado em respostas de 12 Secretarias Estaduais de Saúde | 45 fortalezas e 63 fragilidades identificadas
      </div>
      
      <div className="card card-section-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
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
        
        <div className="chart-container mb-6">
          <div className="flex justify-center items-center">
            <ChartContainer 
              className="h-[400px] w-[600px]" 
              config={{
                fortalezas: { color: "#4CAF50" },
                fragilidades: { color: "#F44336" }
              }}
            >
              <PieChart>
                <Pie
                  data={dadosDistribuicaoPie}
                  cx="45%" 
                  cy="50%"
                  labelLine={true}
                  outerRadius={150} 
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {dadosDistribuicaoPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                  ))}
                </Pie>
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{ 
                    fontSize: '14px', 
                    paddingLeft: '30px',
                    right: 0,
                    width: 'auto',
                    position: 'absolute'
                  }}
                />
                <Tooltip formatter={(value, name) => [`${value} (${dadosDistribuicaoPie.find(item => item.name === name)?.percentage}%)`, name]} />
              </PieChart>
            </ChartContainer>
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
      
      <div className="card card-section-2">
        <div className="comparativo-titulo">
          2. Comparativo por Categoria
        </div>
        
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
        
        <div className="chart-container h-[500px] display-screen-only">
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
              <Tooltip />
              <Legend />
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
      
      {renderRecomendacoes()}
      
      <div className="mt-8 text-sm text-center text-gray-500">
        <p>Documento gerado com base na análise de respostas de 12 Secretarias Estaduais de Saúde.</p>
        <p>Data da geração: {new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="hidden-for-pdf-only" style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0, pointerEvents: 'none' }}>
        {renderRecomendacoes()}
      </div>
    </div>
  );
};

export default Export;
