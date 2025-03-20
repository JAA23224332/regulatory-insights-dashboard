
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { exportToPDF } from '@/utils/exportUtils';
import { useToast } from "@/components/ui/use-toast";

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  const { toast } = useToast();
  
  const handlePrintPDF = () => {
    toast({
      title: "Preparando para imprimir",
      description: "O documento está sendo otimizado para impressão. A janela de impressão abrirá em instantes.",
      duration: 3000,
    });
    
    // Pequeno delay para dar tempo da toast notification aparecer antes da janela de impressão
    setTimeout(() => {
      try {
        exportToPDF();
      } catch (error) {
        console.error("Erro ao exportar para PDF:", error);
        toast({
          title: "Erro na impressão",
          description: "Houve um problema ao preparar o documento. Por favor, tente novamente.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }, 500);
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
