
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reservation } from '@/utils/localStorage';

interface OverviewReportProps {
  filteredReservations: Reservation[];
}

const OverviewReport: React.FC<OverviewReportProps> = ({ filteredReservations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total de reservas</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="text-4xl font-bold">{filteredReservations.length}</div>
          <p className="text-muted-foreground">
           Para período e filtros selecionados
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Por status</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Confirmado</span>
              <span className="font-medium">
                {filteredReservations.filter(r => r.status === 'confirmed').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pendente</span>
              <span className="font-medium">
                {filteredReservations.filter(r => r.status === 'pending').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Cancelado</span>
              <span className="font-medium">
                {filteredReservations.filter(r => r.status === 'canceled').length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Espaço mais utilizado</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          {(() => {
            const spaceCounts: Record<string, number> = {};
            
            filteredReservations.forEach(r => {
              if (r.status !== 'canceled') {
                spaceCounts[r.space] = (spaceCounts[r.space] || 0) + 1;
              }
            });
            
            const entries = Object.entries(spaceCounts);
            if (entries.length === 0) return <div>Sem dados</div>;
            
            const [mostUsedSpace, count] = entries.reduce(
              (max, entry) => (entry[1] > max[1] ? entry : max),
              ['', 0]
            );
            
            return (
              <>
                <div className="text-lg font-medium">{mostUsedSpace}</div>
                <p className="text-muted-foreground">
                  {count} reservas
                </p>
              </>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewReport;
