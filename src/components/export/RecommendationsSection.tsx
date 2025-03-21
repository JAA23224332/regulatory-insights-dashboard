
import React, { useRef, useEffect } from 'react';

const RecommendationsSection = () => {
  const recomendacoesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (recomendacoesRef.current) {
      const style = recomendacoesRef.current.style;
      style.display = 'block';
      style.visibility = 'visible';
      style.opacity = '1';
      style.pageBreakBefore = 'always';
      style.breakBefore = 'page';
      style.border = '2px solid #000';
      style.backgroundColor = '#f9f9f9';
      style.padding = '20px';
      style.marginTop = '30px';
      style.marginBottom = '30px';
      style.zIndex = '9999';
      style.position = 'relative';

      const children = recomendacoesRef.current.querySelectorAll('*');
      children.forEach(child => {
        const childElement = child as HTMLElement;
        childElement.style.display = child.tagName.toLowerCase() === 'strong' ? 'inline' : 'block';
        childElement.style.visibility = 'visible';
        childElement.style.opacity = '1';
      });
    }
  }, []);

  return (
    <div 
      id="recomendacoes-section" 
      ref={recomendacoesRef}
      className="card card-section-9 recomendacoes-section"
      style={{
        display: 'block',
        visibility: 'visible',
        pageBreakBefore: 'always',
        breakBefore: 'page',
        border: '2px solid #000',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        marginTop: '30px',
        marginBottom: '30px',
        zIndex: 9999,
        position: 'relative',
        opacity: 1
      }}
    >
      <h2 
        className="text-xl font-semibold mb-4 recomendacoes-title"
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          fontSize: '18pt',
          fontWeight: 700,
          marginBottom: '25px',
          borderBottom: '2px solid #000',
          paddingBottom: '10px',
          color: '#000'
        }}
      >
        9. Sugestões para Melhoria da Regulação no SUS
      </h2>
      
      <ul 
        className="space-y-4 recomendacoes-list"
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          listStyleType: 'disc',
          paddingLeft: '20px',
          margin: '20px 0'
        }}
      >
        <li 
          className="recomendacao-item"
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            marginBottom: '20px',
            pageBreakInside: 'avoid',
            breakInside: 'avoid'
          }}
        >
          <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
            Sistemas de informação e tecnologia:
          </strong> 
          <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
            Investir em tecnologias mais integradas e interoperáveis, modernizando sistemas existentes como o SISREG. Expandir o uso de telemedicina e telessaúde para ampliar o acesso nas regiões remotas.
          </p>
        </li>
        
        <li 
          className="recomendacao-item"
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            marginBottom: '20px',
            pageBreakInside: 'avoid',
            breakInside: 'avoid'
          }}
        >
          <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
            Protocolos e processos:
          </strong> 
          <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
            Padronizar nacionalmente protocolos de regulação e classificação de risco, construindo diretrizes que possam ser adaptadas às realidades locais.
          </p>
        </li>
        
        <li 
          className="recomendacao-item"
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            marginBottom: '20px',
            pageBreakInside: 'avoid',
            breakInside: 'avoid'
          }}
        >
          <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
            Recursos humanos:
          </strong> 
          <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
            Desenvolver programas de capacitação continuada e estabelecer carreiras específicas para profissionais de regulação, principalmente médicos reguladores.
          </p>
        </li>
        
        <li 
          className="recomendacao-item"
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            marginBottom: '20px',
            pageBreakInside: 'avoid',
            breakInside: 'avoid'
          }}
        >
          <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
            Integração entre níveis de atenção:
          </strong> 
          <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
            Fortalecer a comunicação entre a atenção primária e especializada, usando sistemas como referência e contrarreferência eletrônicas.
          </p>
        </li>
        
        <li 
          className="recomendacao-item"
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            marginBottom: '20px',
            pageBreakInside: 'avoid',
            breakInside: 'avoid'
          }}
        >
          <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
            Regionalização:
          </strong> 
          <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
            Fortalecer os processos de regionalização, garantindo que os municípios-polo cumpram seu papel assistencial conforme planejado nos PDRs.
          </p>
        </li>
        
        <li 
          className="recomendacao-item"
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            marginBottom: '20px',
            pageBreakInside: 'avoid',
            breakInside: 'avoid'
          }}
        >
          <strong style={{display: 'inline', visibility: 'visible', opacity: 1, fontWeight: 700, color: '#000'}}>
            Política integrada:
          </strong> 
          <p style={{display: 'block', visibility: 'visible', opacity: 1, marginTop: '5px'}}>
            Desenvolver uma política nacional de regulação integrada, com diretrizes claras e incentivos para implementação em todos os níveis.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default RecommendationsSection;
