import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer, FileDown } from "lucide-react";
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
      description: "O documento está sendo preparado. A janela de impressão abrirá em instantes.",
      duration: 3000,
    });
    
    // Pequeno delay para dar tempo da toast notification aparecer antes da janela de impressão
    setTimeout(() => {
      exportToPDF();
    }, 500);
  };
  
  return (
    <div className={`flex gap-2 ${className}`}>
      {/* All export buttons have been removed */}
    </div>
  );
};

export default ExportButtons;
