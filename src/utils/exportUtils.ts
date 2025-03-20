
// Função para exportação de PDF que usa a funcionalidade nativa de impressão
export const exportToPDF = () => {
  // Adiciona uma classe ao body para ativar estilos específicos para impressão
  document.body.classList.add('printing-pdf');
  
  // Tempo para a preparação da visualização
  setTimeout(() => {
    // Inicia o processo de impressão do navegador
    window.print();
    
    // Remove a classe após impressão
    setTimeout(() => {
      document.body.classList.remove('printing-pdf');
    }, 1000);
  }, 300);
};
