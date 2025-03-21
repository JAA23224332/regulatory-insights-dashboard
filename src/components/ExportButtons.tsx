
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown, Save, Download } from "lucide-react";
import { exportToPDF } from '@/utils/exportUtils';
import { useToast } from "@/components/ui/use-toast";

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  const { toast } = useToast();
  
  const handlePrintPDF = () => {
    toast({
      title: "Preparando visualizações para exportação",
      description: "Aguarde enquanto preparamos todas as visualizações e gráficos para o PDF. Este processo pode levar até 30 segundos.",
      duration: 30000,
    });
    
    // Delay maior para garantir que todas as visualizações sejam renderizadas corretamente
    setTimeout(() => {
      // Forçar uma renderização completa antes de exportar
      document.querySelectorAll('.recharts-wrapper, .recharts-surface, svg, .card, .card-section-1, .card-section-2, .card-section-3, .card-section-4, .card-section-5, .card-section-6, .card-section-7, .card-section-8, .card-section-9').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        } else if (el instanceof SVGElement) {
          el.setAttribute('style', 'display: block; visibility: visible; opacity: 1;');
        }
      });
      
      // Iniciar a exportação com um atraso adicional para permitir a renderização
      setTimeout(() => {
        exportToPDF();
      }, 8000);
    }, 8000);
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
      
      <Button 
        variant="default" 
        onClick={handlePrintPDF} 
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Download className="h-4 w-4" />
        Baixar Visualizações
      </Button>
    </div>
  );
};

export default ExportButtons;
