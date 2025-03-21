
import React, { useEffect } from 'react';
import { exportToPDF } from '@/utils/exportUtils';
import { simplifiedExportToPDF } from '@/utils/simplifiedExport';
import { toast } from "sonner";
import ExportButtons from '@/components/ExportButtons';

const ExportablePage = () => {
  useEffect(() => {
    // Avisar o usuário que a página está sendo carregada
    toast.info("Preparando página para exportação...", {
      duration: 5000,
    });
    
    // Delay para permitir que todos os componentes sejam renderizados
    const timer = setTimeout(() => {
      try {
        // Tentar usar o método de exportação principal
        exportToPDF();
      } catch (error) {
        console.error("Erro no método principal de exportação:", error);
        toast.error("Usando método alternativo de exportação", {
          description: "O método principal falhou. Tentando abordagem simplificada...",
          duration: 5000,
        });
        
        // Usar método simplificado como fallback
        setTimeout(() => {
          simplifiedExportToPDF();
        }, 3000);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Exportação de Documento
          </h1>
          <ExportButtons />
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-medium mb-4">Instruções para exportação:</h2>
          <ol className="space-y-2 list-decimal pl-5">
            <li>Aguarde até que todos os gráficos e visualizações sejam carregados completamente.</li>
            <li>Quando a janela de impressão aparecer, selecione "Salvar como PDF" na opção de destino.</li>
            <li>Confirme que todas as páginas estão sendo exportadas corretamente.</li>
            <li>Se a janela de impressão não aparecer automaticamente, clique no botão "Exportar PDF" acima.</li>
            <li>Para melhores resultados, use o navegador Google Chrome.</li>
          </ol>
        </div>
        
        <div className="text-center py-4">
          <p className="animate-pulse text-blue-600">
            Preparando visualizações para exportação...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExportablePage;
