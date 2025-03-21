
import React, { useEffect } from 'react';
import { exportToPDF } from '@/utils/exportUtils';
import ExportHeader from '@/components/export/ExportHeader';
import OverviewSection from '@/components/export/OverviewSection';
import ComparativeSection from '@/components/export/ComparativeSection';
import StrengthsSection from '@/components/export/StrengthsSection';
import WeaknessesSection from '@/components/export/WeaknessesSection';
import IntensitySection from '@/components/export/IntensitySection';
import FrequentTermsSection from '@/components/export/FrequentTermsSection';
import SharedTermsSection from '@/components/export/SharedTermsSection';
import RecommendationsSection from '@/components/export/RecommendationsSection';
import Footer from '@/components/export/Footer';

const Export = () => {
  useEffect(() => {
    const forceRender = () => {
      const allSections = document.querySelectorAll('.card');
      allSections.forEach(section => {
        const sectionElem = section as HTMLElement;
        sectionElem.style.display = 'block';
        sectionElem.style.visibility = 'visible';
        sectionElem.style.opacity = '1';
      });
    };

    forceRender();
    const timer = setTimeout(forceRender, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          exportToPDF();
        });
      });
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="exportable-document print-layout pb-20">
      <ExportHeader />
      
      <OverviewSection />
      <ComparativeSection />
      <StrengthsSection />
      <WeaknessesSection />
      <IntensitySection />
      <FrequentTermsSection />
      <SharedTermsSection />
      <RecommendationsSection />
      
      <Footer />
      
      <div className="hidden-for-pdf-only" style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0, pointerEvents: 'none' }}>
        <RecommendationsSection />
      </div>
    </div>
  );
};

export default Export;
