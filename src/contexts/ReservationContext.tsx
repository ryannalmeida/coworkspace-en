
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Reservation, 
  ReservationStatus,
  getUserReservations, 
  createReservation as createReservationInStorage,
  updateReservationStatus as updateReservationStatusInStorage,
  deleteReservation as deleteReservationInStorage
} from '../utils/localStorage';
import { useAuth } from './AuthContext';
import { toast } from '../hooks/use-toast';

interface ReservationContextType {
  reservations: Reservation[];
  loading: boolean;
  createReservation: (date: string, startTime: string, endTime: string, space: string) => Promise<Reservation>;
  updateReservationStatus: (id: string, status: ReservationStatus) => Promise<Reservation>;
  cancelReservation: (id: string) => Promise<void>;
  getFilteredReservations: (filters: {
    dateRange?: { from: Date | undefined; to: Date | undefined };
    status?: ReservationStatus;
    space?: string;
  }) => Reservation[];
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user reservations when user changes
  useEffect(() => {
    if (user) {
      const userReservations = getUserReservations(user.id);
      setReservations(userReservations);
    } else {
      setReservations([]);
    }
    setLoading(false);
  }, [user]);

  const createReservation = async (date: string, startTime: string, endTime: string, space: string): Promise<Reservation> => {
    try {
      if (!user) {
        throw new Error("You must be logged in to make a reservation");
      }
      
      const newReservation = createReservationInStorage(user.id, date, startTime, endTime, space);
      setReservations(prev => [...prev, newReservation]);
      
      toast({
        title: "Reservation Created",
        description: `Your reservation for ${space} is pending confirmation.`,
      });
      
      
      setTimeout(() => {
        try {
          const confirmed = updateReservationStatusInStorage(newReservation.id, 'confirmed');
          setReservations(prev => 
            prev.map(r => r.id === confirmed.id ? confirmed : r)
          );
          
          toast({
            title: "Reservation Confirmed",
            description: `Your reservation for ${space} has been confirmed!`,
          });
        } catch (error) {
          console.error("Error confirming reservation:", error);
        }
      }, 10000);
      
      return newReservation;
    } catch (error) {
      toast({
        title: "Reservation Failed",
        description: error instanceof Error ? error.message : "Could not create reservation",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateReservationStatus = async (id: string, status: ReservationStatus): Promise<Reservation> => {
    try {
      const updatedReservation = updateReservationStatusInStorage(id, status);
      setReservations(prev => 
        prev.map(r => r.id === updatedReservation.id ? updatedReservation : r)
      );
      
      toast({
        title: `Reserva ${status}`,
        description: `Sua reserva foi ${status}.`,
      });
      
      return updatedReservation;
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Could not update reservation",
        variant: "destructive",
      });
      throw error;
    }
  };

  const cancelReservation = async (id: string): Promise<void> => {
    try {
      deleteReservationInStorage(id);
      setReservations(prev => prev.filter(r => r.id !== id));
      
      toast({
        title: "Reservation Canceled",
        description: "Your reservation has been canceled successfully.",
      });
    } catch (error) {
      toast({
        title: "Cancellation Failed",
        description: error instanceof Error ? error.message : "Could not cancel reservation",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getFilteredReservations = (filters: {
    dateRange?: { from: Date | undefined; to: Date | undefined };
    status?: ReservationStatus;
    space?: string;
  }): Reservation[] => {
    return reservations.filter(reservation => {
      // Filter by date range
      if (filters.dateRange && (filters.dateRange.from || filters.dateRange.to)) {
        const reservationDate = new Date(reservation.date);
        
        if (filters.dateRange.from && reservationDate < filters.dateRange.from) {
          return false;
        }
        
        if (filters.dateRange.to) {
          // Add one day to include the end date
          const endDate = new Date(filters.dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          if (reservationDate >= endDate) {
            return false;
          }
        }
      }
      
      // Filter by status
      if (filters.status && reservation.status !== filters.status) {
        return false;
      }
      
      // Filter by space
      if (filters.space && !reservation.space.toLowerCase().includes(filters.space.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

  return (
    <ReservationContext.Provider value={{ 
      reservations,
      loading,
      createReservation,
      updateReservationStatus,
      cancelReservation,
      getFilteredReservations
    }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};
