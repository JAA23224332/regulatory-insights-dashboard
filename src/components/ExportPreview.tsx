
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExportButtons from './ExportButtons';
import { dadosReais } from '@/data/regulacaoData';

// This component provides a preview of what will be exported
const ExportPreview = () => {
  return (
    <Card className="w-full mb-8">
      <CardHeader className="bg-blue-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Prévia de Exportação</CardTitle>
          <ExportButtons />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="pdf" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="pdf">Prévia PDF</TabsTrigger>
            <TabsTrigger value="ppt">Prévia PowerPoint</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pdf" className="mt-0">
            <div className="border rounded-md p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-2 text-center">Visualização PDF</h3>
              <p className="text-sm text-gray-600 mb-3 text-center">O documento será gerado com {5 + dadosReais.length} páginas, incluindo todas as seções e tabelas.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                <div className="border rounded p-2 bg-white shadow-sm">
                  <div className="bg-blue-100 h-4 mb-1"></div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="border rounded p-2 bg-white shadow-sm">
                  <div className="bg-green-100 h-4 mb-1"></div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="border rounded p-2 bg-white shadow-sm">
                  <div className="bg-red-100 h-4 mb-1"></div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ppt" className="mt-0">
            <div className="border rounded-md p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-2 text-center">Visualização PowerPoint</h3>
              <p className="text-sm text-gray-600 mb-3 text-center">O documento será gerado com 5 slides, contendo resumos das principais seções.</p>
              
              <div className="aspect-[16/9] bg-white border rounded-md shadow-sm p-4 max-w-md mx-auto">
                <div className="h-8 bg-blue-100 mb-4 w-3/4 mx-auto"></div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="h-20 bg-green-50 rounded"></div>
                  <div className="h-20 bg-red-50 rounded"></div>
                </div>
                <div className="space-y-2 mb-2">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExportPreview;
