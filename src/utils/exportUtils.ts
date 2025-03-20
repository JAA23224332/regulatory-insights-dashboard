
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
          tabela.style.marginBottom = '10px';
          
          // Ajustar as barras para melhor visualização
          const barras = tabela.querySelectorAll('td div.flex div');
          barras.forEach(barra => {
            if (barra instanceof HTMLElement) {
              barra.style.height = '8px';
              barra.style.borderRadius = '2px';
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
          insight.style.marginTop = '10px';
          insight.style.marginBottom = '10px';
          insight.style.padding = '10px';
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
          chart.style.transform = 'scale(0.8)';
          chart.style.transformOrigin = 'center';
        }
      });
      
      // Ajustar altura dos elementos que podem causar quebras de página ruins
      const heightSelectors = ['.h\\[400px\\]', '.h\\[450px\\]', '.h\\[500px\\]', '.h\\[600px\\]'];
      heightSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.height = 'auto';
            element.style.maxHeight = '250px';
          }
        });
      });
      
      // Adiciona quebra de página após a primeira seção
      const firstSection = document.querySelector('.card-section-1');
      if (firstSection && firstSection instanceof HTMLElement) {
        firstSection.style.pageBreakAfter = 'always';
        firstSection.style.breakAfter = 'page';
      }
      
      // Oculta as seções seguintes durante a impressão
      const otherSections = document.querySelectorAll('.card-section-2, .card-section-3, .card-section-4, .card-section-5, .card-section-6, .card-section-7');
      otherSections.forEach(section => {
        if (section instanceof HTMLElement) {
          section.style.display = 'none';
        }
      });
      
      // Preparar tabelas de termos frequentes para melhor visualização
      prepareTermosTables();
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
