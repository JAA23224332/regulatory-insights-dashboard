
// Função para exportação de PDF que usa a funcionalidade nativa de impressão
export const exportToPDF = () => {
  // Adiciona uma classe ao body para ativar estilos específicos para impressão
  document.body.classList.add('printing-pdf');
  
  // Função mais robusta para esconder elementos de notificação antes da impressão
  const hideToastElements = () => {
    // Selecionar todos os possíveis elementos de toast/notificação
    const toastSelectors = [
      '.toaster',
      '.sonner-toast',
      '.sonner-toast-container', 
      '.sonner-toaster',
      '.toast',
      '.toast-container',
      'div[data-sonner-toaster]',
      'div[data-radix-toast-root]',
      'div[data-sonner-toast]',
      'div[data-toast-root]',
      'div[data-toast]',
      '[data-radix-toast-viewport]',
      '[data-toastify]',
      '[data-sonner-toast-group]',
      '.Toastify',
      '.Toastify__toast-container',
      '.Toastify__toast',
      '.react-hot-toast',
      '.toastify',
      '.loading-notification',
      '.export-pending',
      '.toast-progress'
    ];
    
    // Seletores para elementos de URL e barra de endereço do navegador
    const urlBarSelectors = [
      '.url-bar',
      '.browser-address',
      '.address-bar',
      '.browser-chrome',
      '.browser-url',
      '[data-browser-chrome]',
      '[data-url-display]',
      '.lovable-url',
      '.project-url',
      '.browser-interface',
      '.url-display'
    ];
    
    // Combinar todos os seletores
    const allSelectors = [...toastSelectors, ...urlBarSelectors];
    
    // Aplicar display: none e outras propriedades para garantir ocultação
    allSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          // Armazenar o estilo original para restaurar depois
          const originalDisplay = el.style.display;
          const originalVisibility = el.style.visibility;
          
          // Esconder completamente
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.height = '0';
          el.style.width = '0';
          el.style.overflow = 'hidden';
          el.setAttribute('aria-hidden', 'true');
          el.setAttribute('data-print-hidden', 'true');
          
          // Adicionar ao elemento para restaurar depois
          el.dataset.originalDisplay = originalDisplay;
          el.dataset.originalVisibility = originalVisibility;
        }
      });
    });
    
    // Também remover qualquer overlay ou backdrop que possa estar associado aos toasts
    const backdropSelectors = [
      '.toast-backdrop', 
      '.notification-backdrop',
      '.modal-backdrop',
      '.dialog-backdrop',
      '[data-backdrop]',
      '.backdrop'
    ];
    
    backdropSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
    });
    
    // Remover URLs do conteúdo da página
    const links = document.querySelectorAll('a[href*="lovable.dev"], a[href*="projects"]');
    links.forEach(link => {
      if (link instanceof HTMLElement) {
        link.style.display = 'none';
      }
    });
  };
  
  // Função para restaurar elementos após a impressão
  const restoreHiddenElements = () => {
    const elements = document.querySelectorAll('[data-print-hidden="true"]');
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        // Restaurar para os valores originais
        el.style.display = el.dataset.originalDisplay || '';
        el.style.visibility = el.dataset.originalVisibility || '';
        el.style.opacity = '';
        el.style.height = '';
        el.style.width = '';
        el.style.overflow = '';
        el.removeAttribute('aria-hidden');
        el.removeAttribute('data-print-hidden');
        
        // Limpar os dados temporários
        delete el.dataset.originalDisplay;
        delete el.dataset.originalVisibility;
      }
    });
  };
  
  // Melhor preparação de elementos visuais para impressão
  const prepareForPrint = () => {
    // Ajustar tamanho e posição dos gráficos de pizza para evitar sobreposição
    const pieCharts = document.querySelectorAll('.recharts-pie');
    pieCharts.forEach(chart => {
      if (chart instanceof SVGElement) {
        chart.style.transform = 'scale(0.7)';
        chart.style.transformOrigin = 'center';
      }
    });
    
    // Esconder completamente labels do gráfico de pizza que podem sobrepor
    const pieLabels = document.querySelectorAll('.recharts-pie-label-text, .recharts-pie-label-line');
    pieLabels.forEach(label => {
      if (label instanceof SVGElement) {
        label.style.display = 'none';
        label.style.visibility = 'hidden';
        label.style.opacity = '0';
      }
    });
    
    // Exibir legendas personalizadas para impressão
    const customLegends = document.querySelectorAll('.custom-print-pie-legend');
    customLegends.forEach(legend => {
      if (legend instanceof HTMLElement) {
        legend.style.display = 'block';
        legend.style.visibility = 'visible';
        legend.style.opacity = '1';
        legend.style.marginTop = '20px';
        legend.style.fontSize = '9pt';
        legend.style.textAlign = 'center';
      }
    });
    
    // Ajustar tamanho dos containers de gráficos
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
      if (container instanceof HTMLElement) {
        container.style.height = 'auto';
        container.style.maxHeight = '220px';
        container.style.overflow = 'visible';
        container.style.marginBottom = '30px';
      }
    });
    
    // Ajustar espaçamento entre seções
    const sections = document.querySelectorAll('.card-section-1, .card-section-2, .card-section-3, .card-section-4, .card-section-5, .card-section-6, .card-section-7, .card-section-8, .card-section-9');
    sections.forEach((section, index) => {
      if (section instanceof HTMLElement) {
        section.style.pageBreakInside = 'avoid';
        section.style.breakInside = 'avoid';
        section.style.marginBottom = '30px';
        section.style.paddingBottom = '15px';
        
        // Adicionar quebra de página para seções específicas
        if (index > 0) {
          section.style.pageBreakBefore = 'always';
          section.style.breakBefore = 'page';
          section.style.paddingTop = '15px';
        }
      }
    });
    
    // Verificar e ajustar tabelas para garantir que caibam na página
    const tables = document.querySelectorAll('.print-table');
    tables.forEach(table => {
      if (table instanceof HTMLElement) {
        table.style.width = '100%';
        table.style.fontSize = '8pt';
        table.style.pageBreakInside = 'avoid';
        table.style.breakInside = 'avoid';
        table.style.marginBottom = '20px';
      }
    });
    
    // Garantir que recomendações finais sejam exibidas corretamente
    const recomendacoes = document.getElementById('recomendacoes-section');
    if (recomendacoes) {
      recomendacoes.style.display = 'block';
      recomendacoes.style.visibility = 'visible';
      recomendacoes.style.opacity = '1';
      recomendacoes.style.pageBreakBefore = 'always';
      recomendacoes.style.breakBefore = 'page';
      recomendacoes.style.pageBreakInside = 'avoid';
      recomendacoes.style.breakInside = 'avoid';
    }
  };
  
  // Tempo para a preparação da visualização
  setTimeout(() => {
    // Esconder notificações e outros elementos que não devem aparecer na impressão
    hideToastElements();
    
    // Preparar gráficos e elementos visuais para impressão
    prepareForPrint();
    
    // Esperar um momento para garantir que os elementos foram processados
    setTimeout(() => {
      // Inicia o processo de impressão do navegador
      window.print();
      
      // Remove a classe e restaura elementos após impressão
      setTimeout(() => {
        document.body.classList.remove('printing-pdf');
        restoreHiddenElements();
      }, 1000);
    }, 200);
  }, 500);
};
