
import React, { useEffect } from 'react';
import { simplifiedExportToPDF } from '@/utils/simplifiedExport';
import { toast } from "sonner";
import ExportButtons from '@/components/ExportButtons';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import ExportHeader from '@/components/export/ExportHeader';
import OverviewSection from '@/components/export/OverviewSection';
import ComparativeSection from '@/components/export/ComparativeSection';
import StrengthsSection from '@/components/export/StrengthsSection';
import WeaknessesSection from '@/components/export/WeaknessesSection';
import IntensitySection from '@/components/export/IntensitySection';
import FrequentTermsSection from '@/components/export/FrequentTermsSection';
import SharedTermsSection from '@/components/export/SharedTermsSection';
import RecommendationsSection from '@/components/export/RecommendationsSection';
import Footer from '@/components/export/Footer';

const ExportablePage = () => {
  useEffect(() => {
    // Avisar o usuário que a página está sendo carregada
    toast.info("Preparando página para exportação...", {
      duration: 5000,
    });
    
    // Função para garantir que as seções sejam renderizadas corretamente
    const forceRender = () => {
      document.querySelectorAll('.card, .exportable-document, svg, .recharts-wrapper, .recharts-surface').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        } else if (el instanceof SVGElement) {
          el.setAttribute('style', 'display: block; visibility: visible; opacity: 1;');
        }
      });
    };
    
    // Aplicar forceRender várias vezes para garantir que tudo seja mostrado
    forceRender();
    const timers = [
      setTimeout(forceRender, 500),
      setTimeout(forceRender, 1000),
      setTimeout(forceRender, 2000)
    ];
    
    // Delay para permitir que todos os componentes sejam renderizados antes de iniciar a exportação
    const exportTimer = setTimeout(() => {
      try {
        // Tentar exportação simplificada
        simplifiedExportToPDF();
        
        toast.success("Documento pronto para download", {
          description: "Se a janela de impressão não abrir, clique no botão 'Exportar PDF' acima.",
          duration: 8000,
        });
      } catch (error) {
        console.error("Erro ao exportar PDF:", error);
        toast.error("Erro ao exportar o documento", {
          description: "Tente clicar no botão 'Exportar PDF' manualmente.",
          duration: 8000,
        });
      }
    }, 5000);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(exportTimer);
    };
  }, []);

  const handleManualExport = () => {
    toast.info("Iniciando exportação manual...", {
      duration: 3000,
    });
    
    setTimeout(() => {
      simplifiedExportToPDF();
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Exportação de Documento
          </h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleManualExport} 
              className="flex items-center gap-2 bg-white hover:bg-gray-100"
            >
              <FileDown className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
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
        
        {/* Conteúdo para exportação - escondido na visualização mas usado para a impressão */}
        <div className="exportable-document print-layout pb-20 hidden">
          <ExportHeader />
          <OverviewSection />
          <ComparativeSection />
          <StrengthsSection />
          <WeaknessesSection />
          <IntensitySection />
          <FrequentTermsSection />
          <SharedTermsSection />
          <RecommendationsSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ExportablePage;
