
import React from 'react';

const Footer = () => {
  return (
    <div className="mt-8 text-sm text-center text-gray-500 print:text-black">
      <p>Documento gerado com base na análise de respostas de 12 Secretarias Estaduais de Saúde.</p>
      <p>Data da geração: {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default Footer;
