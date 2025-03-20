
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
    // Mostrar feedback visual para o usuário apenas na tela, não no PDF final
    const toastId = toast.loading('Preparando documento para impressão...');
    
    // Fechar o toast antes da impressão começar
    setTimeout(() => {
      toast.dismiss(toastId);
      // Trigger PDF export after toast is dismissed
      exportToPDF();
    }, 1500);
  };
  
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button 
        variant="outline" 
        onClick={handlePrintPDF} 
        className="flex items-center gap-2"
      >
        <Printer className="h-4 w-4" />
        Imprimir
      </Button>
    </div>
  );
};

export default ExportButtons;

