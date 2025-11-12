
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useReservations } from '../contexts/ReservationContext';
import { useNotifications } from '../contexts/NotificationContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Layout from '../components/Layout';
import { Calendar, AlertCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { reservations, loading: reservationsLoading } = useReservations();
  const { notifications, loading: notificationsLoading } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
   
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || reservationsLoading || notificationsLoading) {
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

  // Get upcoming reservations
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingReservations = reservations
    .filter(reservation => {
      const reservationDate = new Date(reservation.date);
      reservationDate.setHours(0, 0, 0, 0);
      return reservationDate >= today && reservation.status !== 'canceled';
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Get recent notifications
  const recentNotifications = notifications
    .slice(0, 3);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome, {user?.name}</h1>
            <p className="text-muted-foreground">
             See what's happening with your account today.
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            onClick={() => navigate('/reservations/new')}
          >
            <Calendar className="mr-2 h-4 w-4" /> New Reservation
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservations.length}</div>
              <p className="text-xs text-muted-foreground">
                {reservations.filter(r => r.status === 'confirmed').length} confirmed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Reservations</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reservations.filter(r => r.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground">
                {notifications.filter(n => !n.read).length} unread
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Reservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reservations.filter(r => {
                  const reservationDate = new Date(r.date);
                  const today = new Date();
                  return (
                    reservationDate.getDate() === today.getDate() &&
                    reservationDate.getMonth() === today.getMonth() &&
                    reservationDate.getFullYear() === today.getFullYear() &&
                    r.status === 'confirmed'
                  );
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">Confirmed for today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Reservations</CardTitle>
              <CardDescription>Your next scheduled spaces</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingReservations.length > 0 ? (
                <div className="space-y-4">
                  {upcomingReservations.map(reservation => (
                    <div key={reservation.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{reservation.space}</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {new Date(reservation.date).toLocaleDateString()}
                          </p>
                          <span className="text-sm text-muted-foreground">
                            {reservation.startTime} - {reservation.endTime}
                          </span>
                        </div>
                      </div>
                      <Badge variant={reservation.status === 'confirmed' ? 'default' : 'secondary'}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No upcoming reservations
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/reservations')}
              >
               View All Reservations
              </Button>
            </CardFooter>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with your activities</CardDescription>
            </CardHeader>
            <CardContent>
              {recentNotifications.length > 0 ? (
                <div className="space-y-4">
                  {recentNotifications.map(notification => (
                    <div key={notification.id} className="flex items-start gap-2">
                      <span 
                        className={`mt-1 h-2 w-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-primary'}`} 
                      />
                      <div className="flex-1">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                 No recent notifications
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/notifications')}
              >
                View All Notifications
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
