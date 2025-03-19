
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RecomendacoesRegulacao = () => {
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Recomendações para Melhoria da Regulação do SUS</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6">Baseado na análise das fortalezas e fragilidades reportadas pelas Secretarias Estaduais de Saúde</p>
          
          <Tabs defaultValue="curto">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="curto">Curto Prazo</TabsTrigger>
              <TabsTrigger value="medio">Médio Prazo</TabsTrigger>
              <TabsTrigger value="longo">Longo Prazo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curto" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-blue-800">Padronização de Protocolos</h3>
                    <p>Desenvolver e disseminar protocolos de regulação padronizados, adaptáveis às realidades locais, começando pelas condições mais prevalentes.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Protocolos clínicos</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Classificação de risco</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Priorização</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-green-800">Capacitação das Equipes</h3>
                    <p>Implementar programas de capacitação continuada para profissionais da regulação, com foco em uso de sistemas e aplicação de protocolos.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Treinamento online</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Uso do SISREG</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Teleconsultoria</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-purple-800">Expansão da Telessaúde</h3>
                    <p>Expandir a cobertura dos serviços de telessaúde e telediagnóstico para os municípios que ainda não contam com essa tecnologia.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Municípios remotos</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Teleconsulta</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Telediagnóstico</span>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-yellow-800">Transparência da Fila</h3>
                    <p>Implementar painéis públicos de monitoramento das filas de espera para procedimentos regulados, melhorando a transparência do processo.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Dashboards</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Acesso público</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Tempo de espera</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medio" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-indigo-800">Interoperabilidade de Sistemas</h3>
                    <p>Desenvolver soluções para integração entre os diversos sistemas de informação em saúde, incluindo SISREG, SUSfácilMG e sistemas municipais.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">API de integração</span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Sistemas legados</span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">FHIR</span>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-red-800">Fortalecimento da Governança Regional</h3>
                    <p>Fortalecer as instâncias de pactuação regional, como as CIRs e CIBs, com foco na responsabilização dos municípios-polo.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Comissões Intergestores</span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Contratualização</span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Metas regionais</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-emerald-800">Regulação Ambulatorial</h3>
                    <p>Desenvolver e implementar sistemas de regulação ambulatorial integrados, com uso de inteligência artificial para apoio à decisão.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">Especialidades</span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">IA para suporte</span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">Priorização automática</span>
                    </div>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-pink-800">Carreira de Regulador</h3>
                    <p>Estruturar carreiras para médicos reguladores e profissionais de regulação, com planos de carreira e incentivos para fixação.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Concursos específicos</span>
                      <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Remuneração adequada</span>
                      <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Educação permanente</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="longo" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-cyan-800">Modernização Tecnológica</h3>
                    <p>Desenvolver uma nova geração de sistemas de regulação com uso de inteligência artificial, big data e interoperabilidade plena.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">IA avançada</span>
                      <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">Interoperabilidade total</span>
                      <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">Análise preditiva</span>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-amber-800">Regulação Proativa</h3>
                    <p>Mudar o modelo de regulação de reativo para proativo, identificando necessidades antes mesmo que se tornem demandas agudas.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Gestão de crônicos</span>
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Prevenção quaternária</span>
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Cuidado integrado</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-teal-800">Regionalização Efetiva</h3>
                    <p>Redesenhar a regionalização da saúde baseada em análises demográficas, epidemiológicas e de fluxos assistenciais reais.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Novo PDR</span>
                      <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Fluxos reais</span>
                      <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Gestão regional</span>
                    </div>
                  </div>
                  
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-rose-800">Financiamento Integrado</h3>
                    <p>Reformular o modelo de financiamento para apoiar de forma mais efetiva a regulação do acesso, com incentivos para cumprimento de metas.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">Pagamento por desempenho</span>
                      <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">Nova PPI</span>
                      <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">Financiamento regional</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Pontos críticos para o sucesso:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Integração entre entes federativos</span>: As recomendações dependem de coordenação efetiva entre União, estados e municípios.</li>
              <li><span className="font-medium">Sustentabilidade financeira</span>: Muitas das propostas exigem investimentos contínuos e previsíveis ao longo do tempo.</li>
              <li><span className="font-medium">Desenvolvimento de recursos humanos</span>: A capacitação e fixação de profissionais qualificados é fundamental para qualquer avanço na regulação.</li>
              <li><span className="font-medium">Participação social</span>: Os usuários precisam estar envolvidos no processo para garantir transparência e adequação das soluções.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecomendacoesRegulacao;
