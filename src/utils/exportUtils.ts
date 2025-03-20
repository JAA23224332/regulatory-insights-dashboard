
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

    // Preparar o documento para impressão
    setTimeout(() => {
      // Esconder notificações e outros elementos que não devem aparecer na impressão
      hideToastElements();
      
      // Esperar um momento para garantir que o gráfico esteja completamente carregado
      setTimeout(() => {
        // Força o tamanho do gráfico a ocupar toda a página
        const chartContainer = document.querySelector('.chart-container');
        if (chartContainer instanceof HTMLElement) {
          chartContainer.style.height = '90vh';
          chartContainer.style.minHeight = '600px';
          chartContainer.style.display = 'block';
          chartContainer.style.visibility = 'visible';
        }
        
        // Aumenta as fontes do gráfico para melhor visibilidade na impressão
        const axisTicks = document.querySelectorAll('.recharts-cartesian-axis-tick-value');
        axisTicks.forEach(tick => {
          if (tick instanceof SVGElement) {
            tick.style.fontSize = '20pt';
            tick.style.fontWeight = '600';
          }
        });
        
        // Inicia o processo de impressão do navegador
        window.print();
        
        // Remove a classe e restaura elementos após impressão
        setTimeout(() => {
          document.body.classList.remove('printing-pdf');
          restoreHiddenElements();
        }, 1000);
      }, 500);
    }, 500);
  } catch (error) {
    console.error("Erro ao preparar impressão:", error);
    // Tentar imprimir mesmo com erro
    window.print();
  }
};
