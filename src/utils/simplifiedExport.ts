
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
      const elementsToHide = document.querySelectorAll('.toaster, .sonner-toast, .toast, [role="alert"], button, .flex.justify-between');
      elementsToHide.forEach(el => {
        if (el instanceof HTMLElement) {
          el.dataset.originalDisplay = el.style.display;
          el.style.display = 'none';
        }
      });
    };
    
    // 3. Mostrar o documento exportável que estava oculto
    const showExportableDocument = () => {
      const exportableDoc = document.querySelector('.exportable-document');
      if (exportableDoc instanceof HTMLElement) {
        exportableDoc.style.display = 'block';
        exportableDoc.style.visibility = 'visible';
        exportableDoc.style.opacity = '1';
      }
    };
    
    // 4. Forçar visibilidade dos elementos relevantes
    const forceVisibility = () => {
      // Elementos que devem ser visíveis no PDF
      const elements = document.querySelectorAll('.exportable-document, .print-layout, .card, .recharts-wrapper, svg, .recharts-surface, #recomendacoes-section, .print-title, .print-subtitle');
      
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        } else if (el instanceof SVGElement) {
          el.setAttribute('style', 'display: block; visibility: visible; opacity: 1;');
          
          // Também forçar visualização de todos os elementos filhos do SVG
          const children = el.querySelectorAll('*');
          children.forEach(child => {
            if (child instanceof SVGElement) {
              child.setAttribute('style', 'visibility: visible; opacity: 1;');
            }
          });
        }
      });
      
      // Forçar exibição das seções específicas
      document.querySelectorAll('.card-section-1, .card-section-2, .card-section-3, .card-section-4, .card-section-5, .card-section-6, .card-section-7, .card-section-8, .card-section-9').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          el.style.pageBreakBefore = 'always';
          el.style.breakBefore = 'page';
        }
      });
    };
    
    // 5. Restaurar elementos após a impressão
    const restoreElements = () => {
      document.body.classList.remove('printing-pdf');
      
      const hiddenElements = document.querySelectorAll('[data-original-display]');
      hiddenElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = el.dataset.originalDisplay || '';
          delete el.dataset.originalDisplay;
        }
      });
      
      // Ocultar novamente o documento exportável
      const exportableDoc = document.querySelector('.exportable-document');
      if (exportableDoc instanceof HTMLElement) {
        exportableDoc.style.display = 'none';
      }
    };
    
    // 6. Executar a sequência de exportação
    hideElements();
    
    setTimeout(() => {
      showExportableDocument();
      
      setTimeout(() => {
        forceVisibility();
        
        setTimeout(() => {
          // Imprimir a página
          window.print();
          
          // Restaurar após a impressão
          setTimeout(restoreElements, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
    
  } catch (error) {
    console.error("Erro ao preparar impressão simplificada:", error);
    // Tentar imprimir mesmo com erro
    window.print();
  }
};
