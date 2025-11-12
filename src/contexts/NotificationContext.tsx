
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Notification,
  getUserNotifications, 
  markNotificationAsRead as markAsReadInStorage,
  deleteNotification as deleteNotificationInStorage
} from '../utils/localStorage';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user notifications when user changes
  useEffect(() => {
    if (user) {
      const userNotifications = getUserNotifications(user.id);
      setNotifications(userNotifications);
    } else {
      setNotifications([]);
    }
    setLoading(false);
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    try {
      const updatedNotification = markAsReadInStorage(id);
      setNotifications(prev => 
        prev.map(n => n.id === updatedNotification.id ? updatedNotification : n)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = (id: string) => {
    try {
      deleteNotificationInStorage(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const markAllAsRead = () => {
    try {
      const updatedNotifications = [...notifications];
      
      for (let i = 0; i < updatedNotifications.length; i++) {
        if (!updatedNotifications[i].read) {
          markAsReadInStorage(updatedNotifications[i].id);
          updatedNotifications[i].read = true;
        }
      }
      
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications,
      unreadCount,
      loading,
      markAsRead,
      deleteNotification,
      markAllAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
