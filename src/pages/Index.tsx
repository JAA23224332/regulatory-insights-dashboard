
import React from 'react';
import RegulacaoSUSDashboard from '@/components/RegulacaoSUSDashboard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, LayoutDashboard, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Análise de Fortalezas e Fragilidades
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Baseado em respostas de 12 Secretarias Estaduais de Saúde | 45 fortalezas e 63 fragilidades identificadas
          </p>
        </motion.div>
        
        {/* Botões de navegação */}
        <div className="flex justify-end mb-6 gap-3">
          <Link to="/completo">
            <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
              <LayoutDashboard className="h-4 w-4" />
              Painel Completo
            </Button>
          </Link>
          <Link to="/exportar">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <FileText className="h-4 w-4" />
              Versão para impressão/exportação PDF
            </Button>
          </Link>
          <Link to="/exportar-pdf">
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
              <Printer className="h-4 w-4" />
              Método alternativo PDF
            </Button>
          </Link>
        </div>
        
        <RegulacaoSUSDashboard />
      </div>
    </motion.div>
  );
};

export default Index;
