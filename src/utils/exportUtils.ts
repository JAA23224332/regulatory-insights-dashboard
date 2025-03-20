
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

// Rewritten function for PDF export with better spacing and no notifications
export const exportToPDF = () => {
  // Add print-mode class to the body to activate specific print styles
  document.body.classList.add('printing-pdf');
  
  // Adjust spacing for print to prevent overlapping
  const adjustSpacingForPrint = () => {
    // Adjust card spacings
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      cardElement.style.marginBottom = '30px';
      cardElement.style.pageBreakInside = 'avoid';
      cardElement.style.breakInside = 'avoid';
    });
    
    // Adjust table spacing
    const tables = document.querySelectorAll('.print-table');
    tables.forEach((table) => {
      const tableElement = table as HTMLElement;
      tableElement.style.fontSize = '10pt';
      tableElement.style.width = '100%';
      tableElement.style.tableLayout = 'fixed';
      tableElement.style.marginBottom = '15px';
    });
    
    // ENHANCED FIX for statistics text overlap issue
    const statsItems = document.querySelectorAll('.principais-constatacoes li');
    statsItems.forEach((item) => {
      const itemElement = item as HTMLElement;
      itemElement.style.marginBottom = '25px';  // Increased spacing between items
      itemElement.style.lineHeight = '1.5';
      itemElement.style.pageBreakInside = 'avoid';
      itemElement.style.breakInside = 'avoid';
      itemElement.style.display = 'flex';
      itemElement.style.alignItems = 'flex-start';
      itemElement.style.maxWidth = '100%';
      
      // Separate the bullet from the text to prevent overlap
      const bulletSpan = itemElement.querySelector('span:first-child');
      const textSpan = itemElement.querySelector('span:last-child');
      
      if (bulletSpan) {
        (bulletSpan as HTMLElement).style.marginRight = '12px';  // Increased spacing
        (bulletSpan as HTMLElement).style.flexShrink = '0';
        (bulletSpan as HTMLElement).style.marginTop = '2px';
      }
      
      if (textSpan) {
        (textSpan as HTMLElement).style.fontSize = '11pt';  // Slightly larger font
        (textSpan as HTMLElement).style.lineHeight = '1.6';  // Better line height
        (textSpan as HTMLElement).style.display = 'block';
        (textSpan as HTMLElement).style.width = 'calc(100% - 25px)';  // More space for text
        (textSpan as HTMLElement).style.wordWrap = 'break-word';
        (textSpan as HTMLElement).style.whiteSpace = 'normal';
        (textSpan as HTMLElement).style.color = '#000';
        (textSpan as HTMLElement).style.fontWeight = 'normal';
        (textSpan as HTMLElement).style.overflow = 'visible';
        
        // Make sure strong tags are visible
        const strongElements = textSpan.querySelectorAll('strong');
        strongElements.forEach((strong) => {
          (strong as HTMLElement).style.fontWeight = 'bold';
          (strong as HTMLElement).style.fontSize = '11pt';
          (strong as HTMLElement).style.color = '#000';
        });
      }
    });
    
    // Ensure recommendation section is visible
    const recomendacoesSection = document.getElementById('recomendacoes-section');
    if (recomendacoesSection) {
      recomendacoesSection.style.display = 'block';
      recomendacoesSection.style.visibility = 'visible';
      recomendacoesSection.style.opacity = '1';
      recomendacoesSection.style.pageBreakBefore = 'always';
      recomendacoesSection.style.breakBefore = 'page';
      
      // Force all children to be visible
      const children = recomendacoesSection.querySelectorAll('*');
      children.forEach(child => {
        const elem = child as HTMLElement;
        elem.style.display = child.tagName.toLowerCase() === 'strong' ? 'inline' : 'block';
        elem.style.visibility = 'visible';
        elem.style.opacity = '1';
      });
    }
  };
  
  // Add specific print stylesheet for better control
  const addPrintStyles = () => {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'print-specific-styles';
    styleSheet.innerHTML = `
      @media print {
        body { font-size: 11pt; line-height: 1.3; }
        .card { margin-bottom: 25px; page-break-inside: avoid; break-inside: avoid; }
        
        /* Specifically fix stats text overlap */
        .principais-constatacoes li { 
          display: flex !important;
          align-items: flex-start !important;
          padding-left: 0 !important; 
          text-indent: 0 !important; 
          margin-bottom: 25px !important; 
          line-height: 1.6 !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          max-width: 100% !important;
        }
        
        .principais-constatacoes li span:first-child { 
          margin-right: 12px !important;
          flex-shrink: 0 !important;
          margin-top: 2px !important;
        }
        
        .principais-constatacoes li span:last-child { 
          font-size: 11pt !important; 
          line-height: 1.6 !important; 
          display: block !important;
          width: calc(100% - 25px) !important;
          word-wrap: break-word !important;
          white-space: normal !important;
          color: #000 !important;
          font-weight: normal !important;
          overflow: visible !important;
        }
        
        .principais-constatacoes li span:last-child strong {
          font-weight: bold !important;
          font-size: 11pt !important;
          color: #000 !important;
        }
        
        /* Ensure proper page breaks */
        .card-section-3, .card-section-4, .card-section-5, .card-section-6, .card-section-7, .card-section-8 {
          page-break-before: always;
          break-before: page;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  };
  
  // Execute all adjustments before printing
  adjustSpacingForPrint();
  const removeStyles = addPrintStyles();
  
  // Delay printing to ensure DOM updates have been applied
  setTimeout(() => {
    window.print();
    
    // Clean up after printing
    setTimeout(() => {
      document.body.classList.remove('printing-pdf');
      removeStyles();
    }, 1000);
  }, 800);
};
