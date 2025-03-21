import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { 
  dadosReais, 
  dadosIntensidade, 
  termosFrequentesFortalezas, 
  termosFrequentesFragilidades, 
  termosCompartilhados,
  estatisticasGerais
} from '@/data/regulacaoData';

// Cores para os gráficos
const COLORS_FORTALEZAS = ['#0088FE', '#4CAF50', '#81C784'];
const COLORS_FRAGILIDADES = ['#FF8042', '#F44336', '#E57373'];

const RegulacaoSUSDashboard = () => {
  const [activeTab, setActiveTab] = useState('comparativo');
  
  // Preparar dados para o gráfico de pizza
  const dadosPieFortalezas = dadosReais
    .map(item => ({
      name: item.categoria,
      value: item.fortalezas
    }))
    .filter(item => item.value > 0);
  
  const dadosPieFragilidades = dadosReais
    .map(item => ({
      name: item.categoria,
      value: item.fragilidades
    }))
    .filter(item => item.value > 0);
  
  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-8 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={cardVariants}>
        <Card className="glass-card overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <CardTitle className="text-center text-3xl font-light tracking-tight text-gray-900">
                Fortalezas e Fragilidades na Regulação do SUS
              </CardTitle>
              <p className="text-center mt-2 text-gray-600 font-light">
                Análise baseada nas respostas de {estatisticasGerais.totalEstados} Secretarias Estaduais de Saúde
              </p>
            </motion.div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-semibold text-blue-600">{estatisticasGerais.totalEstados}</p>
                  <p className="text-sm text-gray-600">Estados participantes</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-semibold text-green-600">{estatisticasGerais.totalFortalezas}</p>
                  <p className="text-sm text-gray-600">Fortalezas identificadas</p>
                </CardContent>
              </Card>
              <Card className="bg-red-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-semibold text-red-600">{estatisticasGerais.totalFragilidades}</p>
                  <p className="text-sm text-gray-600">Fragilidades identificadas</p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs 
              defaultValue="comparativo" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-8 w-full max-w-lg mx-auto">
                <TabsTrigger 
                  value="comparativo"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  Comparativo
                </TabsTrigger>
                <TabsTrigger 
                  value="fortalezas"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Fortalezas
                </TabsTrigger>
                <TabsTrigger 
                  value="fragilidades"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Fragilidades
                </TabsTrigger>
                <TabsTrigger 
                  value="termos"
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                >
                  Termos
                </TabsTrigger>
              </TabsList>
              
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className={`tab-transition ${activeTab}`}
              >
                <TabsContent value="comparativo" className="mt-4">
                  <div className="h-[500px] mb-8 card-section-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dadosReais}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 140, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" stroke="#888" fontSize={12} />
                        <YAxis 
                          type="category" 
                          dataKey="categoria" 
                          width={130}
                          stroke="#888"
                          fontSize={12}
                          tickLine={false}
                        />
                        <Tooltip 
                          contentStyle={{
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                            border: 'none',
                            padding: '12px'
                          }}
                        />
                        <Legend 
                          wrapperStyle={{
                            paddingTop: '15px',
                          }}
                        />
                        <Bar 
                          dataKey="fortalezas" 
                          name="Fortalezas" 
                          fill="#4CAF50" 
                          barSize={20} 
                          radius={[0, 4, 4, 0]}
                          animationDuration={1500}
                        />
                        <Bar 
                          dataKey="fragilidades" 
                          name="Fragilidades" 
                          fill="#F44336" 
                          barSize={20} 
                          radius={[0, 4, 4, 0]}
                          animationDuration={1500}
                          animationBegin={300}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-medium text-xl mb-4 text-gray-800">Destaques da análise:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>
                          <span className="font-medium text-gray-900">Sistemas de informação e tecnologia</span>: 
                          <span className="text-gray-700"> aparece tanto como fortaleza ({dadosReais[0].fortalezas} menções) quanto fragilidade ({dadosReais[0].fragilidades} menções), indicando que alguns estados avançaram neste tema enquanto outros ainda têm desafios.</span>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                        <span>
                          <span className="font-medium text-gray-900">Protocolos e fluxos</span>: 
                          <span className="text-gray-700"> mais frequentemente citado como fortaleza ({dadosReais[1].fortalezas} menções) do que fragilidade ({dadosReais[1].fragilidades} menções).</span>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                        <span>
                          <span className="font-medium text-gray-900">Recursos humanos</span> e <span className="font-medium text-gray-900">Acesso e equidade</span>: 
                          <span className="text-gray-700"> mais frequentemente citados como fragilidades (7 menções cada) do que fortalezas (3 menções cada).</span>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                        <span>
                          <span className="font-medium text-gray-900">Regionalização</span> e <span className="font-medium text-gray-900">Financiamento</span>: 
                          <span className="text-gray-700"> aparecem quase exclusivamente como fragilidades (4 e 1 menções respectivamente).</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="display-print-only mt-10">
                    <h3 className="font-medium text-xl mb-4 text-gray-800">Dados Comparativos:</h3>
                    <table className="print-table">
                      <thead>
                        <tr>
                          <th>Categoria</th>
                          <th>Fortalezas</th>
                          <th>Fragilidades</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dadosReais.map((item, index) => (
                          <tr key={index}>
                            <td>{item.categoria}</td>
                            <td>{item.fortalezas}</td>
                            <td>{item.fragilidades}</td>
                            <td>{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="fortalezas" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-[400px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dadosPieFortalezas}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={130}
                            innerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            animationDuration={1000}
                            animationBegin={200}
                          >
                            {dadosPieFortalezas.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS_FORTALEZAS[index % COLORS_FORTALEZAS.length]} 
                                strokeWidth={1}
                                stroke="#fff"
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              borderRadius: '8px',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                              border: 'none',
                              padding: '12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-medium text-xl mb-4 text-gray-800">Principais fortalezas:</h3>
                      <ul className="space-y-4">
                        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-blue-600 mb-1">Sistemas e tecnologia</div>
                          <p className="text-gray-700">Uso do SISREG e outros sistemas de regulação, telemedicina e telessaúde.</p>
                        </li>
                        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-green-600 mb-1">Protocolos e fluxos</div>
                          <p className="text-gray-700">Padronização de processos, classificação de risco e priorização de atendimentos.</p>
                        </li>
                        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-indigo-600 mb-1">Governança e gestão</div>
                          <p className="text-gray-700">Estruturação de complexos reguladores e monitoramento de ações.</p>
                        </li>
                        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-purple-600 mb-1">Integração de níveis</div>
                          <p className="text-gray-700">Articulação entre atenção primária e especializada.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="fragilidades" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-[400px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dadosPieFragilidades}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={130}
                            innerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            animationDuration={1000}
                            animationBegin={200}
                          >
                            {dadosPieFragilidades.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS_FRAGILIDADES[index % COLORS_FRAGILIDADES.length]} 
                                strokeWidth={1}
                                stroke="#fff"
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              borderRadius: '8px',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                              border: 'none',
                              padding: '12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-medium text-xl mb-4 text-gray-800">Principais fragilidades:</h3>
                      <ul className="space-y-4">
                        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-orange-600 mb-1">Recursos humanos</div>
                          <p className="text-gray-700">Falta de profissionais qualificados e capacitação inadequada.</p>
                        </li>
                        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-red-600 mb-1">Acesso e equidade</div>
                          <p className="text-gray-700">Desigualdades no acesso entre regiões e municípios.</p>
                        </li>
                        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-pink-600 mb-1">Sistemas e tecnologia</div>
                          <p className="text-gray-700">Limitações dos sistemas existentes, falta de interoperabilidade.</p>
                        </li>
                        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-red-800 mb-1">Integração de níveis</div>
                          <p className="text-gray-700">Falta de articulação entre os diferentes níveis de atenção.</p>
                        </li>
                        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-red-500 mb-1">Regionalização</div>
                          <p className="text-gray-700">Dificuldades na implementação da regionalização da saúde.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="termos" className="mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-medium text-xl mb-4 text-green-700">Termos mais frequentes em Fortalezas</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={termosFrequentesFortalezas}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" stroke="#888" fontSize={12} />
                            <YAxis 
                              type="category" 
                              dataKey="termo" 
                              width={90}
                              stroke="#888"
                              fontSize={12}
                              tickLine={false}
                            />
                            <Tooltip />
                            <Bar 
                              dataKey="frequencia" 
                              name="Frequência" 
                              fill="#4CAF50" 
                              barSize={16} 
                              radius={[0, 4, 4, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-xl mb-4 text-red-700">Termos mais frequentes em Fragilidades</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={termosFrequentesFragilidades}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" stroke="#888" fontSize={12} />
                            <YAxis 
                              type="category" 
                              dataKey="termo" 
                              width={90}
                              stroke="#888"
                              fontSize={12}
                              tickLine={false}
                            />
                            <Tooltip />
                            <Bar 
                              dataKey="frequencia" 
                              name="Frequência" 
                              fill="#F44336" 
                              barSize={16} 
                              radius={[0, 4, 4, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2 mt-4">
                      <h3 className="font-medium text-xl mb-4 text-purple-700">Termos compartilhados entre Fortalezas e Fragilidades</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={termosCompartilhados}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="termo" stroke="#888" fontSize={12} />
                            <YAxis stroke="#888" fontSize={12} />
                            <Tooltip />
                            <Legend />
                            <Bar 
                              dataKey="freqFortalezas" 
                              name="Fortalezas" 
                              fill="#4CAF50" 
                              barSize={20} 
                            />
                            <Bar 
                              dataKey="freqFragilidades" 
                              name="Fragilidades" 
                              fill="#F44336" 
                              barSize={20} 
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={cardVariants}>
        <Card className="glass-card overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
            <CardTitle className="text-2xl font-light tracking-tight text-gray-900">
              Recomendações para Melhoria da Regulação no SUS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-3 text-blue-700">Sistemas de informação e tecnologia</h3>
                <p className="text-gray-700">Investir em tecnologias mais integradas e interoperáveis, modernizando sistemas existentes como o SISREG. Expandir o uso de telemedicina e telessaúde para ampliar o acesso nas regiões remotas.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-3 text-green-700">Protocolos e processos</h3>
                <p className="text-gray-700">Padronizar nacionalmente protocolos de regulação e classificação de risco, construindo diretrizes que possam ser adaptadas às realidades locais.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-3 text-red-700">Recursos humanos</h3>
                <p className="text-gray-700">Desenvolver programas de capacitação continuada e estabelecer carreiras específicas para profissionais de regulação, principalmente médicos reguladores.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-3 text-purple-700">Integração entre níveis de atenção</h3>
                <p className="text-gray-700">Fortalecer a comunicação entre a atenção primária e especializada, usando sistemas como referência e contrarreferência eletrônicas.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-3 text-orange-700">Regionalização</h3>
                <p className="text-gray-700">Fortalecer os processos de regionalização, garantindo que os municípios-polo cumpram seu papel assistencial conforme planejado nos PDRs.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-3 text-indigo-700">Política integrada</h3>
                <p className="text-gray-700">Desenvolver uma política nacional de regulação integrada, com diretrizes claras e incentivos para implementação em todos os níveis.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default RegulacaoSUSDashboard;
