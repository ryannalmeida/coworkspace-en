
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useReservations } from '../contexts/ReservationContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Calendar as CalendarIcon, Calendar, Trash, Filter, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

import Layout from '../components/Layout';
import { ReservationStatus } from '../utils/localStorage';

const Reservations = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    reservations, 
    loading: reservationsLoading, 
    updateReservationStatus, 
    cancelReservation,
    getFilteredReservations
  } = useReservations();
  const navigate = useNavigate();


  const [date, setDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<ReservationStatus | undefined>(undefined);
  const [space, setSpace] = useState('');
  const [filteredReservations, setFilteredReservations] = useState(reservations);

  useEffect(() => {
    setFilteredReservations(
      getFilteredReservations({
        dateRange: date ? { from: date, to: date } : undefined,
        status,
        space: space.trim() ? space : undefined,
      })
    );
  }, [date, status, space, reservations, getFilteredReservations]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

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

  const handleConfirmReservation = (id: string) => {
    updateReservationStatus(id, 'confirmed');
  };

  const handleCancelReservation = (id: string) => {
    cancelReservation(id);
  };

  const clearFilters = () => {
    setDate(undefined);
    setStatus(undefined);
    setSpace('');
  };

  const getStatusVariant = (status: ReservationStatus) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'canceled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
            <p className="text-muted-foreground">
              View and manage your workspace reservations
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            onClick={() => navigate('/reservations/new')}
          >
            <Plus className="mr-2 h-4 w-4" /> New Reservation
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Choose a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Select
                value={status || "null"}
                onValueChange={(value) => setStatus(value === "null" ? undefined : value as ReservationStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>

              <div>
                <Input
                  placeholder="Search by space..."
                  value={space}
                  onChange={(e) => setSpace(e.target.value)}
                />
              </div>

              <Button variant="outline" onClick={clearFilters}>
                <Filter className="mr-2 h-4 w-4" /> Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredReservations.length > 0 ? (
            filteredReservations.map(reservation => (
              <Card key={reservation.id} className="overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{new Date(reservation.date).toLocaleDateString()}</span>
                      <span className="text-muted-foreground">
                        {reservation.startTime} - {reservation.endTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{reservation.space}</h3>
                    <p className="text-sm text-muted-foreground">
                     Reserved on {new Date(reservation.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 md:ml-auto">
                    <Badge variant={getStatusVariant(reservation.status)}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </Badge>
                    
                    {reservation.status === 'pending' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleConfirmReservation(reservation.id)}
                      >
                       Confirm
                      </Button>
                    )}
                    
                    {reservation.status !== 'canceled' && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel this reservation? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleCancelReservation(reservation.id)}
                            >
                              Yes, Cancel
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Reservations Found</h3>
                <p className="text-muted-foreground text-center mt-1">
                  {reservations.length > 0 
                    ? "Try adjusting your filters to see more results" 
                    : "You haven't made any reservations yet"}
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/reservations/new')}
                >
                  <Plus className="mr-2 h-4 w-4" /> New Reservation
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reservations;
