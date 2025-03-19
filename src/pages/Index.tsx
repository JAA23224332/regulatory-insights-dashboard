
import React from 'react';
import RegulacaoSUSDashboard from '@/components/RegulacaoSUSDashboard';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Regulação <span className="text-blue-600">SUS</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-500">
            Dashboard de indicadores e análises sobre a regulação do Sistema Único de Saúde
          </p>
          <p className="mt-4 text-base text-gray-600">
            Baseado em respostas de 13 Secretarias Estaduais de Saúde | 45 fortalezas e 63 fragilidades identificadas
          </p>
        </motion.div>
        
        <RegulacaoSUSDashboard />
      </div>
    </motion.div>
  );
};

export default Index;
