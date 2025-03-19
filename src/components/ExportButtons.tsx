
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Printer, FilePresentation } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { exportToPDF, exportToPowerPoint } from '@/utils/exportUtils';

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  const { toast } = useToast();
  
  const handlePrintPDF = () => {
    toast({
      title: "Exportação de PDF iniciada",
      description: "Use a opção 'Salvar como PDF' na janela de impressão para exportar o documento completo",
    });
    exportToPDF();
  };
  
  const handleExportPowerPoint = () => {
    toast({
      title: "Exportação para PowerPoint iniciada",
      description: "O arquivo será baixado automaticamente em alguns segundos",
    });
    exportToPowerPoint();
  };
  
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button variant="outline" onClick={handlePrintPDF} className="flex items-center gap-2">
        <Printer className="h-4 w-4" />
        PDF
      </Button>
      <Button 
        variant="default" 
        onClick={handleExportPowerPoint} 
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
      >
        <FilePresentation className="h-4 w-4" />
        PowerPoint
      </Button>
    </div>
  );
};

export default ExportButtons;
