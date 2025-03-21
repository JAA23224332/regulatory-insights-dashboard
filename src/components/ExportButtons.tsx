
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { exportToPDF } from '@/utils/exportUtils';
import { useToast } from "@/components/ui/use-toast";
import { toast as sonnerToast } from "sonner";

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  const { toast } = useToast();
  
  const handlePrintPDF = () => {
    // Use both toast systems to ensure visibility
    toast({
      title: "Preparando visualizações para exportação",
      description: "Aguarde enquanto preparamos todas as visualizações e gráficos para o PDF. Este processo pode levar até 30 segundos.",
      duration: 30000,
    });
    
    sonnerToast.info("Preparando PDF...", {
      description: "Aguarde enquanto preparamos o documento para impressão.",
      duration: 30000,
    });
    
    // Aumentar o delay para garantir que tudo seja renderizado corretamente
    setTimeout(() => {
      // Força uma renderização antes de chamar a exportação
      document.querySelectorAll('.recharts-wrapper, .recharts-surface, svg, .card, .card-section-1, .card-section-2, .card-section-3, .card-section-4, .card-section-5, .card-section-6, .card-section-7, .card-section-8, .card-section-9, #recomendacoes-section').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        } else if (el instanceof SVGElement) {
          el.setAttribute('style', 'display: block; visibility: visible; opacity: 1;');
        }
      });
      
      try {
        // Iniciar a exportação com um atraso adicional
        setTimeout(() => {
          exportToPDF();
          
          // Notifica que o processo foi concluído
          setTimeout(() => {
            sonnerToast.success("PDF pronto para download", {
              description: "O documento foi preparado e a janela de impressão deve ser exibida agora.",
              duration: 5000,
            });
          }, 2000);
        }, 10000);
      } catch (error) {
        console.error("Erro ao exportar PDF:", error);
        sonnerToast.error("Erro na exportação", {
          description: "Ocorreu um erro ao preparar o PDF. Tente novamente.",
          duration: 5000,
        });
      }
    }, 10000);
  };
  
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button 
        variant="outline" 
        onClick={handlePrintPDF} 
        className="flex items-center gap-2 bg-white hover:bg-gray-100"
      >
        <FileDown className="h-4 w-4" />
        Exportar PDF
      </Button>
    </div>
  );
};

export default ExportButtons;
