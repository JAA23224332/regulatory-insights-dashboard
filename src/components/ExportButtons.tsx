
import React from 'react';
import { Button } from "@/components/ui/button";

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {/* All export buttons have been removed as requested */}
    </div>
  );
};

export default ExportButtons;
