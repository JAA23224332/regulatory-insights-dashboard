
// Função para exportação de PDF que usa a funcionalidade nativa de impressão
export const exportToPDF = () => {
  try {
    // Adiciona uma classe ao body para ativar estilos específicos para impressão
    document.body.classList.add('printing-pdf');
    
    // Função para esconder elementos de notificação antes da impressão
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
        'div[data-radix-toast-viewport]',
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
      
      // Aplicar display: none para garantir ocultação
      allSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            // Armazenar o estilo original para restaurar depois
            const originalDisplay = el.style.display;
            
            // Esconder completamente
            el.style.display = 'none';
            el.setAttribute('data-print-hidden', 'true');
            
            // Adicionar ao elemento para restaurar depois
            el.dataset.originalDisplay = originalDisplay;
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
          el.removeAttribute('data-print-hidden');
          
          // Limpar os dados temporários
          delete el.dataset.originalDisplay;
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
          tabela.style.marginBottom = '20px';
          
          // Ajustar as barras para melhor visualização
          const barras = tabela.querySelectorAll('td div.flex div');
          barras.forEach(barra => {
            if (barra instanceof HTMLElement) {
              barra.style.height = '12px';
              barra.style.borderRadius = '3px';
              barra.style.minWidth = '10px';
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
          insight.style.marginTop = '20px';
          insight.style.marginBottom = '20px';
          insight.style.padding = '15px';
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
        }
      });
      
      // Aplicar transformações para evitar sobreposições
      const pieCharts = document.querySelectorAll('.recharts-pie');
      pieCharts.forEach(chart => {
        if (chart instanceof SVGElement) {
          chart.style.transform = 'scale(0.85)';
          chart.style.transformOrigin = 'center';
        }
      });
      
      // Otimizar altura dos elementos para preencher melhor a página
      const heightSelectors = ['.h\\[400px\\]', '.h\\[450px\\]', '.h\\[500px\\]', '.h\\[600px\\]'];
      heightSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.height = 'auto';
            element.style.maxHeight = '480px';
          }
        });
      });
      
      // Garantir que cada título de seção comece em uma nova página
      const sectionTitles = document.querySelectorAll('.card-section-2, .card-section-3, .card-section-4, .card-section-5, .card-section-6, .card-section-7, .card-section-8, .card-section-9');
      sectionTitles.forEach(section => {
        if (section instanceof HTMLElement) {
          section.style.pageBreakBefore = 'always';
          section.style.breakBefore = 'page';
          section.style.paddingTop = '30px';
        }
      });
      
      // Garantir que os títulos das seções fiquem no topo da página
      const sectionHeaders = document.querySelectorAll('.section-title, h2.text-xl, .card h2, .comparativo-titulo');
      sectionHeaders.forEach(header => {
        if (header instanceof HTMLElement) {
          header.style.pageBreakBefore = 'auto';
          header.style.pageBreakAfter = 'avoid';
          header.style.breakAfter = 'avoid';
          header.style.marginTop = '20px';
        }
      });
      
      // Força o título principal a ficar no topo da primeira página
      const mainTitle = document.querySelector('.print-title');
      if (mainTitle instanceof HTMLElement) {
        mainTitle.style.pageBreakAfter = 'avoid';
        mainTitle.style.breakAfter = 'avoid';
        mainTitle.style.marginTop = '30px';
      }
      
      // Força o subtítulo a ficar junto com o título principal
      const subtitle = document.querySelector('.print-subtitle');
      if (subtitle instanceof HTMLElement) {
        subtitle.style.pageBreakBefore = 'avoid';
        subtitle.style.breakBefore = 'avoid';
        subtitle.style.pageBreakAfter = 'avoid';
        subtitle.style.breakAfter = 'avoid';
      }
      
      // Maximizar o tamanho da área de gráficos
      const chartContainers = document.querySelectorAll('.chart-container, .pie-chart-container');
      chartContainers.forEach(container => {
        if (container instanceof HTMLElement) {
          container.style.height = 'auto';
          container.style.maxHeight = '380px';
          container.style.pageBreakInside = 'avoid';
          container.style.breakInside = 'avoid';
          container.style.marginBottom = '25px';
        }
      });
      
      // Aumentar o espaço para as barras de comparação
      const barCharts = document.querySelectorAll('.recharts-bar-rectangle');
      barCharts.forEach(bar => {
        if (bar instanceof SVGElement) {
          bar.style.transform = 'scaleY(1.2)';
          bar.style.transformOrigin = 'bottom';
        }
      });
      
      // Preparar tabelas de termos frequentes para melhor visualização
      prepareTermosTables();
      
      // Aumentar o tamanho das fontes em todos os textos para melhorar legibilidade
      const textElements = document.querySelectorAll('p, span, li, td, th, h3, h4, h5, h6');
      textElements.forEach(element => {
        if (element instanceof HTMLElement) {
          const currentSize = window.getComputedStyle(element).fontSize;
          const numericSize = parseFloat(currentSize);
          if (numericSize < 12) {
            element.style.fontSize = '12pt';
          }
        }
      });
      
      // Ajustar margens para melhor uso do espaço na página
      const contentSections = document.querySelectorAll('.card, .card-content, .section-content');
      contentSections.forEach(section => {
        if (section instanceof HTMLElement) {
          section.style.padding = '12px';
          section.style.margin = '15px 0';
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
    }, 500);
  } catch (error) {
    console.error("Erro ao preparar impressão:", error);
    // Tentar imprimir mesmo com erro
    window.print();
  }
};
