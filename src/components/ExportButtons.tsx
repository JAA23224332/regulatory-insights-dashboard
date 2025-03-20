
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { exportToPDF } from '@/utils/exportUtils';

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  const handlePrintPDF = () => {
    // Trigger PDF export directly without showing toast notifications
    exportToPDF();
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
