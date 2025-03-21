
// Função para exportação de PDF que usa a funcionalidade nativa de impressão
export const exportToPDF = () => {
  try {
    console.log("Iniciando processo de exportação para PDF");
    
    // Adiciona uma classe ao body para ativar estilos específicos para impressão
    document.body.classList.add('printing-pdf');
    
    // Função para esconder elementos de notificação antes da impressão
    const hideToastElements = () => {
      console.log("Ocultando elementos de notificação");
      
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
      console.log("Restaurando elementos ocultos");
      
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
      console.log("Preparando tabelas de termos");
      
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
      console.log("Preparando gráficos de barras");
      
      // Forçar visibilidade de todos os elementos SVG na página
      const forceAllSvgVisible = () => {
        const allSvgs = document.querySelectorAll('svg');
        allSvgs.forEach(svg => {
          // Aplicar apenas se for SVGElement
          if (svg instanceof SVGElement) {
            // Usar setAttribute para SVGElements como boa prática
            svg.setAttribute('style', 'display: block; visibility: visible; opacity: 1;');
            
            // Também forçar a exibição de todos os elementos dentro do SVG
            const allSvgElements = svg.querySelectorAll('*');
            allSvgElements.forEach(el => {
              if (el instanceof SVGElement) {
                el.setAttribute('style', 'visibility: visible; display: block; opacity: 1;');
              }
            });
          }
        });
      };
      
      // Forçar visibilidade de todos os elementos SVG
      forceAllSvgVisible();
      
      // Seleciona todos os gráficos de barras
      const barCharts = document.querySelectorAll('.recharts-wrapper, .recharts-surface, .recharts-bar, .recharts-cartesian-grid');
      barCharts.forEach(chart => {
        if (chart instanceof HTMLElement) {
          chart.style.visibility = 'visible';
          chart.style.display = 'block';
          chart.style.opacity = '1';
          chart.setAttribute('data-force-visible', 'true');
          
          // Forçar um repaint do elemento (apenas para HTMLElement)
          const display = chart.style.display;
          chart.style.display = 'none';
          setTimeout(() => { chart.style.display = display; }, 10);
          
          // Garantir que os elementos internos também estejam visíveis
          const children = chart.querySelectorAll('*');
          children.forEach(child => {
            if (child instanceof HTMLElement) {
              child.style.visibility = 'visible';
              child.style.display = 'block';
              child.style.opacity = '1';
            } else if (child instanceof SVGElement) {
              child.setAttribute('style', 'visibility: visible; display: block; opacity: 1;');
            }
          });
        } else if (chart instanceof SVGElement) {
          // Usar setAttribute para SVGElements como boa prática
          chart.setAttribute('style', 'visibility: visible; display: block; opacity: 1;');
          chart.setAttribute('data-force-visible', 'true');
          
          // Garantir que os elementos internos também estejam visíveis
          const children = chart.querySelectorAll('*');
          children.forEach(child => {
            if (child instanceof SVGElement) {
              child.setAttribute('style', 'visibility: visible; display: block; opacity: 1;');
            }
          });
        }
      });
      
      // Garantir que os textos dos gráficos estão visíveis
      const chartTexts = document.querySelectorAll('.recharts-text, .recharts-cartesian-axis-tick-value, .recharts-label');
      chartTexts.forEach(text => {
        if (text instanceof SVGElement) {
          text.setAttribute('style', 'visibility: visible; opacity: 1;');
          text.setAttribute('fill', '#000');
          text.setAttribute('font-size', '10px');
          text.setAttribute('font-weight', 'normal');
        }
      });
      
      // Adicionar estilos inline para forçar a visibilidade dos gráficos
      const chartContainers = document.querySelectorAll('.chart-container, [class*="chart"], [id*="chart"]');
      chartContainers.forEach(container => {
        if (container instanceof HTMLElement) {
          container.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            height: auto !important;
            min-height: 300px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin-bottom: 20px !important;
            position: relative !important;
            z-index: 999 !important;
          `;
        }
      });
    };

    // Preparar o documento para impressão
    const prepareForPrint = () => {
      console.log("Preparando documento para impressão");
      
      // Forçar visibilidade de todas as seções
      const forceAllSectionsVisible = () => {
        console.log("Forçando visibilidade de todas as seções");
        
        // Lista de todos os seletores que queremos garantir que estejam visíveis
        const criticalSelectors = [
          '.exportable-document',
          '.print-layout',
          '.card', 
          '.card-section-1', 
          '.card-section-2', 
          '.card-section-3', 
          '.card-section-4', 
          '.card-section-5', 
          '.card-section-6', 
          '.card-section-7', 
          '.card-section-8', 
          '.card-section-9',
          '#recomendacoes-section',
          '.recomendacoes-section',
          '.chart-container',
          '.recharts-wrapper',
          'svg',
          '.recharts-surface'
        ];
        
        criticalSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative !important;
                z-index: 999 !important;
              `;
              
              // Adicionar atributo personalizado para debug
              el.setAttribute('data-export-visible', 'true');
              
              // Force a reflow/repaint of the element (apenas para HTMLElement)
              // eslint-disable-next-line no-void
              void el.offsetHeight;
            } else if (el instanceof SVGElement) {
              // Para SVGElement usamos setAttribute
              el.setAttribute('style', 'display: block; visibility: visible; opacity: 1; position: relative; z-index: 999;');
              el.setAttribute('data-export-visible', 'true');
            }
          });
        });
      };
      
      // Garantir que todas as seções estão visíveis e renderizadas
      forceAllSectionsVisible();
      
      // Forçar renderização completa das recomendações
      const recomendacoesSection = document.getElementById('recomendacoes-section');
      if (recomendacoesSection && recomendacoesSection instanceof HTMLElement) {
        recomendacoesSection.style.cssText = `
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          page-break-before: always !important;
          break-before: page !important;
          border: 2px solid #000 !important;
          background-color: #f9f9f9 !important;
          padding: 20px !important;
          margin-top: 30px !important;
          margin-bottom: 30px !important;
          z-index: 9999 !important;
          position: relative !important;
        `;
        
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
      
      // Garantir que todos os gráficos estejam visíveis
      const charts = document.querySelectorAll('.chart-container, .recharts-wrapper, .recharts-surface');
      charts.forEach(chart => {
        if (chart instanceof HTMLElement) {
          chart.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            height: auto !important;
            min-height: 300px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin-bottom: 20px !important;
            position: relative !important;
            z-index: 999 !important;
          `;
          
          // Forçar um repaint (apenas para HTMLElement)
          void chart.offsetHeight;
        } else if (chart instanceof SVGElement) {
          // Para SVGElements usamos setAttribute
          chart.setAttribute('style', 'display: block; visibility: visible; opacity: 1; height: auto; min-height: 300px; position: relative; z-index: 999;');
          
          // Forçar renderização para SVG de maneira diferente que HTMLElement
          const temp = chart.getAttribute('data-temp') || '0';
          chart.setAttribute('data-temp', String(parseInt(temp) + 1));
        }
      });
      
      // Garantir que os gráficos de pizza e componentes do Recharts estejam visíveis
      prepareBarCharts();
      
      // Exibir legendas personalizadas para impressão
      const customLegends = document.querySelectorAll('.custom-print-pie-legend');
      customLegends.forEach(legend => {
        if (legend instanceof HTMLElement) {
          legend.style.display = 'block';
          legend.style.visibility = 'visible';
          legend.style.opacity = '1';
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
          section.style.paddingTop = '10px';
        }
      });
      
      // Preparar tabelas de termos frequentes para melhor visualização
      prepareTermosTables();
    };
    
    console.log("Iniciando sequência de preparação para impressão");
    
    // Tempo para a preparação da visualização - aumentado para garantir carregamento completo
    setTimeout(() => {
      console.log("Fase 1: Escondendo toasts e elementos da interface");
      
      // Esconder notificações e outros elementos que não devem aparecer na impressão
      hideToastElements();
      
      setTimeout(() => {
        console.log("Fase 2: Preparando visualizações e gráficos");
        
        // Preparar gráficos e elementos visuais para impressão
        prepareForPrint();
        
        setTimeout(() => {
          console.log("Fase 3: Verificações finais e ajustes");
          
          // Segunda passada para garantir que tudo está visível
          prepareBarCharts();
          
          // Verificação final de visibilidade para todos os elementos críticos
          document.querySelectorAll('.card, svg, .chart-container').forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.cssText += `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
              `;
            } else if (el instanceof SVGElement) {
              el.setAttribute('style', 'display: block; visibility: visible; opacity: 1;');
            }
          });
          
          setTimeout(() => {
            console.log("Fase 4: Iniciando impressão do navegador");
            
            // Última verificação do estado das recomendações
            const recomendacoes = document.getElementById('recomendacoes-section');
            if (recomendacoes && recomendacoes instanceof HTMLElement) {
              console.log("Status das recomendações:", {
                display: recomendacoes.style.display,
                visibility: recomendacoes.style.visibility,
                opacity: recomendacoes.style.opacity
              });
            }
            
            // Inicia o processo de impressão do navegador
            window.print();
            
            // Remove a classe e restaura elementos após impressão
            setTimeout(() => {
              console.log("Fase 5: Limpeza após impressão");
              document.body.classList.remove('printing-pdf');
              restoreHiddenElements();
            }, 3000);
          }, 3000);
        }, 3000);
      }, 3000);
    }, 3000);
  } catch (error) {
    console.error("Erro ao preparar impressão:", error);
    
    // Tentar imprimir mesmo com erro, após um delay
    setTimeout(() => {
      console.log("Tentando impressão de emergência após erro");
      window.print();
    }, 3000);
  }
};
