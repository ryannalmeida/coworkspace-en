
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reservation } from '@/utils/localStorage';

interface StatusReportProps {
  filteredReservations: Reservation[];
}

const StatusReport: React.FC<StatusReportProps> = ({ filteredReservations }) => {
  
  const statusChartData = {
    labels: ['Confirmed', 'Pending', 'Canceled'],
    datasets: [
      {
        label: 'Reservations by Status',
        data: [
          filteredReservations.filter(r => r.status === 'confirmed').length,
          filteredReservations.filter(r => r.status === 'pending').length,
          filteredReservations.filter(r => r.status === 'canceled').length,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Distribuição do status da reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Pie 
            data={statusChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusReport;
