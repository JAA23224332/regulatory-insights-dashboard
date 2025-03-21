
/**
 * Simplified PDF export function that focuses on reliability rather than
 * complex styling. This approach uses the browser's native print functionality
 * with minimal pre-processing to avoid potential issues.
 */
export const simplifiedExportToPDF = () => {
  console.log("Iniciando processo simplificado de exportação para PDF");
  
  try {
    // 1. Adicionar classe para estilos de impressão
    document.body.classList.add('printing-pdf');
    
    // 2. Esconder elementos de interface
    const hideElements = () => {
      // Ocultar notificações
      const elementsToHide = document.querySelectorAll('.toaster, .sonner-toast, .toast, [role="alert"], button');
      elementsToHide.forEach(el => {
        if (el instanceof HTMLElement) {
          el.dataset.originalDisplay = el.style.display;
          el.style.display = 'none';
        }
      });
    };
    
    // 3. Forçar visibilidade dos elementos relevantes
    const forceVisibility = () => {
      // Elementos que devem ser visíveis no PDF
      const elements = document.querySelectorAll('.exportable-document, .print-layout, .card, .recharts-wrapper, svg, .recharts-surface, #recomendacoes-section');
      
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        } else if (el instanceof SVGElement) {
          el.setAttribute('style', 'display: block; visibility: visible; opacity: 1;');
        }
      });
    };
    
    // 4. Restaurar elementos após a impressão
    const restoreElements = () => {
      document.body.classList.remove('printing-pdf');
      
      const hiddenElements = document.querySelectorAll('[data-original-display]');
      hiddenElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = el.dataset.originalDisplay || '';
          delete el.dataset.originalDisplay;
        }
      });
    };
    
    // 5. Executar a sequência de exportação
    hideElements();
    
    setTimeout(() => {
      forceVisibility();
      
      setTimeout(() => {
        // Imprimir a página
        window.print();
        
        // Restaurar após a impressão
        setTimeout(restoreElements, 1000);
      }, 2000);
    }, 1000);
    
  } catch (error) {
    console.error("Erro ao preparar impressão simplificada:", error);
    // Tentar imprimir mesmo com erro
    window.print();
  }
};
