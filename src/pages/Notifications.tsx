
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Bell, Check, Trash } from 'lucide-react';
import Layout from '../components/Layout';

const Notifications = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    notifications, 
    loading: notificationsLoading, 
    markAsRead, 
    deleteNotification,
    markAllAsRead
  } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
   
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || notificationsLoading) {
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

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleDelete = (id: string) => {
    deleteNotification(id);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with important information about your reservations
            </p>
          </div>
          {notifications.some(n => !n.read) && (
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0"
              onClick={markAllAsRead}
            >
              <Check className="mr-2 h-4 w-4" />
             Mark All as Read
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <Card 
                key={notification.id} 
                className={`p-4 border-l-4 ${notification.read ? 'border-l-muted' : 'border-l-primary'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-center">
              <Bell className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Notifications</h3>
              <p className="text-muted-foreground mt-1">
               You don't have any notifications at the moment
              </p>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
