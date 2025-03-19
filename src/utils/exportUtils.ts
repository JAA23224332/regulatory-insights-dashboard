
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { 
  dadosReais, 
  dadosIntensidade, 
  termosFrequentesFortalezas, 
  termosFrequentesFragilidades, 
  termosCompartilhados 
} from '@/data/regulacaoData';

// Function to create and download PPTX file using xlsx
export const exportToPowerPoint = () => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Create main summary data
  const summaryData = [
    ['Análise de Fortalezas e Fragilidades na Regulação do SUS'],
    ['Baseado em respostas de 12 Secretarias Estaduais de Saúde | 45 fortalezas e 63 fragilidades identificadas'],
    [''],
    ['Visão Geral'],
    ['Estados participantes', '12'],
    ['Fortalezas identificadas', '45'],
    ['Fragilidades identificadas', '63'],
    [''],
    ['Comparativo por Categoria'],
  ];
  
  // Add category data
  dadosReais.forEach(item => {
    summaryData.push([item.categoria, item.fortalezas, item.fragilidades, item.total]);
  });
  
  // Add blank line
  summaryData.push(['']);
  summaryData.push(['Destaques da análise']);
  summaryData.push(['• Sistemas de informação e tecnologia: aparece tanto como fortaleza (13 menções) quanto fragilidade (12 menções).']);
  summaryData.push(['• Protocolos e fluxos: mais frequentemente citado como fortaleza (8 menções) do que fragilidade (5 menções).']);
  summaryData.push(['• Recursos humanos e Acesso e equidade: mais frequentemente citados como fragilidades (7 menções cada) do que fortalezas (3 menções cada).']);
  
  // Create summary worksheet
  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Visão Geral');
  
  // Create fortalezas worksheet
  const fortalezasData = [
    ['Fortalezas por Categoria'],
    [''],
    ['Categoria', 'Contagem', 'Percentual']
  ];
  
  dadosReais
    .filter(item => item.fortalezas > 0)
    .sort((a, b) => b.fortalezas - a.fortalezas)
    .forEach(item => {
      const percent = (item.fortalezas / 45 * 100).toFixed(1);
      fortalezasData.push([item.categoria, item.fortalezas, `${percent}%`]);
    });
  
  fortalezasData.push(['']);
  fortalezasData.push(['Principais fortalezas identificadas']);
  fortalezasData.push(['• Sistemas e tecnologia: Uso do SISREG e outros sistemas de regulação, telemedicina e telessaúde.']);
  fortalezasData.push(['• Protocolos e fluxos: Padronização de processos, classificação de risco e priorização de atendimentos.']);
  fortalezasData.push(['• Governança e gestão: Estruturação de complexos reguladores e monitoramento de ações.']);
  
  const fortalezasWs = XLSX.utils.aoa_to_sheet(fortalezasData);
  XLSX.utils.book_append_sheet(wb, fortalezasWs, 'Fortalezas');
  
  // Create fragilidades worksheet
  const fragilidadesData = [
    ['Fragilidades por Categoria'],
    [''],
    ['Categoria', 'Contagem', 'Percentual']
  ];
  
  dadosReais
    .filter(item => item.fragilidades > 0)
    .sort((a, b) => b.fragilidades - a.fragilidades)
    .forEach(item => {
      const percent = (item.fragilidades / 63 * 100).toFixed(1);
      fragilidadesData.push([item.categoria, item.fragilidades, `${percent}%`]);
    });
  
  fragilidadesData.push(['']);
  fragilidadesData.push(['Principais fragilidades identificadas']);
  fragilidadesData.push(['• Recursos humanos: Falta de profissionais qualificados e capacitação inadequada.']);
  fragilidadesData.push(['• Acesso e equidade: Desigualdades no acesso entre regiões e municípios.']);
  fragilidadesData.push(['• Sistemas e tecnologia: Limitações dos sistemas existentes, falta de interoperabilidade.']);
  
  const fragilidadesWs = XLSX.utils.aoa_to_sheet(fragilidadesData);
  XLSX.utils.book_append_sheet(wb, fragilidadesWs, 'Fragilidades');
  
  // Create termos worksheet
  const termosData = [
    ['Termos mais Frequentes'],
    [''],
    ['Em Fortalezas'],
    ['Termo', 'Frequência']
  ];
  
  termosFrequentesFortalezas.forEach(item => {
    termosData.push([item.termo, item.frequencia]);
  });
  
  termosData.push(['']);
  termosData.push(['Em Fragilidades']);
  termosData.push(['Termo', 'Frequência']);
  
  termosFrequentesFragilidades.forEach(item => {
    termosData.push([item.termo, item.frequencia]);
  });
  
  const termosWs = XLSX.utils.aoa_to_sheet(termosData);
  XLSX.utils.book_append_sheet(wb, termosWs, 'Termos Frequentes');
  
  // Create intensidade worksheet
  const intensidadeData = [
    ['Intensidade por Categoria'],
    [''],
    ['Tema', 'Intensidade Fortalezas', 'Intensidade Fragilidades', 'Diferença']
  ];
  
  dadosIntensidade
    .sort((a, b) => b.intensidadeFortalezas - a.intensidadeFortalezas)
    .forEach(item => {
      intensidadeData.push([
        item.tema, 
        item.intensidadeFortalezas.toFixed(1), 
        item.intensidadeFragilidades.toFixed(1), 
        item.diferenca.toFixed(1)
      ]);
    });
  
  const intensidadeWs = XLSX.utils.aoa_to_sheet(intensidadeData);
  XLSX.utils.book_append_sheet(wb, intensidadeWs, 'Intensidade');
  
  // Create termos compartilhados worksheet
  const compartilhadosData = [
    ['Termos comuns entre Fortalezas e Fragilidades'],
    [''],
    ['Termo', 'Freq. Fortalezas', 'Freq. Fragilidades', 'Diferença']
  ];
  
  termosCompartilhados.forEach(item => {
    compartilhadosData.push([
      item.termo, 
      item.freqFortalezas, 
      item.freqFragilidades, 
      item.diferenca
    ]);
  });
  
  const compartilhadosWs = XLSX.utils.aoa_to_sheet(compartilhadosData);
  XLSX.utils.book_append_sheet(wb, compartilhadosWs, 'Termos Compartilhados');
  
  // Create buffer
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
  // Create blob and download
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'Analise_Regulacao_SUS.xlsx');
};

// Function to trigger PDF export
export const exportToPDF = () => {
  // Force a small delay to ensure styles are applied
  setTimeout(() => {
    // Trigger the print dialog
    window.print();
  }, 500);
};
