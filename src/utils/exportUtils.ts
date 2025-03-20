
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

    // Função para garantir que os gráficos de barras sejam renderizados corretamente
    const prepareBarCharts = () => {
      // Seleciona todos os gráficos de barras
      const barCharts = document.querySelectorAll('.recharts-wrapper, .recharts-surface, .recharts-bar, .recharts-cartesian-grid');
      barCharts.forEach(chart => {
        if (chart instanceof SVGElement || chart instanceof HTMLElement) {
          chart.style.visibility = 'visible';
          chart.style.display = 'block';
          chart.style.opacity = '1';
          
          // Garantir que os elementos internos também estejam visíveis
          const children = chart.querySelectorAll('*');
          children.forEach(child => {
            if (child instanceof SVGElement || child instanceof HTMLElement) {
              child.style.visibility = 'visible';
              child.style.display = 'block';
              child.style.opacity = '1';
            }
          });
        }
      });
      
      // Garantir que os textos dos gráficos estão visíveis
      const chartTexts = document.querySelectorAll('.recharts-text, .recharts-cartesian-axis-tick-value, .recharts-label');
      chartTexts.forEach(text => {
        if (text instanceof SVGElement) {
          text.style.visibility = 'visible';
          text.style.opacity = '1';
          text.setAttribute('fill', '#000');
          text.setAttribute('font-size', '10px');
          text.setAttribute('font-weight', 'normal');
        }
      });
      
      // Garantir que as barras dos gráficos estão visíveis com cores corretas
      const chartBars = document.querySelectorAll('.recharts-bar-rectangle');
      chartBars.forEach(bar => {
        if (bar instanceof SVGElement) {
          bar.style.visibility = 'visible';
          bar.style.opacity = '1';
        }
      });
      
      // Forçar renderização dos rótulos laterais dos gráficos de barras
      const chartLabels = document.querySelectorAll('.recharts-cartesian-axis-tick');
      chartLabels.forEach(label => {
        if (label instanceof SVGElement) {
          label.style.visibility = 'visible';
          label.style.opacity = '1';
        }
      });
    };

    // Preparar o documento para impressão
    const prepareForPrint = () => {
      // Garantir que todas as seções estão visíveis e renderizadas
      const allSections = document.querySelectorAll('.card, .card-section-1, .card-section-2, .card-section-3, .card-section-4, .card-section-5, .card-section-6, .card-section-7, .card-section-8, .card-section-9, #recomendacoes-section, .recomendacoes-section');
      allSections.forEach(section => {
        if (section instanceof HTMLElement) {
          section.style.display = 'block';
          section.style.visibility = 'visible';
          section.style.opacity = '1';
        }
      });
      
      // Forçar renderização completa das recomendações
      const recomendacoesSection = document.getElementById('recomendacoes-section');
      if (recomendacoesSection) {
        recomendacoesSection.style.display = 'block';
        recomendacoesSection.style.visibility = 'visible';
        recomendacoesSection.style.opacity = '1';
        
        // Garantir que todos os itens dentro da seção também estão visíveis
        const recomendacoesItems = recomendacoesSection.querySelectorAll('*');
        recomendacoesItems.forEach(item => {
          if (item instanceof HTMLElement) {
            item.style.display = item.tagName.toLowerCase() === 'strong' ? 'inline' : 'block';
            item.style.visibility = 'visible';
            item.style.opacity = '1';
          }
        });
      }
      
      // Garantir que todos os gráficos e visualizações estejam visíveis
      const charts = document.querySelectorAll('.chart-container, .recharts-wrapper, recharts-surface');
      charts.forEach(chart => {
        if (chart instanceof HTMLElement) {
          chart.style.display = 'block';
          chart.style.visibility = 'visible';
          chart.style.opacity = '1';
          chart.style.height = 'auto';
          chart.style.minHeight = '300px';
          chart.style.pageBreakInside = 'avoid';
          chart.style.breakInside = 'avoid';
          chart.style.marginBottom = '20px';
        }
      });
      
      // Garantir que todas as visualizações de distribuição estejam visíveis
      const distributions = document.querySelectorAll('[class*="distribuicao"], [id*="distribuicao"]');
      distributions.forEach(dist => {
        if (dist instanceof HTMLElement) {
          dist.style.display = 'block';
          dist.style.visibility = 'visible';
          dist.style.opacity = '1';
          dist.style.pageBreakInside = 'avoid';
          dist.style.breakInside = 'avoid';
        }
      });
      
      // Forçar renderização dos gráficos de barras específicos
      prepareBarCharts();
      
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
      
      // Garantir que cada título de seção comece em uma nova página
      const sectionTitles = document.querySelectorAll('.card-section-2, .card-section-3, .card-section-4, .card-section-5, .card-section-6, .card-section-7, .card-section-8, .card-section-9');
      sectionTitles.forEach(section => {
        if (section instanceof HTMLElement) {
          section.style.pageBreakBefore = 'always';
          section.style.breakBefore = 'page';
          section.style.paddingTop = '10px'; // Espaço no topo para evitar corte do título
        }
      });
      
      // Garantir que os títulos das seções fiquem no topo da página
      const sectionHeaders = document.querySelectorAll('.section-title, h2.text-xl, .card h2, .comparativo-titulo');
      sectionHeaders.forEach(header => {
        if (header instanceof HTMLElement) {
          header.style.pageBreakBefore = 'auto';
          header.style.pageBreakAfter = 'avoid';
          header.style.breakAfter = 'avoid';
          header.style.marginTop = '10px';
        }
      });
      
      // Força o título principal a ficar no topo da primeira página
      const mainTitle = document.querySelector('.print-title');
      if (mainTitle instanceof HTMLElement) {
        mainTitle.style.pageBreakAfter = 'avoid';
        mainTitle.style.breakAfter = 'avoid';
        mainTitle.style.marginTop = '10px';
      }
      
      // Força o subtítulo a ficar junto com o título principal
      const subtitle = document.querySelector('.print-subtitle');
      if (subtitle instanceof HTMLElement) {
        subtitle.style.pageBreakBefore = 'avoid';
        subtitle.style.breakBefore = 'avoid';
        subtitle.style.pageBreakAfter = 'avoid';
        subtitle.style.breakAfter = 'avoid';
      }
      
      // Preparar tabelas de termos frequentes para melhor visualização
      prepareTermosTables();
    };
    
    // Tempo para a preparação da visualização - aumentado para garantir carregamento completo
    setTimeout(() => {
      // Esconder notificações e outros elementos que não devem aparecer na impressão
      hideToastElements();
      
      // Preparar gráficos e elementos visuais para impressão
      prepareForPrint();
      
      // Tempo adicional para renderização dos gráficos de barras e outras visualizações
      setTimeout(() => {
        // Segunda passada para garantir que tudo está visível
        prepareBarCharts();
        
        // Esperar um momento mais longo para garantir que os elementos foram completamente renderizados
        setTimeout(() => {
          // Inicia o processo de impressão do navegador
          window.print();
          
          // Remove a classe e restaura elementos após impressão
          setTimeout(() => {
            document.body.classList.remove('printing-pdf');
            restoreHiddenElements();
          }, 2000);
        }, 1500);
      }, 1500);
    }, 1500);
  } catch (error) {
    console.error("Erro ao preparar impressão:", error);
    // Tentar imprimir mesmo com erro, após um delay
    setTimeout(() => {
      window.print();
    }, 1500);
  }
};
