
// Função para exportação de PDF que usa a funcionalidade nativa de impressão
export const exportToPDF = () => {
  // Adiciona uma classe ao body para ativar estilos específicos para impressão
  document.body.classList.add('printing-pdf');
  
  // Esconder elementos de notificação antes da impressão
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
      '[data-radix-toast-viewport]'
    ];
    
    // Aplicar display: none a todos eles
    toastSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.height = '0';
          el.style.width = '0';
          el.style.overflow = 'hidden';
          el.setAttribute('aria-hidden', 'true');
        }
      });
    });
  };
  
  // Tempo para a preparação da visualização
  setTimeout(() => {
    // Esconder notificações
    hideToastElements();
    
    // Esperar um momento para garantir que os elementos foram escondidos
    setTimeout(() => {
      // Inicia o processo de impressão do navegador
      window.print();
      
      // Remove a classe após impressão
      setTimeout(() => {
        document.body.classList.remove('printing-pdf');
      }, 1000);
    }, 100);
  }, 300);
};

