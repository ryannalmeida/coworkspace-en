
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reservation } from '@/utils/localStorage';

interface SpaceUsageReportProps {
  filteredReservations: Reservation[];
}

const SpaceUsageReport: React.FC<SpaceUsageReportProps> = ({ filteredReservations }) => {
  // Group reservations by space for space usage chart
  const spaceUsageData = (() => {
    const spaceCount: Record<string, number> = {};
    
    filteredReservations.forEach(reservation => {
      if (reservation.status !== 'canceled') {
        const spaceName = reservation.space;
        spaceCount[spaceName] = (spaceCount[spaceName] || 0) + 1;
      }
    });
    
    const labels = Object.keys(spaceCount);
    const data = Object.values(spaceCount);
    
    return {
      labels,
      datasets: [
        {
          label: 'Space Usage',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  })();

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Distribuição do uso do espaço</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <Bar 
            data={spaceUsageData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45
                  }
                }
              }
            }} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceUsageReport;
