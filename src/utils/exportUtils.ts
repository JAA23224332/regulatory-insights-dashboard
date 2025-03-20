
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
    
    // Aplicar display: none e outras propriedades para garantir ocultação
    toastSelectors.forEach(selector => {
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
  
  // Tempo para a preparação da visualização
  setTimeout(() => {
    // Esconder notificações e outros elementos que não devem aparecer na impressão
    hideToastElements();
    
    // Esperar um momento para garantir que os elementos foram escondidos
    setTimeout(() => {
      // Inicia o processo de impressão do navegador
      window.print();
      
      // Remove a classe e restaura elementos após impressão
      setTimeout(() => {
        document.body.classList.remove('printing-pdf');
        restoreHiddenElements();
      }, 1000);
    }, 100);
  }, 300);
};
