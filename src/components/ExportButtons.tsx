
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { exportToPDF } from '@/utils/exportUtils';
import { toast } from "sonner";

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  const handlePrintPDF = () => {
    // Mostrar feedback visual para o usuário
    toast.promise(
      new Promise((resolve) => {
        // Trigger PDF export
        exportToPDF();
        // Resolve after a short delay to allow UI to update
        setTimeout(resolve, 2000);
      }),
      {
        loading: 'Preparando documento PDF...',
        success: 'PDF pronto para impressão',
        error: 'Erro ao gerar PDF'
      }
    );
  };
  
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button 
        variant="outline" 
        onClick={handlePrintPDF} 
        className="flex items-center gap-2"
      >
        <Printer className="h-4 w-4" />
        PDF
      </Button>
    </div>
  );
};

export default ExportButtons;
