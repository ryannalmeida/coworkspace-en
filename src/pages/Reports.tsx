
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useReservations } from '../contexts/ReservationContext';
import { Button } from '../components/ui/button';
import { Download } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import Layout from '../components/Layout';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend, ArcElement } from 'chart.js';

// Import refactored components
import ReportFilters from '../components/reports/ReportFilters';
import StatusReport from '../components/reports/StatusReport';
import SpaceUsageReport from '../components/reports/SpaceUsageReport';
import TrendReport from '../components/reports/TrendReport';
import OverviewReport from '../components/reports/OverviewReport';
import NoDataCard from '../components/reports/NoDataCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const { user, loading: authLoading } = useAuth();
  const { reservations, loading: reservationsLoading } = useReservations();
  const navigate = useNavigate();
  const [reportType, setReportType] = useState<string>('overview');
  const [spaceType, setSpaceType] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const filteredReservations = reservations.filter(reservation => {
    if (date?.from || date?.to) {
      const reservationDate = new Date(reservation.date);
      if (date?.from && reservationDate < date.from) return false;
      if (date?.to) {
        const adjustedEndDate = new Date(date.to);
        adjustedEndDate.setHours(23, 59, 59, 999);
        if (reservationDate > adjustedEndDate) return false;
      }
    }

    if (spaceType !== 'all') {
      const lowerSpace = reservation.space.toLowerCase();
      if (spaceType === 'desk' && !lowerSpace.includes('desk')) return false;
      if (spaceType === 'room' && (!lowerSpace.includes('room') && !lowerSpace.includes('meeting') && !lowerSpace.includes('conference'))) return false;
      if (spaceType === 'office' && !lowerSpace.includes('office')) return false;
    }

    if (status !== 'all' && reservation.status !== status) return false;

    return true;
  });

  if (authLoading || reservationsLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-73px)]">
          <div className="text-center">
            <span className="block mb-2">Loading...</span>
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  
  const exportToCsv = () => {
  
    const headers = ['Date', 'Space', 'Start Time', 'End Time', 'Status', 'Created At'];
    
    const rows = filteredReservations.map(r => [
      new Date(r.date).toLocaleDateString(),
      r.space,
      r.startTime,
      r.endTime,
      r.status,
      new Date(r.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `reservations-report-${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Monitor and analyze your workspace usage
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            onClick={exportToCsv}
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" /> Export as CSV
          </Button>
        </div>
        
        <ReportFilters 
          date={date}
          setDate={setDate}
          spaceType={spaceType}
          setSpaceType={setSpaceType}
          status={status}
          setStatus={setStatus}
          reportType={reportType}
          setReportType={setReportType}
        />

        {filteredReservations.length === 0 ? (
          <NoDataCard />
        ) : (
          <>
            {/* Overview Report (Default) */}
            {reportType === 'overview' && <OverviewReport filteredReservations={filteredReservations} />}

            {/* Status Distribution Chart */}
            {reportType === 'status' && <StatusReport filteredReservations={filteredReservations} />}

            {/* Space Usage Chart */}
            {reportType === 'space' && <SpaceUsageReport filteredReservations={filteredReservations} />}

            {/* Monthly Trend Chart */}
            {reportType === 'trend' && <TrendReport filteredReservations={filteredReservations} />}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Reports;
