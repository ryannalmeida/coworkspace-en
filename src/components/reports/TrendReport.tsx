
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reservation } from '@/utils/localStorage';

interface TrendReportProps {
  filteredReservations: Reservation[];
}

const TrendReport: React.FC<TrendReportProps> = ({ filteredReservations }) => {
  const trendChartData = (() => {
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthData = new Array(12).fill(0);
    
    filteredReservations.forEach(reservation => {
      const reservationDate = new Date(reservation.date);
      const month = reservationDate.getMonth();
      monthData[month]++;
    });
    
    return {
      labels: monthLabels,
      datasets: [
        {
          label: 'Reservations by Month',
          data: monthData,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  })();

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Tendências de reservas por mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Bar 
            data={trendChartData}
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

export default TrendReport;
