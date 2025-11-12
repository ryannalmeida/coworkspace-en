
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const NoDataCard = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium">Não há dados disponíveis</h3>
        <p className="text-muted-foreground text-center mt-2">
          Tente ajustar seus filtros para ver alguns resultados
        </p>
      </CardContent>
    </Card>
  );
};

export default NoDataCard;
