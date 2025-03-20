
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { exportToPDF } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  const { toast } = useToast();

  const handlePrintPDF = () => {
    toast({
      title: "Preparando impressão...",
      description: "O documento será aberto para impressão em alguns segundos.",
      duration: 3000,
    });
    
    // Pequeno delay para permitir que o toast seja visto antes da impressão
    setTimeout(() => {
      exportToPDF();
    }, 800);
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
