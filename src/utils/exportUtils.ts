
// Função simplificada para exportação de PDF que usa a funcionalidade nativa de impressão
export const exportToPDF = () => {
  // Adiciona uma classe ao body para ativar estilos específicos para impressão
  document.body.classList.add('printing-pdf');
  
  // Adiciona folha de estilo temporária específica para impressão
  const styleSheet = document.createElement('style');
  styleSheet.id = 'print-specific-styles';
  styleSheet.innerHTML = `
    @media print {
      /* Estilos gerais para impressão */
      body { font-size: 11pt; line-height: 1.3; }
      
      /* Evita quebras de página dentro de cards */
      .card { 
        page-break-inside: avoid; 
        break-inside: avoid; 
        margin-bottom: 20px;
      }
      
      /* Corrige o tamanho de fonte de todos os textos */
      p, li, td, th { font-size: 10pt !important; }
      
      /* Ajusta os itens da lista principal de estatísticas */
      .principais-constatacoes li { 
        display: flex !important;
        align-items: flex-start !important;
        margin-bottom: 15px !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      
      .principais-constatacoes li span:first-child { 
        margin-right: 10px !important;
        flex-shrink: 0 !important;
      }
      
      .principais-constatacoes li span:last-child { 
        font-size: 10pt !important;
        line-height: 1.4 !important;
        display: block !important;
        width: 100% !important;
        word-wrap: break-word !important;
        white-space: normal !important;
      }
      
      /* Garante espaçamento adequado entre as seções */
      .card-section-3, .card-section-4, .card-section-5, 
      .card-section-6, .card-section-7, .card-section-8 {
        page-break-before: always;
        break-before: page;
      }
      
      /* Garante que as tabelas fiquem legíveis */
      table.print-table {
        width: 100% !important;
        border-collapse: collapse !important;
        margin-bottom: 15px !important;
        font-size: 9pt !important;
      }
      
      table.print-table th, table.print-table td {
        border: 1px solid #ddd !important;
        padding: 4px !important;
        text-align: left !important;
        font-size: 9pt !important;
      }
      
      /* Garante visibilidade do texto em negrito */
      strong {
        font-weight: bold !important;
        color: #000 !important;
      }
      
      /* Oculta elementos que não devem ser impressos */
      .display-screen-only {
        display: none !important;
      }
      
      /* Mostra elementos específicos para impressão */
      .display-print-only {
        display: block !important;
      }
      
      /* Garante que a seção de recomendações seja impressa */
      #recomendacoes-section {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Ajusta título e subtítulos para impressão */
      .print-title, .print-subtitle {
        text-align: center !important;
        margin-bottom: 10px !important;
      }
      
      .print-title {
        font-size: 16pt !important;
        font-weight: bold !important;
      }
      
      .print-subtitle {
        font-size: 12pt !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Define função para limpar configurações de impressão
  const cleanup = () => {
    document.body.classList.remove('printing-pdf');
    if (document.getElementById('print-specific-styles')) {
      document.head.removeChild(document.getElementById('print-specific-styles'));
    }
  };
  
  // Delay para garantir que o DOM seja atualizado antes da impressão
  setTimeout(() => {
    window.print();
    
    // Remove estilos temporários após impressão
    setTimeout(cleanup, 1000);
  }, 300);
};
