
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
  
  // Função para preparar as tabelas de termos frequentes para impressão
  const prepareTermosTables = () => {
    // Melhorar o layout das tabelas de termos frequentes
    const termosTabelas = document.querySelectorAll('.card-section-6 .display-print-only table, .card-section-7 .display-print-only table');
    termosTabelas.forEach(tabela => {
      if (tabela instanceof HTMLElement) {
        tabela.style.pageBreakInside = 'avoid';
        tabela.style.breakInside = 'avoid';
        tabela.style.marginBottom = '10px';
        
        // Ajustar as barras para melhor visualização
        const barras = tabela.querySelectorAll('td div.flex div');
        barras.forEach(barra => {
          if (barra instanceof HTMLElement) {
            barra.style.height = '6px';
            barra.style.borderRadius = '1px';
            barra.style.minWidth = '5px';
          }
        });
      }
    });
    
    // Garantir que os insights não sejam cortados
    const insights = document.querySelectorAll('.bg-gray-50');
    insights.forEach(insight => {
      if (insight instanceof HTMLElement) {
        insight.style.pageBreakInside = 'avoid';
        insight.style.breakInside = 'avoid';
        insight.style.marginTop = '8px';
        insight.style.marginBottom = '8px';
        insight.style.padding = '6px';
      }
    });
  };

  // Preparar o documento para impressão
  const prepareForPrint = () => {
    // Simplificar e limpar renderização de gráficos para impressão
    const pieChartLabels = document.querySelectorAll('.recharts-pie-label-text');
    pieChartLabels.forEach(label => {
      if (label instanceof HTMLElement) {
        label.style.display = 'none';
      }
    });
    
    const pieChartLabelLines = document.querySelectorAll('.recharts-pie-label-line');
    pieChartLabelLines.forEach(line => {
      if (line instanceof HTMLElement) {
        line.style.display = 'none';
      }
    });
    
    // Exibir legendas personalizadas para impressão
    const customLegends = document.querySelectorAll('.custom-print-pie-legend');
    customLegends.forEach(legend => {
      if (legend instanceof HTMLElement) {
        legend.style.display = 'block';
        legend.style.visibility = 'visible';
        legend.style.opacity = '1';
      }
    });
    
    // Aplicar transformações para evitar sobreposições
    const pieCharts = document.querySelectorAll('.recharts-pie');
    pieCharts.forEach(chart => {
      if (chart instanceof SVGElement) {
        chart.style.transform = 'scale(0.7)';
        chart.style.transformOrigin = 'center';
      }
    });
    
    // Preparar tabelas de termos frequentes para melhor visualização
    prepareTermosTables();
    
    // Reduzir espaçamento entre elementos
    const cardHeaders = document.querySelectorAll('.card-header, .CardHeader');
    cardHeaders.forEach(header => {
      if (header instanceof HTMLElement) {
        header.style.padding = '4px';
        header.style.marginBottom = '0';
      }
    });
    
    const cardTitles = document.querySelectorAll('.card-title, .CardTitle');
    cardTitles.forEach(title => {
      if (title instanceof HTMLElement) {
        title.style.fontSize = '12pt';
        title.style.margin = '0';
      }
    });
    
    // Garantir que as tabelas apareçam corretamente
    const tables = document.querySelectorAll('.display-print-only table');
    tables.forEach(table => {
      if (table instanceof HTMLElement) {
        table.style.display = 'table';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.margin = '4px 0';
        
        // Reduzir espaçamento nas células
        const cells = table.querySelectorAll('th, td');
        cells.forEach(cell => {
          if (cell instanceof HTMLElement) {
            cell.style.padding = '2px';
            cell.style.fontSize = '7pt';
          }
        });
      }
    });
    
    // Certifique-se de que os gráficos e tabelas não se sobreponham
    const chartContainers = document.querySelectorAll('.h-[400px], .h-[450px], .h-[500px], .h-[600px]');
    chartContainers.forEach(container => {
      if (container instanceof HTMLElement) {
        container.style.height = '150px';
      }
    });
  };
  
  // Tempo para a preparação da visualização
  setTimeout(() => {
    // Esconder notificações e outros elementos que não devem aparecer na impressão
    hideToastElements();
    
    // Preparar gráficos e elementos visuais para impressão
    prepareForPrint();
    
    // Esperar um momento para garantir que os elementos foram escondidos
    setTimeout(() => {
      // Inicia o processo de impressão do navegador
      window.print();
      
      // Remove a classe e restaura elementos após impressão
      setTimeout(() => {
        document.body.classList.remove('printing-pdf');
        restoreHiddenElements();
      }, 1000);
    }, 300);
  }, 500); // Aumentando o tempo de espera para garantir que todos os elementos estejam carregados
};
