
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Printer, Presentation } from "lucide-react";
import { exportToPDF, exportToPowerPoint } from '@/utils/exportUtils';

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  const handlePrintPDF = () => {
    exportToPDF();
  };
  
  const handleExportPowerPoint = () => {
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
        <Presentation className="h-4 w-4" />
        PowerPoint
      </Button>
    </div>
  );
};

export default ExportButtons;
