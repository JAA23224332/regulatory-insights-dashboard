import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { 
  dadosReais, 
  dadosIntensidade, 
  termosFrequentesFortalezas, 
  termosFrequentesFragilidades, 
  termosCompartilhados,
  estatisticasGerais
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
    summaryData.push([item.categoria, item.fortalezas.toString(), item.fragilidades.toString(), item.total.toString()]);
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
      fortalezasData.push([item.categoria, item.fortalezas.toString(), `${percent}%`]);
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
      fragilidadesData.push([item.categoria, item.fragilidades.toString(), `${percent}%`]);
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
    termosData.push([item.termo, item.frequencia.toString()]);
  });
  
  termosData.push(['']);
  termosData.push(['Em Fragilidades']);
  termosData.push(['Termo', 'Frequência']);
  
  termosFrequentesFragilidades.forEach(item => {
    termosData.push([item.termo, item.frequencia.toString()]);
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
      item.freqFortalezas.toString(), 
      item.freqFragilidades.toString(), 
      item.diferenca.toString()
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

// Completely rewritten function to export to PDF without notifications
export const exportToPDF = () => {
  // Função para forçar a visibilidade de todas as seções de recomendações
  const forceRecomendacoesVisibility = () => {
    // 1. Captura todos os possíveis elementos de recomendações
    const recomendacoesSectionId = document.getElementById('recomendacoes-section');
    const allRecomendacoesSections = document.querySelectorAll('.recomendacoes-section, .card-section-8');
    
    if (recomendacoesSectionId || allRecomendacoesSections.length > 0) {
      // 2. Força a seção específica com ID
      if (recomendacoesSectionId) {
        const style = recomendacoesSectionId.style;
        style.display = 'block';
        style.visibility = 'visible';
        style.opacity = '1';
        style.pageBreakBefore = 'always';
        style.breakBefore = 'page';
        style.position = 'relative';
        style.zIndex = '9999';
        
        // Certifica-se de que todos os filhos estejam visíveis também
        const children = recomendacoesSectionId.querySelectorAll('*');
        children.forEach(child => {
          const elem = child as HTMLElement;
          elem.style.display = child.tagName.toLowerCase() === 'strong' ? 'inline' : 'block';
          elem.style.visibility = 'visible';
          elem.style.opacity = '1';
        });
      }
      
      // 3. Força todas as seções com classes
      allRecomendacoesSections.forEach(section => {
        const sectionElem = section as HTMLElement;
        sectionElem.style.display = 'block';
        sectionElem.style.visibility = 'visible';
        sectionElem.style.opacity = '1';
        sectionElem.style.pageBreakBefore = 'always';
        sectionElem.style.breakBefore = 'page';
        sectionElem.style.position = 'relative';
        sectionElem.style.zIndex = '9999';
        
        // Certifica-se de que todos os filhos estejam visíveis também
        const children = sectionElem.querySelectorAll('*');
        children.forEach(child => {
          const elem = child as HTMLElement;
          elem.style.display = child.tagName.toLowerCase() === 'strong' ? 'inline' : 'block';
          elem.style.visibility = 'visible';
          elem.style.opacity = '1';
        });
      });
      
      return true;
    }
    
    return false;
  };
  
  // 4. Adiciona classe para indicar impressão
  document.body.classList.add('printing-pdf');
  
  // 5. Adiciona meta tag viewport com configurações específicas para impressão
  const viewportMeta = document.createElement('meta');
  viewportMeta.setAttribute('name', 'viewport');
  viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
  document.head.appendChild(viewportMeta);
  
  // 6. Forçar a visibilidade para seção de recomendações
  forceRecomendacoesVisibility();
  
  // 7. Usa setTimeout maior para garantir que os estilos sejam aplicados
  setTimeout(() => {
    // 8. Verifica a visibilidade novamente antes de imprimir
    forceRecomendacoesVisibility();
    
    // 9. Usa requestAnimationFrame para garantir que o DOM esteja atualizado
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        // Abre diálogo de impressão sem notificações
        window.print();
        
        // 10. Limpa após a impressão
        setTimeout(() => {
          document.body.classList.remove('printing-pdf');
          document.head.removeChild(viewportMeta);
        }, 1000);
      });
    });
  }, 3000); // Tempo aumentado para 3 segundos
};
