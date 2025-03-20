
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
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
      description: "Aguarde enquanto preparamos todas as visualizações e gráficos para o PDF. Isso pode levar alguns segundos.",
      duration: 5000,
    });
    
    // Delay aumentado para dar tempo da toast notification aparecer e usuário entender que o processo está em andamento
    setTimeout(() => {
      exportToPDF();
    }, 1500);
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
